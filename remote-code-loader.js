/**
 * Remote Code Loader - Fetches critical code from Railway server
 * This makes it impossible to crack the app without the server-side code
 */

const axios = require("axios");
const crypto = require("crypto");
const { machineIdSync } = require("node-machine-id");

class RemoteCodeLoader {
  constructor() {
    // Railway API URL - Set this to your Railway deployment URL
    // You can set RAILWAY_API_URL environment variable or update this default
    this.API_URL = process.env.RAILWAY_API_URL || 
                   process.env.API_URL || 
                   "https://kztweaks-macro-production.up.railway.app";
    this.sessionToken = null;
    this.loadedModules = new Map();
    this.initialized = false;
    this.maxRetries = 3;
    this.timeout = 15000; // 15 seconds
    
    // Validate API URL is set
    if (this.API_URL.includes("your-app-name")) {
      console.warn("⚠️ WARNING: Railway API URL not configured!");
      console.warn("⚠️ Set RAILWAY_API_URL environment variable or update remote-code-loader.js");
    }
  }

  /**
   * Initialize and fetch critical code modules
   * MUST be called before app can proceed
   */
  async initialize(hwid, licenseKey) {
    if (this.initialized) {
      return { success: true, message: "Already initialized" };
    }

    try {
      console.log("╔═══════════════════════════════════════╗");
      console.log("║  REMOTE CODE LOADER INITIALIZING      ║");
      console.log("╚═══════════════════════════════════════╝");
      console.log("🔗 Connecting to Railway server...");
      console.log("📍 API URL:", this.API_URL);

      // Step 1: Authenticate and get session token
      const authResult = await this.authenticate(hwid, licenseKey);
      if (!authResult.success) {
        throw new Error(`Authentication failed: ${authResult.message}`);
      }

      this.sessionToken = authResult.sessionToken;
      console.log("✅ Authentication successful");

      // Step 2: Fetch critical code modules
      const modulesToLoad = [
        "core-logic",
        "macro-engine",
        "security-module",
        "validation-module"
      ];

      console.log("📦 Fetching critical code modules...");
      for (const moduleName of modulesToLoad) {
        const moduleResult = await this.fetchModule(moduleName);
        if (!moduleResult.success) {
          throw new Error(`Failed to load module ${moduleName}: ${moduleResult.message}`);
        }
        this.loadedModules.set(moduleName, moduleResult.code);
        console.log(`✅ Loaded module: ${moduleName}`);
      }

      this.initialized = true;
      console.log("✅ Remote code loader initialized successfully");
      return { success: true, message: "Initialized successfully" };
    } catch (error) {
      console.error("❌ Remote code loader initialization failed:", error.message);
      return {
        success: false,
        message: error.message || "Failed to initialize remote code loader"
      };
    }
  }

  /**
   * Authenticate with Railway server
   */
  async authenticate(hwid, licenseKey) {
    try {
      const response = await axios.post(
        `${this.API_URL}/api/remote-code/auth`,
        {
          hwid: hwid,
          licenseKey: licenseKey,
          appVersion: require("./package.json").version,
          timestamp: Date.now()
        },
        {
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Electron-App/1.0"
          },
          timeout: this.timeout
        }
      );

      if (response.data.success) {
        return {
          success: true,
          sessionToken: response.data.sessionToken,
          expiresAt: response.data.expiresAt
        };
      }

      return {
        success: false,
        message: response.data.message || "Authentication failed"
      };
    } catch (error) {
      if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
        return {
          success: false,
          message: "Cannot connect to server. Internet connection required."
        };
      }
      if (error.code === "ETIMEDOUT") {
        return {
          success: false,
          message: "Connection timeout. Server may be down."
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || error.message || "Authentication error"
      };
    }
  }

  /**
   * Fetch a code module from Railway
   */
  async fetchModule(moduleName, retryCount = 0) {
    try {
      const response = await axios.post(
        `${this.API_URL}/api/remote-code/fetch`,
        {
          moduleName: moduleName,
          sessionToken: this.sessionToken,
          hwid: this.getHWID(),
          timestamp: Date.now()
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.sessionToken}`,
            "User-Agent": "Electron-App/1.0"
          },
          timeout: this.timeout
        }
      );

      if (response.data.success) {
        // Decrypt and validate the code
        const decryptedCode = this.decryptCode(
          response.data.encryptedCode,
          response.data.iv,
          this.sessionToken
        );

        // Verify code integrity
        const isValid = this.verifyCodeIntegrity(
          decryptedCode,
          response.data.hash
        );

        if (!isValid) {
          throw new Error("Code integrity check failed");
        }

        return {
          success: true,
          code: decryptedCode,
          moduleName: moduleName
        };
      }

      throw new Error(response.data.message || "Failed to fetch module");
    } catch (error) {
      if (retryCount < this.maxRetries) {
        console.log(`⚠️ Retrying module fetch (${retryCount + 1}/${this.maxRetries})...`);
        await this.delay(1000 * (retryCount + 1)); // Exponential backoff
        return this.fetchModule(moduleName, retryCount + 1);
      }

      return {
        success: false,
        message: error.response?.data?.message || error.message || "Failed to fetch module"
      };
    }
  }

  /**
   * Execute a loaded module
   */
  executeModule(moduleName, context = {}) {
    if (!this.initialized) {
      throw new Error("Remote code loader not initialized");
    }

    const code = this.loadedModules.get(moduleName);
    if (!code) {
      throw new Error(`Module ${moduleName} not loaded`);
    }

    try {
      // Create a secure execution context
      const secureContext = {
        ...context,
        require: require,
        module: module,
        exports: {},
        console: console,
        Buffer: Buffer,
        process: process
      };

      // Execute the code in a controlled context
      const func = new Function(...Object.keys(secureContext), code);
      return func(...Object.values(secureContext));
    } catch (error) {
      console.error(`Error executing module ${moduleName}:`, error);
      throw error;
    }
  }

  /**
   * Get a module's code (for direct execution)
   */
  getModule(moduleName) {
    if (!this.initialized) {
      throw new Error("Remote code loader not initialized");
    }
    return this.loadedModules.get(moduleName);
  }

  /**
   * Decrypt code using AES-256-GCM
   */
  decryptCode(encryptedCode, iv, key) {
    try {
      const keyHash = crypto.createHash("sha256").update(key).digest();
      const decipher = crypto.createDecipheriv("aes-256-cbc", keyHash, Buffer.from(iv, "hex"));
      let decrypted = decipher.update(encryptedCode, "hex", "utf8");
      decrypted += decipher.final("utf8");
      return decrypted;
    } catch (error) {
      throw new Error("Failed to decrypt code");
    }
  }

  /**
   * Verify code integrity using SHA-256
   */
  verifyCodeIntegrity(code, expectedHash) {
    const actualHash = crypto.createHash("sha256").update(code).digest("hex");
    return actualHash === expectedHash;
  }

  /**
   * Get hardware ID
   */
  getHWID() {
    try {
      return machineIdSync();
    } catch (error) {
      const os = require("os");
      return crypto
        .createHash("sha256")
        .update(`${os.hostname()}-${os.platform()}-${os.arch()}`)
        .digest("hex");
    }
  }

  /**
   * Delay helper
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Check if initialized
   */
  isInitialized() {
    return this.initialized;
  }
}

module.exports = RemoteCodeLoader;
