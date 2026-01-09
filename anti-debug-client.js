/**
 * Client-Side Anti-Debugging Protection
 * Detects browser DevTools, debuggers, and inspection tools in the renderer process
 * MUST be loaded in the renderer process (via preload or script tag)
 */

class ClientAntiDebug {
  constructor() {
    this.isDetectionActive = false;
    this.detectionInterval = null;
    this.consoleCheckInterval = null;
    this.debuggerCheckInterval = null;

    // Track detection threshold to avoid false positives
    this.detectionCount = 0;
    this.detectionThreshold = 5; // Must detect 5 times before triggering to avoid false positives

    // Devtools detection methods
    this.methods = {
      devtoolsOpen: false,
      debuggerPresent: false,
      consoleOpen: false,
      timingAnomaly: false,
    };
  }

  /**
   * Start all anti-debugging checks
   */
  startProtection() {
    if (this.isDetectionActive) {
      console.log("[Client Anti-Debug] Protection already active");
      return;
    }

    console.log("[Client Anti-Debug] Starting protection...");
    this.isDetectionActive = true;

    // Multiple detection methods running in parallel
    this.checkDevToolsOpen();
    this.checkDebugger();
    this.checkConsole();
    this.preventRightClick();
    this.preventKeyboardShortcuts();
    this.checkTiming();

    // Periodic checks - increased intervals to reduce false positives and CPU usage
    this.detectionInterval = setInterval(() => {
      this.checkDevToolsOpen();
      this.checkTiming();
    }, 3000); // Reduced frequency from 1s to 3s

    this.debuggerCheckInterval = setInterval(() => {
      this.checkDebugger();
    }, 2000); // Reduced frequency from 500ms to 2s

    this.consoleCheckInterval = setInterval(() => {
      this.checkConsole();
    }, 5000); // Reduced frequency from 2s to 5s

    console.log("[Client Anti-Debug] All protection mechanisms active");
  }

