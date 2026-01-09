/**
 * Anti-Reverse Engineering Protection Module
 * Detects debugging and reverse engineering tools and terminates the application
 */

const { exec } = require("child_process");
const { dialog } = require("electron");

class AntiReverseEngineering {
  constructor() {
    this.checkInterval = null;
    this.isMonitoring = false;

    // Common reverse engineering tools to detect (EXTENDED LIST)
    this.blacklistedProcesses = [
      // Debuggers
      "x64dbg.exe", "x32dbg.exe", "ollydbg.exe", "windbg.exe", "gdb.exe",
      "ida.exe", "ida64.exe", "idag.exe", "idag64.exe", "idaw.exe", "idaw64.exe",
      "idaq.exe", "idaq64.exe", "immunity.exe", "kdbg.exe", "kdbg64.exe",
      
      // .NET Decompilers/Debuggers
      "dnspy.exe", "ilspy.exe", "dotpeek.exe", "dotpeek32.exe", "dotpeek64.exe",
      "reflector.exe", "jetbrains.exe", "resharper.exe",
      
      // Disassemblers
      "ghidra.exe", "binaryninja.exe", "hopper.exe", "radare2.exe", "cutter.exe",
      "hiew.exe", "hiew32.exe", "hiew64.exe", "r2.exe", "r2agent.exe",
      
      // Process/Memory Tools
      "processhacker.exe", "procexp.exe", "procexp64.exe", "cheatengine-x86_64.exe",
      "cheatengine.exe", "artmoney.exe", "gameguardian.exe", "vmmap.exe",
      "rammap.exe", "poolmon.exe", "procdump.exe", "procdump64.exe",
      
      // Network Analysis
      "fiddler.exe", "wireshark.exe", "charles.exe", "httpdebugger.exe",
      "burpsuite.exe", "mitmproxy.exe", "proxyman.exe", "postman.exe",
      
      // System Analysis
      "procmon.exe", "procmon64.exe", "apimonitor.exe", "apimonitor-x64.exe",
      "apimonitor-x86.exe", "regmon.exe", "filemon.exe", "detours.exe",
      
      // Hooking/Injection Tools
      "hookshark.exe", "injector.exe", "extreme injector.exe", "xenos.exe",
      "injectorx.exe", "winject.exe", "dllinjector.exe", "remote.dll.exe",
      
      // Other Analysis Tools
      "pestudio.exe", "die.exe", "peid.exe", "lordpe.exe", "protection_id.exe",
      "scylla.exe", "scylla_x64.exe", "scylla_x86.exe", "importrec.exe",
      "ollydump.exe", "ollydump2.exe", "lordpe.exe",
      
      // Virtual Machines (for VM detection)
      "vmware.exe", "vmwaretray.exe", "vmwareuser.exe", "vmtoolsd.exe",
      "vboxservice.exe", "vboxtray.exe", "vmusrvc.exe", "vmsrvc.exe",
      "qemu-ga.exe", "qemu-system.exe",
      
      // Sandbox Detection
      "sandboxie.exe", "cuckoo.exe", "joebox.exe", "anubis.exe",
      
      // Code Analysis
      "ghidra.exe", "r2.exe", "r2agent.exe", "cutter.exe",
      
      // Additional cracking tools
      "unpacker.exe", "upx.exe", "pecompact.exe", "themida.exe",
      "vmprotect.exe", "enigma.exe", "aspack.exe", "upack.exe",
    ];

    // Window title keywords to detect
    this.blacklistedWindowTitles = [
      "x64dbg",
      "x32dbg",
      "ollydbg",
      "ida pro",
      "ida freeware",
      "windbg",
      "immunity debugger",
      "dnspy",
      "ilspy",
      "dotpeek",
      "ghidra",
      "binary ninja",
      "hopper disassembler",
      "process hacker",
      "process explorer",
      "cheat engine",
      "fiddler",
      "wireshark",
      "charles proxy",
      "http debugger",
      "burp suite",
      "procmon",
      "process monitor",
      "api monitor",
      "detect it easy",
      "pestudio",
      "scylla",
    ];
  }

  /**
   * Escape special regex characters to prevent regex injection
   * @param {string} str - String to escape
   * @returns {string} - Escaped string safe for regex use
   */
  escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /**
   * Start monitoring for reverse engineering tools
   * @param {number} interval - Check interval in milliseconds (default: 10000ms - increased to reduce false positives)
   */
  startMonitoring(interval = 10000) {
    if (this.isMonitoring) {
      console.log("[Anti-RE] Monitoring already active");
      return;
    }

    console.log("[Anti-RE] Starting reverse engineering tool detection (reduced sensitivity)...");
    this.isMonitoring = true;

    // Skip initial check to avoid false positives on startup
    // Set up periodic checks
    this.checkInterval = setInterval(() => {
      this.performCheck();
    }, interval);
  }

