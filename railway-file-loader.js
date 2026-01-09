/**
 * Railway File Loader - Fetches ALL app files from Railway
 * This makes ALL files come from Railway, not bundled in the app
 */

const axios = require("axios");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { machineIdSync } = require("node-machine-id");

class RailwayFileLoader {
  constructor() {
    // Railway API URL
    this.API_URL = process.env.RAILWAY_API_URL || 
                   process.env.API_URL || 
                   "https://kztweaks-macro-production.up.railway.app";
    this.sessionToken = null;
    this.loadedFiles = new Map();
    this.initialized = false;
    this.cacheDir = path.join(process.env.APPDATA || process.env.HOME || __dirname, '.app-cache');
    this.maxRetries = 3;
    this.timeout = 15000;
    
    // Create cache directory
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  /**
   * Initialize and fetch all files from Railway
   */
  async initialize(hwid, licenseKey) {
    if (this.initialized) {
      return { success: true, message: "Already initialized" };
    }

    try {
      console.log("╔═══════════════════════════════════════╗");
      console.log("║  RAILWAY FILE LOADER INITIALIZING     ║");
      console.log("╚═══════════════════════════════════════╝");
      console.log("🔗 Connecting to Railway server...");
      console.log("📍 API URL:", this.API_URL);

      // Step 1: Authenticate
      const authResult = await this.authenticate(hwid, licenseKey);
      if (!authResult.success) {
        throw new Error(`Authentication failed: ${authResult.message}`);
      }

      this.sessionToken = authResult.sessionToken;
      console.log("✅ Authentication successful");

      // Step 2: Get file list
      console.log("📋 Fetching file list from Railway...");
      const fileListResult = await this.getFileList();
      if (!fileListResult.success) {
        throw new Error(`Failed to get file list: ${fileListResult.message}`);
      }

      const filesToLoad = fileListResult.files || [];
      console.log(`📦 Found ${filesToLoad.length} files to load`);

      // Step 3: Load all files
      console.log("📥 Loading files from Railway...");
      for (const fileInfo of filesToLoad) {
        const fileResult = await this.loadFile(fileInfo.filename);
        if (fileResult.success) {
          this.loadedFiles.set(fileInfo.filename, fileResult.content);
          console.log(`✅ Loaded: ${fileInfo.filename}`);
        } else {
          console.error(`❌ Failed to load: ${fileInfo.filename}`);
        }
      }

      // Step 4: Save files to cache
      await this.saveFilesToCache();

      this.initialized = true;
      console.log("✅ Railway file loader initialized successfully");
      return { success: true, message: "Initialized successfully" };
    } catch (error) {
      console.error("❌ Railway file loader initialization failed:", error.message);
      return {
        success: false,
        message: error.message || "Failed to initialize Railway file loader"
      };
    }
  }

  /**
   * Authenticate with Railway
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
      return {
        success: false,
        message: error.response?.data?.message || error.message || "Authentication error"
      };
    }
  }

  /**
   * Get list of files from Railway
   */
  async getFileList(retryCount = 0) {
    try {
      const response = await axios.get(
        `${this.API_URL}/api/files`,
        {
          params: {
            sessionToken: this.sessionToken
          },
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
          files: response.data.files || []
        };
      }

      throw new Error(response.data.message || "Failed to get file list");
    } catch (error) {
      if (retryCount < this.maxRetries) {
        await this.delay(1000 * (retryCount + 1));
        return this.getFileList(retryCount + 1);
      }

      return {
        success: false,
        message: error.response?.data?.message || error.message || "Failed to get file list"
      };
    }
  }

  /**
   * Load a file from Railway
   */
  async loadFile(filename, retryCount = 0) {
    try {
      const hwid = this.getHWID();
      const response = await axios.get(
        `${this.API_URL}/api/files/${filename}`,
        {
          params: {
            sessionToken: this.sessionToken,
            hwid: hwid
          },
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Electron-App/1.0"
          },
          timeout: this.timeout
        }
      );

      if (response.data.success) {
        // Decrypt file content
        const decryptedContent = this.decryptFile(
          response.data.encryptedContent,
          response.data.iv,
          this.sessionToken
        );

        // Verify integrity
        const actualHash = crypto.createHash("sha256").update(decryptedContent).digest("hex");
        if (actualHash !== response.data.hash) {
          throw new Error("File integrity check failed");
        }

        return {
          success: true,
          content: decryptedContent,
          filename: filename,
          hash: response.data.hash
        };
      }

      throw new Error(response.data.message || "Failed to load file");
    } catch (error) {
      if (retryCount < this.maxRetries) {
        await this.delay(1000 * (retryCount + 1));
        return this.loadFile(filename, retryCount + 1);
      }

      return {
        success: false,
        message: error.response?.data?.message || error.message || "Failed to load file"
      };
    }
  }

  /**
   * Save loaded files to cache
   */
  async saveFilesToCache() {
    try {
      for (const [filename, content] of this.loadedFiles.entries()) {
        const cachePath = path.join(this.cacheDir, filename);
        fs.writeFileSync(cachePath, content, 'utf8');
      }
      console.log(`✅ Cached ${this.loadedFiles.size} files to ${this.cacheDir}`);
    } catch (error) {
      console.error("❌ Error saving cache:", error);
    }
  }

  /**
   * Get file content (from cache or loaded files)
   */
  getFile(filename) {
    // First check loaded files
    if (this.loadedFiles.has(filename)) {
      return this.loadedFiles.get(filename);
    }

    // Then check cache
    const cachePath = path.join(this.cacheDir, filename);
    if (fs.existsSync(cachePath)) {
      try {
        return fs.readFileSync(cachePath, 'utf8');
      } catch (error) {
        console.error(`Error reading cache for ${filename}:`, error);
      }
    }

    return null;
  }

  /**
   * Decrypt file content
   */
  decryptFile(encryptedContent, iv, key) {
    try {
      const keyHash = crypto.createHash("sha256").update(key).digest();
      const decipher = crypto.createDecipheriv("aes-256-cbc", keyHash, Buffer.from(iv, "hex"));
      let decrypted = decipher.update(encryptedContent, "hex", "utf8");
      decrypted += decipher.final("utf8");
      return decrypted;
    } catch (error) {
      throw new Error("Failed to decrypt file");
    }
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

module.exports = RailwayFileLoader;
