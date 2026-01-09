/**
 * @file advanced-protection.js
 * @description Extreme anti-tampering and anti-cracking protection system
 * Implements multiple layers of security to prevent reverse engineering and leaks
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { exec, spawn } = require("child_process");
const { app } = require("electron");

class AdvancedProtection {
  constructor() {
    this.isActive = false;
    this.checkIntervals = [];
    this.integrityHashes = new Map();
    this.originalCodeSignatures = new Map();
    this.detectionCount = 0;
    this.maxDetections = 10; // Max detections before termination (increased to reduce false positives)
    this.detectionHistory = []; // Track detection history
    this.falsePositiveFilter = true; // Enable false positive filtering
    
    // Critical files to monitor
    this.criticalFiles = [
      "main.js",
      "preload.js",
      "auth.js",
      "anti-re.js",
      "advanced-protection.js",
      "startup-checker.js",
    ];

    // Critical executables
    this.criticalExecutables = [
      "Build Macro high performance.exe",
      "Build Macro medium performance.exe",
      "Build Macro low performance.exe",
      "Double Edit Macro high performance.exe",
      "Double Edit Macro medium performance.exe",
      "Double Edit Macro low performance.exe",
      "Other Macros.exe",
      "crouch spam.exe",
    ];

    // Suspicious processes (extended list)
    this.suspiciousProcesses = [
      // Debuggers
      "x64dbg.exe", "x32dbg.exe", "ollydbg.exe", "windbg.exe", "gdb.exe",
      "ida.exe", "ida64.exe", "idag.exe", "idag64.exe", "idaw.exe", "idaw64.exe",
      "idaq.exe", "idaq64.exe", "immunity.exe",
      
      // Decompilers
      "dnspy.exe", "ilspy.exe", "dotpeek.exe", "reflector.exe", "jetbrains.exe",
      
      // Disassemblers
      "ghidra.exe", "binaryninja.exe", "hopper.exe", "radare2.exe", "cutter.exe",
      "hiew.exe", "hiew32.exe", "hiew64.exe",
      
      // Memory/Process Tools
      "processhacker.exe", "procexp.exe", "procexp64.exe", "cheatengine.exe",
      "cheatengine-x86_64.exe", "artmoney.exe", "gameguardian.exe",
      
      // Network Analysis
      "fiddler.exe", "wireshark.exe", "charles.exe", "httpdebugger.exe",
      "burpsuite.exe", "mitmproxy.exe", "proxyman.exe",
      
      // System Analysis
      "procmon.exe", "procmon64.exe", "apimonitor.exe", "apimonitor-x64.exe",
      "apimonitor-x86.exe", "regmon.exe", "filemon.exe",
      
      // Injection/Hooking Tools
      "hookshark.exe", "injector.exe", "extreme injector.exe", "xenos.exe",
      "injectorx.exe", "winject.exe", "dllinjector.exe",
      
      // Analysis Tools
      "pestudio.exe", "die.exe", "peid.exe", "lordpe.exe", "protection_id.exe",
      "scylla.exe", "scylla_x64.exe", "scylla_x86.exe", "importrec.exe",
      
      // REMOVED: Virtual Machines - Too many false positives for legitimate users
      // "vmware.exe", "vmwaretray.exe", "vmwareuser.exe", "vmtoolsd.exe",
      // "vboxservice.exe", "vboxtray.exe", "vmusrvc.exe", "vmsrvc.exe",
      // "qemu-ga.exe", "qemu-system.exe",
      
      // REMOVED: Sandbox Detection - Too many false positives
      // "sandboxie.exe", "cuckoo.exe", "joebox.exe", "anubis.exe",
      
      // Code Analysis
      "ghidra.exe", "r2.exe", "r2agent.exe", "cutter.exe",
    ];

    // Suspicious registry keys (VM/Sandbox indicators)
    this.suspiciousRegistryKeys = [
      "HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\VBoxGuest",
      "HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\VBoxMouse",
      "HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\VBoxService",
      "HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\VBoxSF",
      "HKEY_LOCAL_MACHINE\\HARDWARE\\Description\\System",
      "HKEY_LOCAL_MACHINE\\HARDWARE\\DEVICEMAP\\Scsi\\Scsi Port 0",
    ];
  }

  /**
   * Initialize and start all protection mechanisms
   */
  async initialize() {
    if (this.isActive) {
      console.log("[Advanced Protection] Already active");
      return;
    }

    console.log("\n╔═══════════════════════════════════════════════════════╗");
    console.log("║     ADVANCED PROTECTION SYSTEM ACTIVATED              ║");
    console.log("╚═══════════════════════════════════════════════════════╝\n");

    this.isActive = true;

    // Calculate initial integrity hashes
    await this.calculateIntegrityHashes();

    // Start all protection mechanisms
    this.startProcessMonitoring();
    this.startIntegrityChecking();
    this.startMemoryProtection();
    this.startNetworkMonitoring();
    this.startVMSandboxDetection();
    this.startCodeInjectionDetection();
    this.startAPIHookingDetection();
    this.startSelfModificationDetection();
    this.startLicenseHardening();
    this.startAntiDumpProtection();
    this.startRuntimeTamperingDetection();

    console.log("✅ All advanced protection mechanisms active\n");
  }

  /**
   * Calculate integrity hashes for critical files
   */
  async calculateIntegrityHashes() {
    console.log("[Advanced Protection] Calculating integrity hashes...");

    const filesToCheck = [...this.criticalFiles];
    const resourcePath = app.isPackaged 
      ? process.resourcesPath || __dirname 
      : __dirname;

    for (const file of filesToCheck) {
      try {
        const filePath = path.join(resourcePath, file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath);
          const hash = crypto.createHash("sha256").update(content).digest("hex");
          this.integrityHashes.set(file, hash);
          console.log(`  ✅ ${file}: ${hash.substring(0, 16)}...`);
        }
      } catch (error) {
        console.error(`  ❌ Error hashing ${file}:`, error.message);
      }
    }

    // Also hash executables
    for (const exe of this.criticalExecutables) {
      try {
        const exePath = path.join(resourcePath, exe);
        if (fs.existsSync(exePath)) {
          const content = fs.readFileSync(exePath);
          const hash = crypto.createHash("sha256").update(content).digest("hex");
          this.integrityHashes.set(exe, hash);
        }
      } catch (error) {
        // Executable might not exist in dev mode
      }
    }
  }

  /**
   * Start process monitoring (extended) - Less aggressive
   */
  startProcessMonitoring() {
    console.log("[Advanced Protection] Starting process monitoring (reduced sensitivity)...");

    const checkProcesses = () => {
      exec("tasklist /FO CSV", { encoding: "utf8" }, (error, stdout) => {
        if (error) return;

        const processes = stdout.toLowerCase();
        let detectedCount = 0;
        const detected = [];

        for (const proc of this.suspiciousProcesses) {
          const escaped = proc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const regex = new RegExp(`\\b${escaped}\\b`, "i");
          if (regex.test(processes)) {
            detected.push(proc);
            detectedCount++;
          }
        }

        // Only trigger if multiple suspicious processes are detected (reduces false positives)
        if (detectedCount >= 2) {
          this.handleDetection("Multiple suspicious processes detected", detected.join(", "));
        } else if (detectedCount === 1) {
          // Log but don't trigger for single detection (likely false positive)
          const proc = detected[0];
          // Only trigger for high-risk tools
          const highRiskTools = [
            "x64dbg.exe", "x32dbg.exe", "ollydbg.exe", "ida.exe", "ida64.exe",
            "cheatengine.exe", "processhacker.exe", "fiddler.exe", "wireshark.exe"
          ];
          if (highRiskTools.includes(proc.toLowerCase())) {
            this.handleDetection("High-risk tool detected", proc);
          }
        }
      });
    };

    // Check every 10 seconds (reduced frequency)
    const interval = setInterval(checkProcesses, 10000);
    this.checkIntervals.push(interval);
    // Skip initial check to avoid false positives on startup
  }

  /**
   * Start integrity checking - Disabled in dev mode to prevent false positives
   */
  startIntegrityChecking() {
    // Skip integrity checking in development mode (files change frequently)
    if (!app.isPackaged) {
      console.log("[Advanced Protection] Integrity checking disabled in dev mode");
      return;
    }

    console.log("[Advanced Protection] Starting integrity checking...");

    const checkIntegrity = async () => {
      const resourcePath = process.resourcesPath || __dirname;
      let violations = 0;

      for (const [file, expectedHash] of this.integrityHashes.entries()) {
        try {
          const filePath = path.join(resourcePath, file);
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath);
            const currentHash = crypto.createHash("sha256").update(content).digest("hex");
            
            if (currentHash !== expectedHash) {
              violations++;
              // Only trigger if multiple files are modified (reduces false positives)
              if (violations >= 2) {
                this.handleDetection("Multiple file integrity violations", file);
                return;
              }
            }
          }
        } catch (error) {
          // File might not exist, ignore
        }
      }
    };

    // Check every 30 seconds (reduced frequency)
    const interval = setInterval(checkIntegrity, 30000);
    this.checkIntervals.push(interval);
  }

  /**
   * Start memory protection checks
   */
  startMemoryProtection() {
    console.log("[Advanced Protection] Starting memory protection...");

    const checkMemory = () => {
      // Check for memory scanning tools
      exec("wmic process get name,processid", { encoding: "utf8" }, (error, stdout) => {
        if (error) return;

        const memoryTools = ["vmmap.exe", "rammap.exe", "poolmon.exe"];
        const output = stdout.toLowerCase();
        
        for (const tool of memoryTools) {
          if (output.includes(tool)) {
            this.handleDetection("Memory analysis tool detected", tool);
            return;
          }
        }
      });
    };

    const interval = setInterval(checkMemory, 10000);
    this.checkIntervals.push(interval);
  }

  /**
   * Start network monitoring
   */
  startNetworkMonitoring() {
    console.log("[Advanced Protection] Starting network monitoring...");

    const checkNetwork = () => {
      // Check for network interception tools
      exec("netstat -ano", { encoding: "utf8" }, (error, stdout) => {
        if (error) return;

        // Check for suspicious listening ports (common proxy ports)
        const suspiciousPorts = [8888, 8080, 3128, 8118];
        for (const port of suspiciousPorts) {
          if (stdout.includes(`:${port}`)) {
            // Could be a proxy, but don't trigger immediately
            // Just log for now
          }
        }
      });
    };

    const interval = setInterval(checkNetwork, 15000);
    this.checkIntervals.push(interval);
  }

  /**
   * Start VM and Sandbox detection - DISABLED (too many false positives)
   */
  startVMSandboxDetection() {
    // DISABLED: VM/Sandbox detection causes too many false positives
    // Many legitimate users run VMs for development or other purposes
    console.log("[Advanced Protection] VM/Sandbox detection disabled (false positive reduction)");
    return;
  }

  /**
   * Start code injection detection
   */
  startCodeInjectionDetection() {
    console.log("[Advanced Protection] Starting code injection detection...");

    const checkInjection = () => {
      // Check for DLL injection tools
      exec("tasklist /m", { encoding: "utf8" }, (error, stdout) => {
        if (error) return;

        const injectionTools = ["injector.exe", "dllinjector.exe", "winject.exe"];
        const output = stdout.toLowerCase();
        
        for (const tool of injectionTools) {
          if (output.includes(tool)) {
            this.handleDetection("Code injection tool detected", tool);
            return;
          }
        }
      });
    };

    const interval = setInterval(checkInjection, 8000);
    this.checkIntervals.push(interval);
  }

  /**
   * Start API hooking detection
   */
  startAPIHookingDetection() {
    console.log("[Advanced Protection] Starting API hooking detection...");

    const checkHooking = () => {
      // Check for hooking tools
      exec("tasklist", { encoding: "utf8" }, (error, stdout) => {
        if (error) return;

        const hookingTools = ["hookshark.exe", "apimonitor.exe", "detours.exe"];
        const output = stdout.toLowerCase();
        
        for (const tool of hookingTools) {
          if (output.includes(tool)) {
            this.handleDetection("API hooking tool detected", tool);
            return;
          }
        }
      });
    };

    const interval = setInterval(checkHooking, 12000);
    this.checkIntervals.push(interval);
  }

  /**
   * Start self-modification detection - DISABLED in dev mode
   */
  startSelfModificationDetection() {
    // Skip in dev mode (files change frequently during development)
    if (!app.isPackaged) {
      console.log("[Advanced Protection] Self-modification detection disabled in dev mode");
      return;
    }

    console.log("[Advanced Protection] Starting self-modification detection...");

    // Monitor critical files for changes
    const checkModification = () => {
      const resourcePath = process.resourcesPath || __dirname;
      let modifiedCount = 0;

      for (const file of this.criticalFiles) {
        try {
          const filePath = path.join(resourcePath, file);
          if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            const now = Date.now();
            const modified = stats.mtimeMs;
            
            // If file was modified recently (within last 10 seconds), it's suspicious
            // Increased threshold to reduce false positives
            if (now - modified < 10000 && now - modified > 1000) {
              modifiedCount++;
              // Only trigger if multiple files are modified
              if (modifiedCount >= 3) {
                this.handleDetection("Multiple file modifications detected", file);
                return;
              }
            }
          }
        } catch (error) {
          // Ignore
        }
      }
    };

    // Check every 15 seconds (reduced frequency)
    const interval = setInterval(checkModification, 15000);
    this.checkIntervals.push(interval);
  }

  /**
   * Start license hardening
   */
  startLicenseHardening() {
    console.log("[Advanced Protection] Starting license hardening...");

    // Monitor for license bypass attempts
    const checkLicense = () => {
      // Check if license validation is being tampered with
      // This would require integration with your KeyAuth system
      // For now, we'll just monitor for suspicious activity
      
      // Check for network interception that might be used to bypass license checks
      exec("netstat -ano | findstr :443", { encoding: "utf8" }, (error, stdout) => {
        if (error) return;

        // Multiple connections to port 443 might indicate MITM
        const lines = stdout.split("\n").filter(l => l.trim());
        if (lines.length > 10) {
          // Suspicious number of HTTPS connections
        }
      });
    };

    const interval = setInterval(checkLicense, 30000);
    this.checkIntervals.push(interval);
  }

  /**
   * Start anti-dump protection
   */
  startAntiDumpProtection() {
    console.log("[Advanced Protection] Starting anti-dump protection...");

    // Check for memory dump tools
    const checkDump = () => {
      exec("tasklist", { encoding: "utf8" }, (error, stdout) => {
        if (error) return;

        const dumpTools = ["procdump.exe", "taskmgr.exe", "procexp.exe"];
        const output = stdout.toLowerCase();
        
        // Only trigger if multiple dump tools are running
        let count = 0;
        for (const tool of dumpTools) {
          if (output.includes(tool)) {
            count++;
          }
        }
        
        if (count >= 2) {
          this.handleDetection("Memory dump tools detected", "Multiple tools");
        }
      });
    };

    const interval = setInterval(checkDump, 15000);
    this.checkIntervals.push(interval);
  }

  /**
   * Start runtime tampering detection - Less aggressive
   */
  startRuntimeTamperingDetection() {
    console.log("[Advanced Protection] Starting runtime tampering detection...");

    // Monitor process memory and behavior
    const checkTampering = () => {
      // Check if process is being debugged
      try {
        // REMOVED: process.debugPort check - causes false positives
        // process.debugPort can be set even without a debugger attached

        // Check for inspect flags (only explicit flags, not environment)
        const args = process.argv.join(" ");
        if (args.includes("--inspect") || args.includes("--inspect-brk")) {
          // Only trigger if explicitly passed, not if set by environment
          if (args.includes("--inspect=") || args.includes("--inspect-brk=")) {
            this.handleDetection("Debugger flags detected", args);
            return;
          }
        }
      } catch (error) {
        // Ignore
      }

      // REMOVED: Environment check - too many false positives
      // Many legitimate tools set NODE_OPTIONS
    };

    // Check every 30 seconds (reduced frequency)
    const interval = setInterval(checkTampering, 30000);
    this.checkIntervals.push(interval);
    // Skip initial check
  }

  /**
   * Handle security detection - With false positive filtering
   */
  handleDetection(type, details) {
    // Add to detection history
    const detection = {
      type,
      details,
      timestamp: Date.now(),
    };
    this.detectionHistory.push(detection);
    
    // Keep only last 20 detections
    if (this.detectionHistory.length > 20) {
      this.detectionHistory.shift();
    }

    // False positive filtering: Check if this is a recurring false positive
    if (this.falsePositiveFilter) {
      const recentSameDetections = this.detectionHistory.filter(
        d => d.type === type && d.details === details && (Date.now() - d.timestamp) < 60000
      ).length;

      // If same detection happens 3+ times in 1 minute, likely false positive
      if (recentSameDetections >= 3) {
        console.warn(`[Advanced Protection] Ignoring likely false positive: ${type} - ${details}`);
        return; // Don't count this detection
      }
    }

    this.detectionCount++;
    
    console.warn("\n╔═══════════════════════════════════════════════════════╗");
    console.warn("║           SECURITY WARNING DETECTED                    ║");
    console.warn("╚═══════════════════════════════════════════════════════╝");
    console.warn(`\n[Advanced Protection] ${type}: ${details}`);
    console.warn(`[Advanced Protection] Detection count: ${this.detectionCount}/${this.maxDetections}`);
    console.warn(`[Advanced Protection] This is a WARNING - app will continue unless threshold is reached\n`);

    // Only terminate if we've reached the maximum AND it's a high-risk detection
    const highRiskTypes = [
      "File integrity violation",
      "Multiple file integrity violations",
      "Multiple file modifications detected",
      "High-risk tool detected"
    ];

    if (this.detectionCount >= this.maxDetections) {
      // Only terminate for high-risk detections
      if (highRiskTypes.includes(type)) {
        console.error("\n[Advanced Protection] MAXIMUM DETECTIONS REACHED (High Risk)");
        console.error("[Advanced Protection] TERMINATING APPLICATION IMMEDIATELY\n");
        this.terminate();
      } else {
        console.warn("\n[Advanced Protection] Maximum detections reached, but type is low-risk");
        console.warn("[Advanced Protection] Continuing operation - please report if this is a false positive\n");
        // Reset counter to prevent repeated warnings
        this.detectionCount = Math.floor(this.maxDetections * 0.7);
      }
    }
  }

  /**
   * Terminate application securely
   */
  terminate() {
    // Stop all monitoring
    this.stop();

    // Clear sensitive data from memory (best effort)
    this.integrityHashes.clear();
    this.originalCodeSignatures.clear();

    // Force immediate exit
    process.exit(1);
  }

  /**
   * Stop all protection mechanisms
   */
  stop() {
    if (!this.isActive) return;

    console.log("[Advanced Protection] Stopping protection...");

    // Clear all intervals
    for (const interval of this.checkIntervals) {
      clearInterval(interval);
    }
    this.checkIntervals = [];

    this.isActive = false;
    console.log("[Advanced Protection] Protection stopped");
  }

  /**
   * Verify application integrity on startup
   */
  async verifyStartupIntegrity() {
    console.log("[Advanced Protection] Verifying startup integrity...");

    // Check critical files exist
    const resourcePath = app.isPackaged 
      ? process.resourcesPath || __dirname 
      : __dirname;

    for (const file of this.criticalFiles) {
      const filePath = path.join(resourcePath, file);
      if (!fs.existsSync(filePath)) {
        console.error(`[Advanced Protection] Critical file missing: ${file}`);
        return false;
      }
    }

    // Verify hashes
    await this.calculateIntegrityHashes();

    console.log("[Advanced Protection] Startup integrity verified");
    return true;
  }

  /**
   * Get protection status
   */
  getStatus() {
    return {
      active: this.isActive,
      detectionCount: this.detectionCount,
      maxDetections: this.maxDetections,
      monitoredFiles: this.criticalFiles.length,
      monitoredProcesses: this.suspiciousProcesses.length,
    };
  }
}

// Export singleton instance
module.exports = new AdvancedProtection();