  /**
   * Stop protection
   */
  stopProtection() {
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
    }
    if (this.debuggerCheckInterval) {
      clearInterval(this.debuggerCheckInterval);
    }
    if (this.consoleCheckInterval) {
      clearInterval(this.consoleCheckInterval);
    }
    this.isDetectionActive = false;
    console.log("[Client Anti-Debug] Protection stopped");
  }

  /**
   * Method 1: Check if DevTools are open using element detection
   */
  checkDevToolsOpen() {
    try {
      // Check window size difference (DevTools docked)
      // Higher threshold to reduce false positives from window chrome/resizing
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      // Trigger if one dimension has a significant difference (300px+)
      // This indicates DevTools is docked and taking up space
      if (widthDiff > 300 || heightDiff > 300) {
        this.methods.devtoolsOpen = true;
        this.onDetection("DevTools size detection");
        return;
      }

      // Check using console detection trick
      const element = new Image();
      Object.defineProperty(element, "id", {
        get: () => {
          this.methods.devtoolsOpen = true;
          this.onDetection("DevTools console element inspection");
          throw new Error("DevTools detected");
        },
      });

      // This will trigger the getter if console is open
      console.log("%c", element);
    } catch (e) {
      // Detection triggered
      if (e.message !== "DevTools detected") {
        // Some other error, ignore
      }
    }
  }

  /**
   * Method 2: Check for debugger using timing attacks
   */
  checkTiming() {
    const start = performance.now();

    // This will be slow if debugger is attached
    debugger;

    const end = performance.now();
    const timeTaken = end - start;

    // If debugger is attached, this will take MUCH longer (usually 100+ ms)
    // Threshold set to 500ms to avoid false positives on slow systems
    if (timeTaken > 500) {
      this.methods.timingAnomaly = true;
      this.onDetection("Debugger timing anomaly");
    }
  }

  /**
   * Method 3: Direct debugger check
   */
  checkDebugger() {
    try {
      const before = new Date().getTime();

      // This line will pause if debugger is open
      eval("debugger"); // eslint-disable-line no-eval

      const after = new Date().getTime();

      // Threshold set to 500ms to avoid false positives on slow systems
      // Real debugger pause will be significantly longer than normal execution
      if (after - before > 500) {
        this.methods.debuggerPresent = true;
        this.onDetection("Debugger statement paused");
      }
    } catch (_e) {
      // Ignore errors
    }
  }

  /**
   * Method 4: Console open detection using toString trick
   */
  checkConsole() {
    const devtools = /./;
    devtools.toString = () => {
      this.methods.consoleOpen = true;
      this.onDetection("Console toString detection");
      return "devtools";
    };

    // This will call toString if console is open
    console.log("%c", devtools);
  }

  /**
   * Method 5: Prevent right-click context menu
   */
  preventRightClick() {
    document.addEventListener(
      "contextmenu",
      (e) => {
        e.preventDefault();
        // Don't call onDetection here - we successfully blocked the right-click
        // Only actual DevTools detection should trigger onDetection
        return false;
      },
      { capture: true },
    );
  }

  /**
   * Method 6: Block DevTools keyboard shortcuts
   */
  preventKeyboardShortcuts() {
    document.addEventListener(
      "keydown",
      (e) => {
        // F12
        if (e.key === "F12" || e.keyCode === 123) {
          e.preventDefault();
          // Don't call onDetection - we successfully blocked the shortcut
          return false;
        }

        // Ctrl+Shift+I (Inspect)
        if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.keyCode === 73)) {
          e.preventDefault();
          // Don't call onDetection - we successfully blocked the shortcut
          return false;
        }

        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && (e.key === "J" || e.keyCode === 74)) {
          e.preventDefault();
          // Don't call onDetection - we successfully blocked the shortcut
          return false;
        }

        // Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && (e.key === "C" || e.keyCode === 67)) {
          e.preventDefault();
          // Don't call onDetection - we successfully blocked the shortcut
          return false;
        }

        // Ctrl+U (View Source)
        if (e.ctrlKey && (e.key === "U" || e.keyCode === 85)) {
          e.preventDefault();
          // Don't call onDetection - we successfully blocked the shortcut
          return false;
        }

        // Ctrl+S (Save)
        if (e.ctrlKey && (e.key === "S" || e.keyCode === 83)) {
          e.preventDefault();
          // Don't call onDetection - we successfully blocked the shortcut
          return false;
        }
      },
      { capture: true },
    );
  }

  /**
   * Handle detection - use threshold to avoid false positives
   */
  onDetection(method) {
    this.detectionCount++;

    console.error(
      `[Client Anti-Debug] DETECTION #${this.detectionCount}: ${method}`,
    );

    // Only trigger after multiple detections to avoid false positives
    if (this.detectionCount >= this.detectionThreshold) {
      this.triggerSecurity(method);
    }
  }

  /**
   * Trigger security response
   * FIXED: Only notify main process and let it handle termination via process.exit(1)
   * This prevents interference with proper app closing and ensures reliable termination
   */
  triggerSecurity(method) {
    console.error(`[Client Anti-Debug] SECURITY TRIGGERED: ${method}`);
    console.error("[Client Anti-Debug] Reverse engineering tools detected!");

    // Stop protection to prevent multiple triggers
    this.stopProtection();

    // CRITICAL FIX: Only notify main process - let it handle everything
    // Main process will terminate via process.exit(1) in anti-re.js:330
    if (window.electron && window.electron.devToolsDetected) {
      window.electron.devToolsDetected(method);
    } else {
      console.error(
        "[Client Anti-Debug] Unable to notify main process - IPC not available",
      );
    }

    // REMOVED: Page blanking, debugger loops, and window.close() calls
    // These interfered with proper app termination by the main process
    // Main process handles all cleanup and termination reliably via process.exit(1)
  }

  /**
   * Check if protection is active
   */
  isActive() {
    return this.isDetectionActive;
  }
}

// DISABLED: Auto-start protection causing false positives
// The client-side anti-debug protection is too aggressive and triggers on normal usage
// Keep the class available but don't auto-start it
if (typeof window !== "undefined") {
  window.clientAntiDebug = new ClientAntiDebug();

  // DISABLED: Don't auto-start protection to prevent false positives
  // if (document.readyState === 'loading') {
  //     document.addEventListener('DOMContentLoaded', () => {
  //         window.clientAntiDebug.startProtection();
  //     });
  // } else {
  //     window.clientAntiDebug.startProtection();
  // }
}
