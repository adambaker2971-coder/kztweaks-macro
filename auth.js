// auth.js - KeyAuth HWID Lock Implementation
const { machineIdSync } = require("node-machine-id");
const axios = require("axios");
const crypto = require("crypto");

class KeyAuth {
  constructor(name, ownerid, secret, version) {
    this.name = name;
    this.ownerid = ownerid;
    this.secret = secret;
    this.version = version;
    this.sessionid = null;
    this.enckey = null;
    this.initialized = false;
    this.licenseKey = null; // Store license key for encryption

    console.log("╔═══════════════════════════════════════╗");
    console.log("║  KEYAUTH INITIALIZED                  ║");
    console.log("╚═══════════════════════════════════════╝");
    console.log("Name:", this.name);
    console.log("Owner:", this.ownerid);
    console.log("Version:", this.version);
    console.log(
      "Secret:",
      this.secret ? `Set (${this.secret.length} chars)` : "MISSING!",
    );
    console.log("═══════════════════════════════════════\n");
  }

  // Initialize the KeyAuth session
  async init() {
    try {
      const hwid = this.getHWID();
      const init_iv = crypto.randomBytes(16).toString("hex");

      console.log("🔄 Initializing KeyAuth...");
      console.log("HWID:", hwid);
      console.log("Init IV:", init_iv);

      // KeyAuth API expects URL-encoded form data
      const params = new URLSearchParams();
      params.append("type", "init");
      params.append("ver", this.version);
      params.append("name", this.name);
      params.append("ownerid", this.ownerid);
      params.append("init_iv", init_iv);

      console.log("📡 Sending init request to KeyAuth...");

      const response = await axios.post(
        "https://keyauth.win/api/1.2/",
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "KeyAuth",
          },
          timeout: 15000,
        },
      );

      console.log("📥 Response received:", response.data);

