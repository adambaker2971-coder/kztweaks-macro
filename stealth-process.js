/**
 * Stealth Process Management
 * Advanced process spawning and management to avoid detection
 */

const { spawn, exec } = require("child_process");
const path = require("path");
const crypto = require("crypto");
const eacEvasion = require("./eac-evasion.js");

class StealthProcessManager {
  constructor() {
    this.activeProcesses = new Map();
    this.processCounter = 0;
  }

  /**
   * Generate random process identifier
   */
  generateProcessId() {
    return `proc_${crypto.randomBytes(8).toString("hex")}_${Date.now()}`;
  }

  /**
   * Create stealth spawn wrapper
   */
  spawnStealth(exePath, args = [], options = {}) {
    // Pre-spawn evasion
    eacEvasion.injectRandomDelays(2);
    eacEvasion.executeDecoyOperations();
    
    // Obfuscate executable path
    const pathInfo = eacEvasion.obfuscateFilePath(exePath);
    const actualPath = pathInfo.resolved || pathInfo.original;
    
    // Enhanced stealth options
      const stealthOptions = {
      cwd: path.dirname(actualPath),
      detached: false,
      windowsHide: true, // Critical: Hide window from taskbar
      stdio: options.stdio || ["ignore", "ignore", "ignore"], // Hide all I/O by default
      shell: false,
      ...options,
      env: {
        ...process.env,
        ...options.env,
        // Add random environment variables
        [`_TMP_${crypto.randomBytes(4).toString("hex")}`]: crypto.randomBytes(8).toString("hex"),
      },
    };
    
    // Random delay before spawn
    eacEvasion.randomDelay(10, 75);
    
    try {
      const childProcess = spawn(actualPath, args, stealthOptions);
      const processId = this.generateProcessId();
      
      // Store process info
      this.activeProcesses.set(processId, {
        process: childProcess,
        exePath: actualPath,
        pid: childProcess.pid,
        startTime: Date.now(),
      });
      
      // Post-spawn evasion
      setTimeout(() => {
        eacEvasion.executeDecoyOperations();
      }, Math.random() * 50 + 10);
      
      // Cleanup on exit
      childProcess.on("exit", () => {
        this.activeProcesses.delete(processId);
      });
      
      return { process: childProcess, processId, pid: childProcess.pid };
    } catch (error) {
      console.error("[Stealth Process] Spawn failed:", error.message);
      throw error;
    }
  }

  /**
   * Kill process stealthily
   */
  killStealth(processId) {
    const procInfo = this.activeProcesses.get(processId);
    if (!procInfo) {
      return false;
    }
    
    try {
      // Random delay before kill
      eacEvasion.randomDelay(5, 25);
      
      if (procInfo.process && !procInfo.process.killed) {
        procInfo.process.kill();
      }
      
      // Also try taskkill as fallback (Windows)
      if (process.platform === "win32" && procInfo.pid) {
        setTimeout(() => {
          try {
            exec(`taskkill /F /PID ${procInfo.pid}`, { windowsHide: true });
          } catch (e) {
            // Ignore errors
          }
        }, 100);
      }
      
      this.activeProcesses.delete(processId);
      return true;
    } catch (error) {
      console.error("[Stealth Process] Kill failed:", error.message);
      return false;
    }
  }

  /**
   * Get all active process PIDs
   */
  getActivePIDs() {
    return Array.from(this.activeProcesses.values()).map(p => p.pid);
  }

  /**
   * Cleanup all processes
   */
  cleanup() {
    for (const [processId, procInfo] of this.activeProcesses.entries()) {
      try {
        if (procInfo.process && !procInfo.process.killed) {
          procInfo.process.kill();
        }
      } catch (e) {
        // Ignore errors during cleanup
      }
    }
    this.activeProcesses.clear();
  }
}

// Export singleton
const stealthProcessManager = new StealthProcessManager();

module.exports = stealthProcessManager;

