/**
 * @file advanced-logger.js
 * @description Advanced logging system with levels, filtering, and file rotation
 */

const fs = require("fs");
const path = require("path");
const { app } = require("electron");

class AdvancedLogger {
  constructor() {
    this.logLevels = {
      DEBUG: 0,
      INFO: 1,
      WARN: 2,
      ERROR: 3,
      CRITICAL: 4,
    };

    this.currentLevel = this.logLevels.INFO;
    this.logs = [];
    this.maxLogs = 1000;
    this.logFile = null;
    this.logDir = null;
    this.maxFileSize = 10 * 1024 * 1024; // 10MB
    this.maxFiles = 5;
    this.enableFileLogging = true;
    this.enableConsoleLogging = true;
    this.enableColors = true;

    // Initialize log directory
    this.initializeLogDirectory();
  }

  /**
   * Initialize log directory
   */
  initializeLogDirectory() {
    try {
      const userDataPath = app.getPath("userData");
      this.logDir = path.join(userDataPath, "logs");
      
      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir, { recursive: true });
      }

      const logFileName = `app-${new Date().toISOString().split("T")[0]}.log`;
      this.logFile = path.join(this.logDir, logFileName);
    } catch (error) {
      console.error("Failed to initialize log directory:", error);
      this.enableFileLogging = false;
    }
  }

  /**
   * Set log level
   */
  setLevel(level) {
    if (typeof level === "string") {
      level = this.logLevels[level.toUpperCase()] || this.logLevels.INFO;
    }
    this.currentLevel = level;
  }

  /**
   * Log message
   */
  log(level, category, message, data = null) {
    const levelNum = typeof level === "string" 
      ? this.logLevels[level.toUpperCase()] || this.logLevels.INFO
      : level;

    // Check if should log
    if (levelNum < this.currentLevel) {
      return;
    }

    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp: timestamp,
      level: Object.keys(this.logLevels).find(k => this.logLevels[k] === levelNum),
      category: category,
      message: message,
      data: data,
    };

    // Add to in-memory logs
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console output
    if (this.enableConsoleLogging) {
      this.writeToConsole(logEntry);
    }

    // File output
    if (this.enableFileLogging && this.logFile) {
      this.writeToFile(logEntry);
    }
  }

  /**
   * Write to console with colors
   */
  writeToConsole(entry) {
    const colors = {
      DEBUG: "\x1b[36m", // Cyan
      INFO: "\x1b[32m",  // Green
      WARN: "\x1b[33m",  // Yellow
      ERROR: "\x1b[31m", // Red
      CRITICAL: "\x1b[35m", // Magenta
      RESET: "\x1b[0m",
    };

    const color = this.enableColors ? colors[entry.level] || "" : "";
    const reset = this.enableColors ? colors.RESET : "";
    const time = entry.timestamp.split("T")[1].split(".")[0];
    
    const prefix = `${color}[${time}] [${entry.level}] [${entry.category}]${reset}`;
    const message = entry.data 
      ? `${prefix} ${entry.message} ${JSON.stringify(entry.data)}`
      : `${prefix} ${entry.message}`;

    if (entry.level === "ERROR" || entry.level === "CRITICAL") {
      console.error(message);
    } else if (entry.level === "WARN") {
      console.warn(message);
    } else {
      console.log(message);
    }
  }

  /**
   * Write to file
   */
  writeToFile(entry) {
    try {
      // Check file size and rotate if needed
      if (fs.existsSync(this.logFile)) {
        const stats = fs.statSync(this.logFile);
        if (stats.size > this.maxFileSize) {
          this.rotateLogFile();
        }
      }

      const logLine = JSON.stringify(entry) + "\n";
      fs.appendFileSync(this.logFile, logLine, "utf8");
    } catch (error) {
      // Silently fail to avoid infinite loops
      this.enableFileLogging = false;
    }
  }

  /**
   * Rotate log file
   */
  rotateLogFile() {
    try {
      // Find existing rotated files
      const baseName = path.basename(this.logFile, ".log");
      const dir = path.dirname(this.logFile);
      const files = fs.readdirSync(dir)
        .filter(f => f.startsWith(baseName) && f.endsWith(".log"))
        .sort();

      // Remove oldest if at max
      if (files.length >= this.maxFiles) {
        const oldest = path.join(dir, files[0]);
        fs.unlinkSync(oldest);
      }

      // Rename current file
      const newName = `${baseName}-${Date.now()}.log`;
      const newPath = path.join(dir, newName);
      fs.renameSync(this.logFile, newPath);

      // Create new log file
      this.logFile = path.join(dir, `${baseName}.log`);
    } catch (error) {
      console.error("Failed to rotate log file:", error);
    }
  }

  /**
   * Convenience methods
   */
  debug(category, message, data = null) {
    this.log(this.logLevels.DEBUG, category, message, data);
  }

  info(category, message, data = null) {
    this.log(this.logLevels.INFO, category, message, data);
  }

  warn(category, message, data = null) {
    this.log(this.logLevels.WARN, category, message, data);
  }

  error(category, message, data = null) {
    this.log(this.logLevels.ERROR, category, message, data);
  }

  critical(category, message, data = null) {
    this.log(this.logLevels.CRITICAL, category, message, data);
  }

  /**
   * Get recent logs
   */
  getRecentLogs(level = null, category = null, limit = 100) {
    let filtered = this.logs;

    if (level) {
      const levelNum = typeof level === "string" 
        ? this.logLevels[level.toUpperCase()] 
        : level;
      filtered = filtered.filter(log => 
        Object.keys(this.logLevels).find(k => this.logLevels[k] === log.level) === level
      );
    }

    if (category) {
      filtered = filtered.filter(log => log.category === category);
    }

    return filtered.slice(-limit);
  }

  /**
   * Clear logs
   */
  clearLogs() {
    this.logs = [];
  }

  /**
   * Export logs to file
   */
  exportLogs(filePath, level = null, category = null) {
    try {
      const logs = this.getRecentLogs(level, category, this.maxLogs);
      fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
      return true;
    } catch (error) {
      this.error("Logger", "Failed to export logs", { error: error.message });
      return false;
    }
  }
}

// Export singleton instance
module.exports = new AdvancedLogger();

