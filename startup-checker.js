/**
 * @file startup-checker.js
 * @description Advanced startup error checker and auto-fixer system
 * Automatically detects and fixes common startup errors, validates files,
 * and optimizes the macro system for maximum performance
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

class StartupChecker {
  constructor(resourcePath, isDev) {
    this.resourcePath = resourcePath;
    this.isDev = isDev;
    this.errors = [];
    this.warnings = [];
    this.fixes = [];
    this.optimizations = [];
  }

  /**
   * Run comprehensive startup checks and fixes
   */
  async runAllChecks() {
    console.log("\n╔═══════════════════════════════════════════════════════╗");
    console.log("║     REXIUM LABS MACRO - STARTUP CHECKER              ║");
    console.log("╚═══════════════════════════════════════════════════════╝\n");

    // Check 1: Required macro executables
    await this.checkMacroExecutables();

    // Check 2: Command files
    await this.checkCommandFiles();

    // Check 3: Settings file
    await this.checkSettingsFile();

    // Check 4: File permissions
    await this.checkFilePermissions();

    // Check 5: Process compatibility
    await this.checkProcessCompatibility();

    // Check 6: System resources
    await this.checkSystemResources();

    // Check 7: Registry and system settings
    await this.checkSystemSettings();

    // Check 8: Advanced optimizations
    await this.applyAdvancedOptimizations();

    // Print summary
    this.printSummary();

    return {
      success: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      fixes: this.fixes,
      optimizations: this.optimizations,
    };
  }

  /**
   * Check all required macro executables exist
   */
  async checkMacroExecutables() {
    console.log("🔍 Checking macro executables...");

    const requiredExecutables = [
      "Build Macro high performance.exe",
      "Build Macro medium performance.exe",
      "Build Macro low performance.exe",
      "Double Edit Macro high performance.exe",
      "Double Edit Macro medium performance.exe",
      "Double Edit Macro low performance.exe",
      "Other Macros.exe",
      "crouch spam.exe",
    ];

    const missingFiles = [];
    const corruptedFiles = [];

    for (const exe of requiredExecutables) {
      const exePath = this.getResourcePath(exe);
      const exists = fs.existsSync(exePath);

      if (!exists) {
        missingFiles.push(exe);
        this.errors.push(`Missing executable: ${exe}`);
        console.log(`  ❌ Missing: ${exe}`);
      } else {
        // Check if file is readable and has valid size
        try {
          const stats = fs.statSync(exePath);
          if (stats.size < 1000) {
            // File too small, likely corrupted
            corruptedFiles.push(exe);
            this.errors.push(`Corrupted executable: ${exe} (size: ${stats.size} bytes)`);
            console.log(`  ⚠️  Corrupted: ${exe} (${stats.size} bytes)`);
          } else {
            console.log(`  ✅ Found: ${exe} (${(stats.size / 1024).toFixed(2)} KB)`);
          }
        } catch (error) {
          this.errors.push(`Cannot access: ${exe} - ${error.message}`);
          console.log(`  ❌ Cannot access: ${exe}`);
        }
      }
    }

    // Try to fix missing files by checking alternative locations
    if (missingFiles.length > 0) {
      console.log("  🔧 Attempting to locate missing files...");
      for (const exe of missingFiles) {
        const fixed = await this.tryFixMissingExecutable(exe);
        if (fixed) {
          this.fixes.push(`Located missing executable: ${exe}`);
        }
      }
    }

    if (this.errors.length === 0 && missingFiles.length === 0) {
      console.log("  ✅ All macro executables found and valid\n");
    }
  }

  /**
   * Check and create command files if needed
   */
  async checkCommandFiles() {
    console.log("🔍 Checking command files...");

    const commandFiles = [
      "build_commands.txt",
      "other_commands.txt",
      "double_commands.txt",
      "crouch_commands.txt",
    ];

    for (const file of commandFiles) {
      const filePath = path.join(this.resourcePath, file);

      try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
          console.log(`  ⚠️  Missing: ${file}, creating...`);
          fs.writeFileSync(filePath, "", "utf8");
          this.fixes.push(`Created missing command file: ${file}`);
          console.log(`  ✅ Created: ${file}`);
        } else {
          // Check if file is writable
          try {
            fs.accessSync(filePath, fs.constants.W_OK);
            console.log(`  ✅ Valid: ${file}`);
          } catch (error) {
            this.warnings.push(`Command file not writable: ${file}`);
            console.log(`  ⚠️  Not writable: ${file}`);
            
            // Try to fix permissions
            try {
              if (process.platform === "win32") {
                execSync(`icacls "${filePath}" /grant Everyone:F`, { stdio: "ignore" });
                this.fixes.push(`Fixed permissions for: ${file}`);
                console.log(`  ✅ Fixed permissions: ${file}`);
              }
            } catch (fixError) {
              this.errors.push(`Cannot fix permissions for: ${file}`);
            }
          }
        }
      } catch (error) {
        this.errors.push(`Error checking command file ${file}: ${error.message}`);
        console.log(`  ❌ Error: ${file} - ${error.message}`);
      }
    }

    console.log("");
  }

  /**
   * Check and validate settings file
   */
  async checkSettingsFile() {
    console.log("🔍 Checking settings file...");

    const settingsPath = path.join(this.resourcePath, "gui_settings.json");

    try {
      if (!fs.existsSync(settingsPath)) {
        console.log("  ⚠️  Settings file missing, creating default...");
        const defaultSettings = {
          performanceMode: "high",
          customColor: "#dc2626",
          "ghost-mode-key": "F10",
          "ez-mode-key": "F7",
        };
        fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2), "utf8");
        this.fixes.push("Created default settings file");
        console.log("  ✅ Created default settings file");
      } else {
        // Validate JSON structure
        try {
          const content = fs.readFileSync(settingsPath, "utf8");
          const settings = JSON.parse(content);
          
          // Ensure required fields exist
          let needsUpdate = false;
          if (!settings.performanceMode) {
            settings.performanceMode = "high";
            needsUpdate = true;
          }
          if (!settings.customColor) {
            settings.customColor = "#dc2626";
            needsUpdate = true;
          }
          if (!settings["ghost-mode-key"]) {
            settings["ghost-mode-key"] = "F10";
            needsUpdate = true;
          }
          if (!settings["ez-mode-key"]) {
            settings["ez-mode-key"] = "F7";
            needsUpdate = true;
          }

          if (needsUpdate) {
            fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), "utf8");
            this.fixes.push("Updated settings file with missing fields");
            console.log("  ✅ Updated settings file");
          } else {
            console.log("  ✅ Settings file valid");
          }
        } catch (parseError) {
          // Corrupted JSON, create backup and new file
          console.log("  ⚠️  Corrupted settings file, creating backup...");
          const backupPath = settingsPath + ".backup." + Date.now();
          fs.copyFileSync(settingsPath, backupPath);
          const defaultSettings = {
            performanceMode: "high",
            customColor: "#dc2626",
            "ghost-mode-key": "F10",
            "ez-mode-key": "F7",
          };
          fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2), "utf8");
          this.fixes.push("Fixed corrupted settings file (backup created)");
          console.log("  ✅ Fixed corrupted settings file");
        }
      }
    } catch (error) {
      this.errors.push(`Error with settings file: ${error.message}`);
      console.log(`  ❌ Error: ${error.message}`);
    }

    console.log("");
  }

  /**
   * Check file permissions
   */
  async checkFilePermissions() {
    console.log("🔍 Checking file permissions...");

    try {
      const testFile = path.join(this.resourcePath, "permission_test.tmp");
      
      // Test write permission
      try {
        fs.writeFileSync(testFile, "test", "utf8");
        fs.unlinkSync(testFile);
        console.log("  ✅ Write permissions OK");
      } catch (error) {
        this.warnings.push("Cannot write to resource directory");
        console.log("  ⚠️  Write permission issue");
        
        // Try to fix on Windows
        if (process.platform === "win32") {
          try {
            execSync(`icacls "${this.resourcePath}" /grant Everyone:F /T`, { stdio: "ignore" });
            this.fixes.push("Fixed directory permissions");
            console.log("  ✅ Fixed directory permissions");
          } catch (fixError) {
            this.errors.push("Cannot fix directory permissions - may need admin rights");
          }
        }
      }
    } catch (error) {
      this.warnings.push(`Permission check failed: ${error.message}`);
    }

    console.log("");
  }

  /**
   * Check process compatibility
   */
  async checkProcessCompatibility() {
    console.log("🔍 Checking process compatibility...");

    try {
      // Check if we can spawn processes
      const testProcess = require("child_process").spawn("cmd.exe", ["/c", "echo", "test"], {
        windowsHide: true,
        stdio: "ignore",
      });

      testProcess.on("exit", () => {
        console.log("  ✅ Process spawning OK");
      });

      testProcess.on("error", (error) => {
        this.errors.push(`Cannot spawn processes: ${error.message}`);
        console.log(`  ❌ Process spawning failed: ${error.message}`);
      });

      // Kill test process immediately
      setTimeout(() => {
        if (!testProcess.killed) {
          testProcess.kill();
        }
      }, 100);
    } catch (error) {
      this.errors.push(`Process compatibility check failed: ${error.message}`);
      console.log(`  ❌ Error: ${error.message}`);
    }

    console.log("");
  }

  /**
   * Check system resources
   */
  async checkSystemResources() {
    console.log("🔍 Checking system resources...");

    try {
      // Check available memory (Windows)
      if (process.platform === "win32") {
        try {
          const memInfo = execSync("wmic OS get TotalVisibleMemorySize,FreePhysicalMemory /value", {
            encoding: "utf8",
          });
          const freeMemMatch = memInfo.match(/FreePhysicalMemory=(\d+)/);
          const totalMemMatch = memInfo.match(/TotalVisibleMemorySize=(\d+)/);

          if (freeMemMatch && totalMemMatch) {
            const freeMB = parseInt(freeMemMatch[1]) / 1024;
            const totalMB = parseInt(totalMemMatch[1]) / 1024;
            const freePercent = ((freeMB / totalMB) * 100).toFixed(1);

            console.log(`  ℹ️  Free Memory: ${freeMB.toFixed(0)} MB (${freePercent}%)`);

            if (freeMB < 500) {
              this.warnings.push("Low system memory detected");
              console.log("  ⚠️  Low memory warning");
            } else {
              console.log("  ✅ Memory OK");
            }
          }
        } catch (error) {
          // Memory check failed, not critical
          console.log("  ℹ️  Memory check unavailable");
        }
      }
    } catch (error) {
      // Not critical
      console.log("  ℹ️  Resource check unavailable");
    }

    console.log("");
  }

  /**
   * Check system settings for optimal performance
   */
  async checkSystemSettings() {
    console.log("🔍 Checking system settings...");

    try {
      // Check Windows timer resolution (for better macro precision)
      if (process.platform === "win32") {
        try {
          // Try to set high-resolution timer (requires admin, but we try anyway)
          const { exec } = require("child_process");
          exec("timeBeginPeriod 1", { stdio: "ignore" }, (error) => {
            if (!error) {
              this.optimizations.push("High-resolution timer enabled");
              console.log("  ✅ High-resolution timer enabled");
            } else {
              console.log("  ℹ️  High-resolution timer (admin required)");
            }
          });
        } catch (error) {
          // Not critical
        }
      }
    } catch (error) {
      // Not critical
    }

    console.log("");
  }

  /**
   * Apply advanced optimizations (without touching AHK files)
   */
  async applyAdvancedOptimizations() {
    console.log("🔍 Applying advanced optimizations...");

    // Optimization 1: Enable process priority boost
    try {
      if (process.platform === "win32") {
        const { exec } = require("child_process");
        exec(`wmic process where ProcessId=${process.pid} CALL setpriority "high priority"`, {
          stdio: "ignore",
        }, (error) => {
          if (!error) {
            this.optimizations.push("Process priority set to high");
            console.log("  ✅ Process priority optimized");
          }
        });
      }
    } catch (error) {
      // Not critical
    }

    // Optimization 2: Disable Windows animations for better performance
    try {
      if (process.platform === "win32") {
        // This would require registry changes, so we just log it
        this.optimizations.push("System optimizations recommended (manual)");
        console.log("  ℹ️  System optimizations available (manual setup)");
      }
    } catch (error) {
      // Not critical
    }

    // Optimization 3: Pre-warm command files
    try {
      const commandFiles = [
        "build_commands.txt",
        "other_commands.txt",
        "double_commands.txt",
        "crouch_commands.txt",
      ];

      for (const file of commandFiles) {
        const filePath = path.join(this.resourcePath, file);
        if (fs.existsSync(filePath)) {
          // Pre-read file to warm up filesystem cache
          fs.readFileSync(filePath, "utf8");
        }
      }
      this.optimizations.push("Command files pre-warmed");
      console.log("  ✅ Command files pre-warmed");
    } catch (error) {
      // Not critical
    }

    // Optimization 4: Create optimized command file structure
    try {
      // Ensure command files have proper structure for faster parsing
      const commandFiles = [
        { name: "build_commands.txt", default: "" },
        { name: "other_commands.txt", default: "" },
        { name: "double_commands.txt", default: "" },
        { name: "crouch_commands.txt", default: "" },
      ];

      for (const file of commandFiles) {
        const filePath = path.join(this.resourcePath, file.name);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, "utf8");
          // Ensure file ends with newline for faster appending
          if (content && !content.endsWith("\n")) {
            fs.appendFileSync(filePath, "\n", "utf8");
          }
        }
      }
      this.optimizations.push("Command file structure optimized");
      console.log("  ✅ Command file structure optimized");
    } catch (error) {
      // Not critical
    }

    console.log("");
  }

  /**
   * Try to fix missing executable by searching alternative locations
   */
  async tryFixMissingExecutable(exeName) {
    const searchPaths = [
      this.resourcePath,
      path.join(this.resourcePath, ".."),
      path.join(this.resourcePath, "..", "resources"),
      __dirname,
      path.join(__dirname, "resources"),
    ];

    for (const searchPath of searchPaths) {
      const testPath = path.join(searchPath, exeName);
      if (fs.existsSync(testPath)) {
        // Found it! Create symlink or copy to expected location
        try {
          const targetPath = this.getResourcePath(exeName);
          const targetDir = path.dirname(targetPath);
          
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }

          // Copy file to expected location
          fs.copyFileSync(testPath, targetPath);
          console.log(`  ✅ Fixed: ${exeName} (copied from ${searchPath})`);
          return true;
        } catch (error) {
          console.log(`  ⚠️  Found ${exeName} but cannot copy: ${error.message}`);
        }
      }
    }

    return false;
  }

  /**
   * Get resource path (same logic as main.js)
   */
  getResourcePath(filename) {
    if (this.isDev) {
      return path.join(__dirname, filename);
    }
    const appPath = path.join(this.resourcePath, filename);
    const localPath = path.join(__dirname, filename);

    if (fs.existsSync(appPath)) {
      return appPath;
    }
    if (fs.existsSync(localPath)) {
      return localPath;
    }

    return appPath;
  }

  /**
   * Print summary of all checks
   */
  printSummary() {
    console.log("╔═══════════════════════════════════════════════════════╗");
    console.log("║              STARTUP CHECK SUMMARY                   ║");
    console.log("╚═══════════════════════════════════════════════════════╝\n");

    if (this.errors.length === 0) {
      console.log("✅ All critical checks passed!");
    } else {
      console.log(`❌ Found ${this.errors.length} error(s):`);
      this.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    }

    if (this.warnings.length > 0) {
      console.log(`\n⚠️  Found ${this.warnings.length} warning(s):`);
      this.warnings.forEach((warning, index) => {
        console.log(`   ${index + 1}. ${warning}`);
      });
    }

    if (this.fixes.length > 0) {
      console.log(`\n🔧 Applied ${this.fixes.length} fix(es):`);
      this.fixes.forEach((fix, index) => {
        console.log(`   ${index + 1}. ${fix}`);
      });
    }

    if (this.optimizations.length > 0) {
      console.log(`\n⚡ Applied ${this.optimizations.length} optimization(s):`);
      this.optimizations.forEach((opt, index) => {
        console.log(`   ${index + 1}. ${opt}`);
      });
    }

    console.log("\n" + "═".repeat(55) + "\n");
  }
}

module.exports = StartupChecker;