      if (response.data.success) {
        this.sessionid = response.data.sessionid;
        this.enckey = response.data.enckey;
        this.initialized = true;
        console.log("✅ KeyAuth initialized successfully!");
        console.log("Session ID:", this.sessionid);
        return { success: true, message: "Initialized successfully" };
      }
      console.error("❌ Init failed:", response.data.message);
      return {
        success: false,
        message: response.data.message || "Initialization failed",
      };
    } catch (error) {
      console.error("❌ Init error:", error.message);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }

      if (error.code === "ENOTFOUND") {
        return {
          success: false,
          message:
            "⚠️ Cannot reach KeyAuth servers.\nCheck your internet connection.",
        };
      }
      if (error.code === "ETIMEDOUT") {
        return {
          success: false,
          message: "⚠️ Connection timed out.\nKeyAuth servers may be down.",
        };
      }

      return {
        success: false,
        message: `Network error: ${error.message}`,
      };
    }
  }

  // Helper function to check if user is banned - comprehensive check
  isBannedResponse(responseData) {
    // Check banned field in multiple locations
    if (
      responseData.banned === true ||
      responseData.banned === "1" ||
      responseData.banned === 1
    ) {
      return true;
    }

    if (
      responseData.info?.banned === true ||
      responseData.info?.banned === "1" ||
      responseData.info?.banned === 1
    ) {
      return true;
    }

    // Check message for ban keywords
    const message = (responseData.message || "").toLowerCase();
    const banKeywords = [
      "banned",
      "disabled",
      "suspended",
      "blacklisted",
      "restricted",
    ];
    if (banKeywords.some((keyword) => message.includes(keyword))) {
      return true;
    }

    // Check if account status indicates ban
    if (responseData.info?.status) {
      const status = responseData.info.status.toLowerCase();
      if (
        status === "banned" ||
        status === "disabled" ||
        status === "suspended"
      ) {
        return true;
      }
    }

    return false;
  }

  // License-only authentication (no username required)
  async license(key) {
    console.log("\n╔═══════════════════════════════════════╗");
    console.log("║  LICENSE AUTHENTICATION               ║");
    console.log("╚═══════════════════════════════════════╝");
    console.log("License Key:", key ? `${key.substring(0, 4)}...` : "NONE");

    if (!this.initialized) {
      console.log("⚠️ Not initialized, calling init()...");
      const initResult = await this.init();
      if (!initResult.success) {
        console.error("❌ Init failed, cannot proceed");
        return initResult;
      }
    }

    try {
      const hwid = this.getHWID();

      console.log("📡 Sending license validation request...");
      console.log("HWID:", hwid);
      console.log("Session ID:", this.sessionid);

      // KeyAuth API expects URL-encoded form data
      const params = new URLSearchParams();
      params.append("type", "license");
      params.append("key", key);
      params.append("hwid", hwid);
      params.append("sessionid", this.sessionid);
      params.append("name", this.name);
      params.append("ownerid", this.ownerid);

      const response = await axios.post(
        "https://keyauth.win/api/1.2/",
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "KeyAuth",
          },
          timeout: 15000,
        },
      );

      console.log("📥 License response:", response.data);

      // COMPREHENSIVE BAN CHECK - Check regardless of success status
      if (this.isBannedResponse(response.data)) {
        console.error("❌ User is BANNED!");
        return {
          success: false,
          message:
            "🚫 Your account has been banned. Contact support if you believe this is an error.",
          banned: true,
        };
      }

      if (response.data.success) {
        console.log("✅ License validated successfully!");

        // Store license key
        this.licenseKey = key;

        return {
          success: true,
          message: "License validated successfully",
          user: {
            username: response.data.info?.username || "Licensed User",
            subscription:
              response.data.info?.subscriptions?.[0]?.subscription || "N/A",
            expiry: response.data.info?.subscriptions?.[0]?.expiry || "N/A",
            banned: false,
          },
        };
      }
      console.error("❌ License validation failed:", response.data.message);
      return {
        success: false,
        message:
          response.data.message || "Invalid license key or HWID mismatch",
      };
    } catch (error) {
      console.error("❌ License error:", error.message);

      if (error.response) {
        console.error("Response data:", error.response.data);
      }

      return {
        success: false,
        message: `Network error during license validation: ${error.message}`,
      };
    }
  }

  // Get hardware ID
  getHWID() {
    try {
      return machineIdSync();
    } catch (error) {
      console.error("❌ HWID error:", error);
      // Fallback HWID generation
      const os = require("os");
      const hostname = os.hostname();
      const platform = os.platform();
      const arch = os.arch();
      const fallback = crypto
        .createHash("sha256")
        .update(`${hostname}-${platform}-${arch}`)
        .digest("hex");
      console.log("⚠️ Using fallback HWID:", fallback);
      return fallback;
    }
  }

  // Check if session is still valid
  async checkSession() {
    if (!this.initialized || !this.sessionid) {
      return {
        success: false,
        message: "Not authenticated",
        reason: "not_initialized",
      };
    }

    try {
      const params = new URLSearchParams();
      params.append("type", "check");
      params.append("sessionid", this.sessionid);
      params.append("name", this.name);
      params.append("ownerid", this.ownerid);

      const response = await axios.post(
        "https://keyauth.win/api/1.2/",
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "KeyAuth",
          },
          timeout: 10000,
        },
      );

      // COMPREHENSIVE BAN CHECK - Check regardless of success status
      if (this.isBannedResponse(response.data)) {
        console.error("❌ User is BANNED during session check!");
        return {
          success: false,
          message: "User is banned",
          banned: true,
          reason: "banned",
        };
      }

      if (response.data.success) {
        return { success: true, message: "Session is valid" };
      }
      // Check if license was removed/deleted
      const message = response.data.message || "";
      const isRemoved =
        message.toLowerCase().includes("license not found") ||
        message.toLowerCase().includes("license deleted") ||
        message.toLowerCase().includes("license removed") ||
        message.toLowerCase().includes("invalid license");

      if (isRemoved) {
        console.error("❌ License key has been REMOVED/DELETED!");
        return {
          success: false,
          message: "License key has been removed or deleted",
          removed: true,
          reason: "license_removed",
        };
      }

      return {
        success: false,
        message: "Session expired",
        reason: "expired",
      };
    } catch (error) {
      console.error("Session check error:", error.message);
      return {
        success: false,
        message: "Network error",
        reason: "network_error",
      };
    }
  }

  // Verify license is still valid and active
  async verifyLicense() {
    if (!this.initialized || !this.sessionid) {
      return {
        success: false,
        message: "Not authenticated",
        reason: "not_initialized",
      };
    }

    try {
      this.getHWID(); // Ensure HWID is initialized
      const params = new URLSearchParams();
      params.append("type", "var");
      params.append("varid", "license_status");
      params.append("sessionid", this.sessionid);
      params.append("name", this.name);
      params.append("ownerid", this.ownerid);

      const response = await axios.post(
        "https://keyauth.win/api/1.2/",
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "KeyAuth",
          },
          timeout: 10000,
        },
      );

      // COMPREHENSIVE BAN CHECK - Check regardless of success status
      if (this.isBannedResponse(response.data)) {
        return {
          success: false,
          message: "User is banned",
          banned: true,
          reason: "banned",
        };
      }

      if (!response.data.success) {
        const message = response.data.message || "";
        const isRemoved =
          message.toLowerCase().includes("license not found") ||
          message.toLowerCase().includes("license deleted");

        if (isRemoved) {
          return {
            success: false,
            message: "License removed",
            removed: true,
            reason: "license_removed",
          };
        }

        return {
          success: false,
          message: response.data.message,
          reason: "unknown_error",
        };
      }

      return { success: true, message: "License is valid" };
    } catch (error) {
      console.error("License verification error:", error.message);
      return {
        success: false,
        message: "Network error",
        reason: "network_error",
      };
    }
  }

  // Log out and invalidate session
  async logout() {
    if (!this.initialized || !this.sessionid) {
      return { success: false, message: "Not authenticated" };
    }

    try {
      const params = new URLSearchParams();
      params.append("type", "logout");
      params.append("sessionid", this.sessionid);
      params.append("name", this.name);
      params.append("ownerid", this.ownerid);

      await axios.post("https://keyauth.win/api/1.2/", params.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "KeyAuth",
        },
        timeout: 10000,
      });

      this.sessionid = null;
      this.initialized = false;
      this.licenseKey = null;

      return { success: true, message: "Logged out successfully" };
    } catch (error) {
      console.error("Logout error:", error.message);
      return { success: false, message: "Network error during logout" };
    }
  }
}

module.exports = KeyAuth;