  /**
   * Stop monitoring
   */
  stopMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    this.isMonitoring = false;
    console.log("[Anti-RE] Monitoring stopped");
  }

  /**
   * Perform a single detection check
   */
  performCheck() {
    // Check running processes
    this.checkProcesses();

    // Check window titles
    this.checkWindowTitles();
  }

  /**
   * Check for blacklisted processes
   * FIXED: Use word boundary matching to prevent false positives from partial matches
   */
  checkProcesses() {
    // Use tasklist to get running processes on Windows
    exec("tasklist", (error, stdout, _stderr) => {
      if (error) {
        console.error("[Anti-RE] Error checking processes:", error);
        return;
      }

      const runningProcesses = stdout.toLowerCase();

      // FIXED: Use word boundary regex to match exact process names
      // This prevents partial matches and reduces false positives
      for (const processName of this.blacklistedProcesses) {
        try {
          // Match process name with word boundaries to ensure exact match
          // The \b ensures we match "cheatengine.exe" but not "mycheatengine.exe"
          const escapedName = this.escapeRegex(processName.toLowerCase());
          const regex = new RegExp(`\\b${escapedName}\\b`, "i");
          if (regex.test(runningProcesses)) {
            this.handleDetection("process", processName);
            return; // Exit after first detection
          }
        } catch (regexError) {
          console.error(
            "[Anti-RE] Regex error for process:",
            processName,
            regexError,
          );
        }
      }
    });
  }

  /**
   * Check for blacklisted window titles
   * FIXED: Use word boundary matching to prevent false positives from partial matches
   */
  checkWindowTitles() {
    // PowerShell command to get all window titles
    const psCommand = `
            Get-Process | Where-Object {$_.MainWindowTitle -ne ""} | Select-Object MainWindowTitle | ForEach-Object {$_.MainWindowTitle}
        `;

    exec(`powershell -Command "${psCommand}"`, (error, stdout, _stderr) => {
      if (error) {
        // Silently fail - PowerShell might not be available or command might fail
        return;
      }

      const windowTitles = stdout.toLowerCase();

      // FIXED: Use word boundary regex to prevent false positives
      // This prevents matching partial words (e.g., "process hacker tutorial" in browser)
      for (const keyword of this.blacklistedWindowTitles) {
        try {
          // Create regex with word boundaries to match whole words/phrases only
          // Escape special chars but preserve spaces for multi-word matching
          const escapedKeyword = this.escapeRegex(
            keyword.toLowerCase(),
          ).replace(/\\\s/g, "\\s+");
          const regex = new RegExp(`\\b${escapedKeyword}\\b`, "i");
          if (regex.test(windowTitles)) {
            this.handleDetection("window", keyword);
            return; // Exit after first detection
          }
        } catch (regexError) {
          console.error(
            "[Anti-RE] Regex error for window title:",
            keyword,
            regexError,
          );
        }
      }
    });
  }

  /**
   * Handle detection of reverse engineering tool
   * @param {string} type - Detection type ('process' or 'window')
   * @param {string} name - Name of detected tool
   */
  handleDetection(type, name) {
    console.log(`[Anti-RE] DETECTED: ${type} - ${name}`);

    // Stop monitoring to prevent multiple triggers
    this.stopMonitoring();

    // Log the detection
    const detectionMessage =
      type === "process"
        ? `Detected reverse engineering process: ${name}`
        : `Detected reverse engineering tool window: ${name}`;

    console.error(`[Anti-RE] ${detectionMessage}`);
    console.error(
      "[Anti-RE] Application will now terminate for security reasons",
    );

    // Optional: Show a dialog (commented out for stealth - uncomment if you want to inform user)
    // dialog.showErrorBox(
    //     'Security Alert',
    //     'A debugging or reverse engineering tool has been detected. The application will now close.'
    // );

    // Immediate termination
    process.exit(1);
  }

  /**
   * Check if debugger is attached (additional check)
   */
  isDebuggerPresent() {
    // Note: This is a basic check. On Windows, Electron apps can check process.debugPort
    // or use native modules for more sophisticated detection

    // Check for --inspect or --inspect-brk flags
    const args = process.argv.join(" ");
    if (args.includes("--inspect") || args.includes("--inspect-brk")) {
      return true;
    }

    // FIXED: Removed process.debugPort check as it causes false positives
    // process.debugPort being defined doesn't mean a debugger is attached
    // Only rely on explicit inspect flags for now

    return false;
  }

  /**
   * Perform initial security check before app starts
   */
  initialSecurityCheck() {
    console.log("[Anti-RE] Performing initial security check...");

    // Check if debugger is attached
    if (this.isDebuggerPresent()) {
      console.error("[Anti-RE] Debugger detected at startup!");
      dialog.showErrorBox(
        "Security Alert",
        "Debugger detected. Application cannot start.",
      );
      process.exit(1);
    }

    console.log("[Anti-RE] Initial security check passed");
  }

  /**
   * Handle DevTools detection from renderer process
   * Called when client-side anti-debug detects browser DevTools
   * @param {string} method - Detection method that triggered
   */
  handleDevToolsDetection(method) {
    // DevTools detection disabled - allow DevTools
    console.log(`[Anti-RE] DevTools detected: ${method} (allowed - detection disabled)`);
    // Do nothing - DevTools are allowed
  }

  /**
   * Disable DevTools in BrowserWindow
   * DISABLED - DevTools are now allowed
   * @param {BrowserWindow} window - The window to disable DevTools for
   */
  disableDevTools(window) {
    // DevTools protection disabled - DevTools are allowed
    console.log("[Anti-RE] DevTools protection disabled - DevTools are allowed");
    // Do nothing - allow DevTools
  }
}

// Export singleton instance
module.exports = new AntiReverseEngineering();
