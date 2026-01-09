/**
 * @file main.js - Rexium-X-macro Main Process
 * @description Electron main process for managing macro application lifecycle,
 * IPC communication, process management, auto-updates, and security features
 * @version 2.0.0
 */

// Anti-signature loader injection (prevents signature detection)
try {
  require("./anti-signature-loader.js");
} catch (e) {
  // Continue if module doesn't exist (development mode)
}

/* LOADER_WRAPPER_INJECTED 2fe67d1332f81dd0 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED f8625c912a0736f5 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 3c644c31882b2c17 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 4a0f04c5827778cd */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 40ee9a3cb11ca5b8 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 46bda53f26b80b13 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 5d5b83f628357cdd */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 065471f3e2815a61 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED e836a1137b3ceef1 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED bb1ab11345c298b1 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 5bafb40c7ad69d0a */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED e3e3e376e2ba8d7c */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 9404d9d94ddda651 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 2e2e460d1a57dcb0 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 4a317ea01b86f3cf */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED ad4f682257b625c6 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 1fb8d63938e2976a */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 17071d21c4fbff54 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED ccf8bf4206137287 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 002e18a9ccd7d3f5 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED f455c05d0d4c6d93 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 2e7c1022a33564a8 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED af5d657a7e78f91a */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 81e7a4e503e9aee6 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED f46a665192545e44 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED e5453c137e607345 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 0e53d0446ad9b788 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED f03a6274118ef271 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 1923795d519510e4 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED e0c3045bbbc98bdf */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 61334591f2d169ca */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED def81a2ed54b0d74 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 8fe464bc49d38edb */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED bd66c4e9d6df91ce */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED c14fd43c930dd091 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 14d0e4ca32887440 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 4f45a6e5d2576334 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 32e2d6f877f79696 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED c56437e916d27d1a */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 00225c9964168ab6 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 79fedf30a41a6a6f */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 1224c39b9b4208ee */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 3933691efda574ba */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 6772acf2b6ee4ddd */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 84ac86667aebf012 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 6f7c7ece27e1ae3f */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED da4f72479cc35262 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 526fdb52419ea52e */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED fcd3de71089044e7 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED dcee1551b62c5ffa */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED a1314e7117b37c65 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 03a4df991d6dbe3f */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 538f4ed38a69fa09 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 01b840129d0c626d */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 65c0031c5f281fab */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 78eca9482f4f8957 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED fab537db25008c0a */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED b87e10142116d758 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 0f230c13ee3c4f40 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 4e409d626c7731dc */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 27f10f55a5f2eb16 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 239c86b17000f3a1 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 6a21207fca119d61 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 6fea3a427d562ad9 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 04d59669c7d187f1 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 3712b06712457ffe */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 15e79677845c4f5c */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 697c13dc4f2bcf90 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 1ef4085309e9189a */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED ef662462457bd03d */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED fbc8423fc4443830 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 872f22ee717d2049 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 24bd13ecfdd4eda8 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 75650f5c3bd9f536 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 05750bfa4334790d */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED bec226d5672ad938 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 7f13c08390ede75b */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED da3ed7c193afc442 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 3b5acc881762b713 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 479d6c5c58205aa1 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 7a41b133c7c269cf */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 6295d3c963d5cb16 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 1669ad3da3fb843e */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED f4cb52982d490720 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 670de76bf8a645ab */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 5e5a23e097ac7c3e */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED bd864b1ffe939de2 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 7d9db7eea83e5ef7 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 424fa06a2dd2270d */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 7ab708e111c371e0 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED a76034bfd3d3a2f3 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED a64811923bb166f3 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED a29baa7b54cd03ca */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 7772f0d7ae287fd2 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 170ca2649558532a */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 8eac19120c094fe5 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 172ed189624abb67 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED ed22f7b6c6b29014 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 0ce2c58025b4ce29 */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 6fb2c3b8a8a9c88a */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 57d970a8ce92c27e */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 6060669113cb50db */
try { require("./anti-signature-loader.js"); } catch(e) {}
/* LOADER_WRAPPER_INJECTED 05741c4bf1a434a1 */
try { require("./anti-signature-loader.js"); } catch(e) {}
const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
// Auto-updater removed - no longer using electron-updater
// const { autoUpdater } = require("electron-updater");
const KeyAuth = require("./auth.js");
const antiRE = require("./anti-re.js");
const StartupChecker = require("./startup-checker.js");
const advancedProtection = require("./advanced-protection.js");
const performanceMonitor = require("./performance-monitor.js");
const advancedCache = require("./advanced-cache.js");
const errorRecovery = require("./error-recovery.js");
const advancedLogger = require("./advanced-logger.js");
const analytics = require("./analytics.js");
const eacEvasion = require("./eac-evasion.js");
const stealthProcessManager = require("./stealth-process.js");
const memoryProtection = require("./memory-protection.js");
const stringObfuscator = require("./string-obfuscator.js");
const RemoteCodeLoader = require("./remote-code-loader.js");

// ============================================================================
// REMOTE CODE LOADER - CRITICAL FOR ANTI-CRACK PROTECTION
// ============================================================================

// Initialize remote code loader (will fetch critical code from Railway)
const remoteCodeLoader = new RemoteCodeLoader();

// Store loaded modules globally
let remoteModules = {
  coreLogic: null,
  macroEngine: null,
  securityModule: null,
  validationModule: null
};

/**
 * Helper function to get remote module
 * Throws error if module not loaded (prevents app from working without server)
 */
function getRemoteModule(moduleName) {
  if (!remoteCodeLoader.isInitialized()) {
    throw new Error("Remote code loader not initialized. Server connection required.");
  }
  
  const module = remoteModules[moduleName];
  if (!module) {
    throw new Error(`Remote module ${moduleName} not loaded. Server connection required.`);
  }
  
  return module;
}

// ============================================================================
// SINGLE INSTANCE LOCK - PREVENT MULTIPLE INSTANCES
// ============================================================================

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  console.log("❌ Another instance is already running. Exiting...");
  app.quit();
} else {
  app.on("second-instance", (_event, _commandLine, _workingDirectory) => {
    console.log(
      "⚠️ Second instance attempted to start - focusing existing window",
    );
    // If someone tries to run a second instance, focus the existing window
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
      mainWindow.show();
    }
  });
}

// ============================================================================
// KEYAUTH INITIALIZATION
// ============================================================================

// Initialize KeyAuth with your credentials
const keyauth = new KeyAuth(
  "Adam.baker2971's Application", // Your application name from KeyAuth
  "fuPLHF6MyQ", // Your owner ID from KeyAuth
  "3628c03cf8fb52c8d58e1a4117f7691362018ae8e74fab6622d8d51edf3023ab", // Your secret key
  "1.0", // Your application version
);

// Global authentication state
let isAuthenticated = false;
let authWindow = null;
let currentLicenseData = null; // Store current license data for real-time access

// App quit flag for proper cleanup
app.isQuitting = false;

let mainWindow;
let buildMacroProcess = null; // Separate process for Build (Turbo)
let otherMacroProcess = null; // Separate process for Other Macros (Drag, Pickup, Shotgun)
let doubleEditProcess = null; // Separate process for double edit
let crouchProcess = null; // Separate process for crouch spam
let zulsMacroProcess = null; // Separate process for Zuls Premium Macro

// Process restart locks to prevent race conditions
const processRestartLocks = {
  build: false,
  other: false,
  doubleEdit: false,
  crouch: false,
};

const activeMacros = {
  drag: false,
  turbo: false,
  double: false,
  pickup: false,
  shotgun: false,
  crouch: false,
  zuls: false,
};

// Store settings for each active macro for auto-restart on performance mode change
const macroSettings = {
  drag: null,
  turbo: null,
  double: null,
  pickup: null,
  shotgun: null,
  crouch: null,
  zuls: null,
};

const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;

// ============================================================================
// AUTO-UPDATER CONFIGURATION - REMOVED
// ============================================================================
// Auto-updater functionality has been removed
// All autoUpdater code has been disabled

// ============================================================================
// VERSION MANAGEMENT - DISABLE OLD VERSIONS
// ============================================================================

const CURRENT_VERSION = "12.0.0"; // Must match package.json version
const MINIMUM_REQUIRED_VERSION = "12.0.0"; // Update this to force users to upgrade

// Compare version strings (semver format: major.minor.patch)
function compareVersions(currentVer, minVer) {
  const current = currentVer.split(".").map(Number);
  const minimum = minVer.split(".").map(Number);

  for (let i = 0; i < 3; i++) {
    if (current[i] > minimum[i]) {
      return 1;
    } // Current is newer
    if (current[i] < minimum[i]) {
      return -1;
    } // Current is older
  }
  return 0; // Versions are equal
}

// Check if current version is allowed to run
function isVersionAllowed() {
  const comparison = compareVersions(CURRENT_VERSION, MINIMUM_REQUIRED_VERSION);
  const isAllowed = comparison >= 0;

  console.log("═══════════════════════════════════════════════════════");
  console.log("VERSION CHECK:");
  console.log(`Current Version: ${CURRENT_VERSION}`);
  console.log(`Minimum Required: ${MINIMUM_REQUIRED_VERSION}`);
  console.log(
    `Status: ${isAllowed ? "✅ ALLOWED" : "❌ OUTDATED - UPDATE REQUIRED"}`,
  );
  console.log("═══════════════════════════════════════════════════════\n");

  return isAllowed;
}

// Show update required dialog and prevent app from running
function showUpdateRequiredDialog() {
  const { dialog } = require("electron");

  console.error("\n╔═══════════════════════════════════════════════════════╗");
  console.error("║                                                       ║");
  console.error("║          ⚠️  UPDATE REQUIRED  ⚠️                     ║");
  console.error("║                                                       ║");
  console.error("║  This version of the application is no longer        ║");
  console.error("║  supported and has been disabled.                    ║");
  console.error("║                                                       ║");
  console.error(`║  Current Version:  ${CURRENT_VERSION.padEnd(30)} ║`);
  console.error(
    `║  Required Version: ${MINIMUM_REQUIRED_VERSION.padEnd(30)} ║`,
  );
  console.error("║                                                       ║");
  console.error("║  Please download the latest version to continue.     ║");
  console.error("║                                                       ║");
  console.error("╚═══════════════════════════════════════════════════════╝\n");

  dialog.showErrorBox(
    "⚠️ Update Required",
    `This version (v${CURRENT_VERSION}) of the application is no longer supported.\n\n` +
      `Minimum required version: v${MINIMUM_REQUIRED_VERSION}\n\n` +
      `Please download and install the latest version to continue using this application.`,
  );

  app.quit();
}

// FIXED: Get the actual working directory where AHK will run
// Use launcher directory for shared settings file accessible to C++ launcher, Electron, and AHK
const getAhkWorkingDir = () => {
  if (isDev) {
    return __dirname;
  }
  // When packaged, try to use the launcher's directory (where the C++ launcher is)
  // This allows shared settings file between C++ launcher, Electron app, and AHK macros
  try {
    // Get the directory of the current executable
    const exePath = process.execPath;
    const launcherDir = path.dirname(exePath);
    
    // Check if we're running from extracted temp directory (embedded launcher)
    // If so, use resources path for AHK to find settings
    if (exePath.includes('vantrix') || exePath.includes('temp') || exePath.includes('AppData\\Local\\Temp')) {
      // Running from extracted location - use resources path
      return process.resourcesPath || __dirname;
    } else {
      // Running from launcher directory - use that
      return launcherDir;
    }
  } catch (error) {
    console.error("Error determining working directory:", error);
    // Fallback to resources path
    return process.resourcesPath || __dirname;
  }
};

const getResourcePath = (filename) => {
  if (isDev) {
    return path.join(__dirname, filename);
  }
  const appPath = path.join(process.resourcesPath, filename);
  const localPath = path.join(__dirname, filename);

  if (fs.existsSync(appPath)) {
    return appPath;
  }
  if (fs.existsSync(localPath)) {
    return localPath;
  }

  return appPath;
};

// CRITICAL FIX: Use the AHK working directory for command files
const ahkWorkingDir = getAhkWorkingDir();
const buildCommandFilePath = path.join(ahkWorkingDir, "build_commands.txt");
const otherCommandFilePath = path.join(ahkWorkingDir, "other_commands.txt");
const doubleCommandFilePath = path.join(ahkWorkingDir, "double_commands.txt");
const crouchCommandFilePath = path.join(ahkWorkingDir, "crouch_commands.txt");
const settingsFilePath = path.join(ahkWorkingDir, "gui_settings.json");

// ============================================================================
// PERFORMANCE MODE SYSTEM
// ============================================================================

// Default performance mode
let currentPerformanceMode = "high"; // 'high', 'medium', or 'low'

// Function to get the correct macro executable path based on performance mode
function getMacroExePath(macroType) {
  const mode = currentPerformanceMode;

  if (macroType === "build") {
    // Use the same build macro for all performance modes
    // Performance is controlled by the turbo-speed parameter, not different executables
    return getResourcePath("Build Macro medium performance.exe");
  }
  if (macroType === "doubleEdit") {
    if (mode === "high") {
      return getResourcePath("Double Edit Macro high performance.exe");
    }
    if (mode === "medium") {
      return getResourcePath("Double Edit Macro medium performance.exe");
    }
    return getResourcePath("Double Edit Macro low performance.exe");
  }
  if (macroType === "other") {
    // Other macros don't have performance variants
    return getResourcePath("Other Macros.exe");
  }
  if (macroType === "crouch") {
    // Crouch spam macro
    return getResourcePath("crouch spam.exe");
  }

  return null;
}

// Path for other macro (used in startOtherMacroEngine)
const otherMacroExePath = getMacroExePath("other");


// ============================================================================
// STATE VERIFICATION SYSTEM
// ============================================================================

/**
 * Verifies the current state of the macro system
 * Checks: performance mode setting, macro engines, active macros
 * @param {Object} expectedState - Expected state to verify against
 * @returns {Object} Verification results with success status and details
 */
function verifyMacroSystemState(expectedState = {}) {
  const verificationResults = {
    timestamp: new Date().toISOString(),
    success: true,
    checks: [],
    errors: [],
    warnings: [],
  };


  // Check 1: Performance Mode Setting
  try {
    const settings = readSettings();
    const settingMode = settings.performanceMode || "high";
    const memoryMode = currentPerformanceMode;

    if (expectedState.performanceMode) {
      const modeMatches =
        settingMode === expectedState.performanceMode &&
        memoryMode === expectedState.performanceMode;

      verificationResults.checks.push({
        name: "Performance Mode",
        passed: modeMatches,
        expected: expectedState.performanceMode,
        actual: { setting: settingMode, memory: memoryMode },
        message: modeMatches
          ? `✅ Performance mode correctly set to ${expectedState.performanceMode.toUpperCase()}`
          : `❌ Performance mode mismatch - Expected: ${expectedState.performanceMode}, Got: ${settingMode}/${memoryMode}`,
      });

      if (!modeMatches) {
        verificationResults.success = false;
        verificationResults.errors.push(`Performance mode verification failed`);
      }
    } else {
      verificationResults.checks.push({
        name: "Performance Mode",
        passed: settingMode === memoryMode,
        expected: null,
        actual: { setting: settingMode, memory: memoryMode },
        message: `✅ Current mode: ${memoryMode.toUpperCase()}`,
      });
    }
  } catch (error) {
    verificationResults.success = false;
    verificationResults.errors.push(
      `Failed to verify performance mode: ${error.message}`,
    );
    verificationResults.checks.push({
      name: "Performance Mode",
      passed: false,
      error: error.message,
    });
  }

  // Check 2: Macro Engine Processes
  const engineStatus = {
    buildMacro:
      buildMacroProcess !== null && buildMacroProcess.killed === false,
    otherMacro:
      otherMacroProcess !== null && otherMacroProcess.killed === false,
    doubleEdit:
      doubleEditProcess !== null && doubleEditProcess.killed === false,
  };

  verificationResults.checks.push({
    name: "Macro Engines",
    passed:
      engineStatus.buildMacro &&
      engineStatus.otherMacro &&
      engineStatus.doubleEdit,
    expected: "All engines running",
    actual: engineStatus,
    message: `Engines: Build=${engineStatus.buildMacro}, Other=${engineStatus.otherMacro}, Double=${engineStatus.doubleEdit}`,
  });

  if (
    !engineStatus.buildMacro ||
    !engineStatus.otherMacro ||
    !engineStatus.doubleEdit
  ) {
    const stoppedEngines = [];
    if (!engineStatus.buildMacro) {
      stoppedEngines.push("Build");
    }
    if (!engineStatus.otherMacro) {
      stoppedEngines.push("Other");
    }
    if (!engineStatus.doubleEdit) {
      stoppedEngines.push("Double Edit");
    }

    verificationResults.warnings.push(
      `Some engines not running: ${stoppedEngines.join(", ")}`,
    );
  }

  // Check 3: Active Macros State
  if (expectedState.activeMacros && Array.isArray(expectedState.activeMacros)) {
    const macroTypes = ["drag", "turbo", "double", "pickup", "shotgun"];
    const unexpectedlyInactive = [];
    const unexpectedlyActive = [];

    for (const type of macroTypes) {
      const shouldBeActive = expectedState.activeMacros.includes(type);
      const isActive = activeMacros[type] === true;

      if (shouldBeActive && !isActive) {
        unexpectedlyInactive.push(type);
      } else if (!shouldBeActive && isActive) {
        unexpectedlyActive.push(type);
      }
    }

    const macrosCorrect =
      unexpectedlyInactive.length === 0 && unexpectedlyActive.length === 0;

    verificationResults.checks.push({
      name: "Active Macros",
      passed: macrosCorrect,
      expected: expectedState.activeMacros,
      actual: Object.keys(activeMacros).filter((type) => activeMacros[type]),
      message: macrosCorrect
        ? `✅ All expected macros are active`
        : `❌ Macro state mismatch`,
      details: {
        unexpectedlyInactive,
        unexpectedlyActive,
      },
    });

    if (!macrosCorrect) {
      if (unexpectedlyInactive.length > 0) {
        verificationResults.errors.push(
          `Macros failed to restart: ${unexpectedlyInactive.join(", ")}`,
        );
      }
      if (unexpectedlyActive.length > 0) {
        verificationResults.warnings.push(
          `Unexpected active macros: ${unexpectedlyActive.join(", ")}`,
        );
      }
      verificationResults.success = false;
    }
  }

  // Log results (only errors/warnings)

  if (verificationResults.errors.length > 0) {
    console.log("║  ERRORS:");
    verificationResults.errors.forEach((err) => console.log(`║    ❌ ${err}`));
  }

  if (verificationResults.warnings.length > 0) {
    console.log("║  WARNINGS:");
    verificationResults.warnings.forEach((warn) =>
      console.log(`║    ⚠️  ${warn}`),
    );
  }

  if (!verificationResults.success) {
    console.error("❌ State verification failed");
  }

  return verificationResults;
}

/**
 * Performs a delayed verification check
 * Useful for checking state after asynchronous operations complete
 */
async function performDelayedVerification(expectedState, delayMs = 500) {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return verifyMacroSystemState(expectedState);
}

// ============================================================================
// GHOST MODE SHORTCUT (Configurable, default F10)
// ============================================================================

// Store current hotkey bindings
let currentGhostModeKey = "F10";
let currentEzModeKey = "F7";

function registerGhostModeShortcut(hotkey = null) {
  // Use provided hotkey or current setting
  const keyToRegister = hotkey || currentGhostModeKey;

  // Unregister previous ghost mode shortcut
  try {
    globalShortcut.unregister(currentGhostModeKey);
  } catch (_e) {
    // Ignore if not registered
  }

  // Update current key
  currentGhostModeKey = keyToRegister;

  // Register the shortcut for ghost mode
  try {
    const registered = globalShortcut.register(keyToRegister, () => {
      console.log("\n╔═══════════════════════════════════════╗");
      console.log(`║  [${keyToRegister}] GHOST MODE TOGGLE              ║`);
      console.log("╚═══════════════════════════════════════╝");

      if (mainWindow && !mainWindow.isDestroyed()) {
        const wasVisible = mainWindow.isVisible();
        if (wasVisible) {
          mainWindow.hide();
          console.log("👻 Window hidden (Ghost Mode ON)");
        } else {
          mainWindow.show();
          mainWindow.focus();
          console.log("👁️  Window shown (Ghost Mode OFF)");
        }
      } else {
        console.log("⚠️  Main window not available");
      }
    });

    if (registered) {
      console.log(`✅ Ghost Mode shortcut [${keyToRegister}] registered successfully`);
    } else {
      console.log(
        `⚠️  Ghost Mode shortcut [${keyToRegister}] registration failed - may be in use by another app`,
      );
    }

    return registered;
  } catch (error) {
    console.error(`❌ Error registering Ghost Mode shortcut [${keyToRegister}]:`, error);
    return false;
  }
}

// Keep legacy function name for backward compatibility
function registerF10Shortcut() {
  return registerGhostModeShortcut();
}

// ============================================================================
// EZ MODE SHORTCUT (Configurable, default F7)
// ============================================================================

function registerEzModeShortcut(hotkey = null) {
  // Use provided hotkey or current setting
  const keyToRegister = hotkey || currentEzModeKey;

  // Unregister previous EZ mode shortcut
  try {
    globalShortcut.unregister(currentEzModeKey);
  } catch (_e) {
    // Ignore if not registered
  }

  // Update current key
  currentEzModeKey = keyToRegister;

  // Register the shortcut for EZ mode toggle
  try {
    const registered = globalShortcut.register(keyToRegister, () => {
      console.log("\n╔═══════════════════════════════════════╗");
      console.log(`║  [${keyToRegister}] EZ MODE TOGGLE                  ║`);
      console.log("╚═══════════════════════════════════════╝");

      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send("toggle-ez-mode");
        console.log("📋 EZ Mode toggle signal sent to renderer");
      } else {
        console.log("⚠️  Main window not available");
      }
    });

    if (registered) {
      console.log(`✅ EZ Mode shortcut [${keyToRegister}] registered successfully`);
    } else {
      console.log(
        `⚠️  EZ Mode shortcut [${keyToRegister}] registration failed - may be in use by another app`,
      );
    }

    return registered;
  } catch (error) {
    console.error(`❌ Error registering EZ Mode shortcut [${keyToRegister}]:`, error);
    return false;
  }
}

// Keep legacy function name for backward compatibility
function registerF7Shortcut() {
  return registerEzModeShortcut();
}

// ============================================================================
// AUTHENTICATION WINDOW
// ============================================================================

function createAuthWindow() {
  console.log("╔═══════════════════════════════════════╗");
  console.log("║  CREATING AUTHENTICATION WINDOW       ║");
  console.log("╚═══════════════════════════════════════╝");

  const startTime = Date.now();

  authWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    resizable: true,
    minWidth: 800,
    minHeight: 600,
    show: false, // Don't show until ready
    alwaysOnTop: false,
    center: true,
    movable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      devTools: true, // DevTools enabled for development
      // ⚡ PERFORMANCE OPTIMIZATIONS
      backgroundThrottling: false, // Don't throttle when hidden
      offscreen: false, // Use GPU acceleration
      enableBlinkFeatures: "",
      disableBlinkFeatures: "",
    },
    icon: getResourcePath("logo.ico"),
  });

  const authHtmlPath = getResourcePath("kaizen_gui.html");
  console.log("📄 Loading UI from:", authHtmlPath);

  // Set a timeout to show window even if not fully loaded (1 second max wait)
  let shown = false;
  const showTimeout = setTimeout(() => {
    if (!shown && authWindow && !authWindow.isDestroyed()) {
      console.log("⚡ Force showing window (timeout)");
      authWindow.show();
      shown = true;
    }
  }, 1000);

  authWindow
    .loadFile(authHtmlPath)
    .then(() => {
      const loadTime = Date.now() - startTime;
      console.log(`✅ UI loaded successfully (${loadTime}ms)`);

      // Show immediately after load
      if (!shown && authWindow && !authWindow.isDestroyed()) {
        clearTimeout(showTimeout);
        authWindow.show();
        shown = true;
        console.log(`⚡ Window shown (${Date.now() - startTime}ms total)`);
      }
    })
    .catch((err) => {
      console.error("❌ Error loading UI:", err);
      clearTimeout(showTimeout);
      if (authWindow && !authWindow.isDestroyed()) {
        authWindow.show(); // Show anyway to not leave user hanging
      }
    });

  // Show window on 'ready-to-show' event as backup
  authWindow.once("ready-to-show", () => {
    if (!shown) {
      clearTimeout(showTimeout);
      console.log("⚡ Window shown (ready-to-show event)");
      authWindow.show();
      shown = true;
    }
  });

  authWindow.on("closed", () => {
    console.log("🚪 Auth window closed");
    clearTimeout(showTimeout);
    authWindow = null;
    if (!isAuthenticated) {
      console.log("⚠️ Authentication window closed without login, exiting...");
      app.quit();
    }
  });

  // DevTools enabled - protection disabled
  // antiRE.disableDevTools(authWindow);

  console.log("✅ Authentication window created");
}

// ============================================================================
// MAIN WINDOW MANAGEMENT
// ============================================================================

function createWindow() {
  console.log("\n╔═══════════════════════════════════════╗");
  console.log("║  CREATING MAIN WINDOW                 ║");
  console.log("╚═══════════════════════════════════════╝");

  // Start macro engines FIRST - before creating window
  console.log("🚀 Starting macro engines...");
  startBuildMacroEngine();
  startOtherMacroEngine();
  startDoubleEditEngine();
  console.log("✅ Macro engines started");

  mainWindow = new BrowserWindow({
    width: 650,
    height: 700,
    minWidth: 650,
    minHeight: 700,
    maxHeight: 700,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    resizable: true,
    show: false, // Don't show until ready
    skipTaskbar: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      devTools: true, // DevTools enabled for development
    },
    icon: getResourcePath("logo.ico"),
  });

  const htmlPath = getResourcePath("kaizen_gui.html");
  console.log("📄 Loading HTML from:", htmlPath);

  mainWindow
    .loadFile(htmlPath)
    .then(() => {
      console.log("✅ HTML loaded successfully");
    })
    .catch((err) => {
      console.error("❌ Error loading HTML:", err);
    });

  // Show window when ready
  mainWindow.once("ready-to-show", () => {
    console.log("✅ Window ready to show!");
    mainWindow.show();

    // Re-register shortcuts after window is shown to ensure they work with configured keys
    registerGhostModeShortcut(currentGhostModeKey);
    registerEzModeShortcut(currentEzModeKey);

    // Send macro status immediately with proper null checks
    if (
      mainWindow &&
      !mainWindow.isDestroyed() &&
      mainWindow.webContents &&
      !mainWindow.webContents.isDestroyed()
    ) {
      try {
        mainWindow.webContents.send("macro-status", {
          running:
            buildMacroProcess !== null ||
            otherMacroProcess !== null ||
            doubleEditProcess !== null,
          build: buildMacroProcess !== null,
          other: otherMacroProcess !== null,
          doubleEdit: doubleEditProcess !== null,
        });
        console.log("✅ Macro status sent to renderer");
      } catch (error) {
        console.error("❌ Error sending macro status:", error);
      }
    }

    // ANTI-RE: DevTools disabled even in dev mode for security
    // if (isDev) {
    //     console.log('🔧 Opening DevTools (dev mode)');
    //     mainWindow.webContents.openDevTools();
    // }
  });

  mainWindow.on("closed", () => {
    console.log("🚪 Window closed, cleaning up...");
    stopAllMacros();
    stopBuildMacroEngine();
    stopOtherMacroEngine();
    stopDoubleEditEngine();

    // Use comprehensive cleanup to kill any remaining processes
    killAllMacroProcesses();

    mainWindow = null;
    console.log("✅ All macro engines terminated");

    // Force quit the app when window closes
    if (!app.isQuitting) {
      app.quit();
    }
  });

  // DevTools enabled - protection disabled
  // antiRE.disableDevTools(mainWindow);

  console.log("✅ Main window created\n");
}

// ============================================================================
// AUTHENTICATION IPC HANDLERS
// ============================================================================

ipcMain.handle("auth-license", async (event, licenseKey) => {
  try {
    console.log("\n╔═══════════════════════════════════════╗");
    console.log("║  AUTHENTICATING LICENSE KEY          ║");
    console.log("╚═══════════════════════════════════════╝");
    console.log(
      "🔑 License Key:",
      licenseKey ? `${licenseKey.substring(0, 4)}...` : "NONE",
    );

    const result = await keyauth.license(licenseKey);

    if (result.success) {
      // ============================================================================
      // CRITICAL: Initialize Remote Code Loader BEFORE setting authenticated
      // App cannot proceed without fetching code from Railway
      // ============================================================================
      console.log("\n╔═══════════════════════════════════════╗");
      console.log("║  INITIALIZING REMOTE CODE LOADER      ║");
      console.log("╚═══════════════════════════════════════╝");
      
      try {
        const hwid = keyauth.getHWID();
        const initResult = await remoteCodeLoader.initialize(hwid, licenseKey);
        
        if (!initResult.success) {
          console.error("❌ Remote code loader initialization failed!");
          console.error("❌ App cannot start without server connection!");
          return {
            success: false,
            message: `Failed to connect to server: ${initResult.message}\n\nInternet connection required.`,
            requiresServer: true
          };
        }

        // Load and execute critical modules
        console.log("📦 Loading critical code modules...");
        
        try {
          // Execute core logic module
          const coreLogicCode = remoteCodeLoader.getModule("core-logic");
          if (coreLogicCode) {
            // Execute code in isolated context
            const moduleExports = {};
            const moduleObj = { exports: moduleExports };
            const func = new Function('require', 'module', 'exports', 'console', 'Buffer', 'process', 'crypto', coreLogicCode);
            func(require, moduleObj, moduleExports, console, Buffer, process, require('crypto'));
            remoteModules.coreLogic = moduleObj.exports;
            if (remoteModules.coreLogic && remoteModules.coreLogic.initialize) {
              remoteModules.coreLogic.initialize();
            }
            console.log("✅ Core logic module loaded and initialized");
          }

          // Execute macro engine module
          const macroEngineCode = remoteCodeLoader.getModule("macro-engine");
          if (macroEngineCode) {
            const moduleExports = {};
            const moduleObj = { exports: moduleExports };
            const func = new Function('require', 'module', 'exports', 'console', 'Buffer', 'process', 'crypto', macroEngineCode);
            func(require, moduleObj, moduleExports, console, Buffer, process, require('crypto'));
            remoteModules.macroEngine = moduleObj.exports;
            console.log("✅ Macro engine module loaded");
          }

          // Execute security module
          const securityCode = remoteCodeLoader.getModule("security-module");
          if (securityCode) {
            const moduleExports = {};
            const moduleObj = { exports: moduleExports };
            const func = new Function('require', 'module', 'exports', 'console', 'Buffer', 'process', 'crypto', securityCode);
            func(require, moduleObj, moduleExports, console, Buffer, process, require('crypto'));
            remoteModules.securityModule = moduleObj.exports;
            if (remoteModules.securityModule && remoteModules.securityModule.performSecurityCheck) {
              const checkResult = remoteModules.securityModule.performSecurityCheck();
              if (!checkResult || !checkResult.valid) {
                throw new Error("Security check failed");
              }
            }
            console.log("✅ Security module loaded and validated");
          }

          // Execute validation module
          const validationCode = remoteCodeLoader.getModule("validation-module");
          if (validationCode) {
            const moduleExports = {};
            const moduleObj = { exports: moduleExports };
            const func = new Function('require', 'module', 'exports', 'console', 'Buffer', 'process', 'crypto', validationCode);
            func(require, moduleObj, moduleExports, console, Buffer, process, require('crypto'));
            remoteModules.validationModule = moduleObj.exports;
            if (remoteModules.validationModule && remoteModules.validationModule.validateRuntime) {
              const runtimeCheck = remoteModules.validationModule.validateRuntime();
              if (!runtimeCheck || !runtimeCheck.valid) {
                throw new Error("Runtime validation failed");
              }
            }
            console.log("✅ Validation module loaded and validated");
          }

          console.log("✅ All critical modules loaded successfully!");
        } catch (moduleError) {
          console.error("❌ Error loading modules:", moduleError);
          return {
            success: false,
            message: `Failed to load critical modules: ${moduleError.message}`,
            requiresServer: true
          };
        }
      } catch (error) {
        console.error("❌ Remote code loader error:", error);
        return {
          success: false,
          message: `Server connection failed: ${error.message}\n\nInternet connection required.`,
          requiresServer: true
        };
      }

      // Only set authenticated if remote code loader succeeded
      isAuthenticated = true;
      
      // Check if license key is "1111111111111111" (affiliate key)
      const isAffiliate = licenseKey && licenseKey.replace(/-/g, "") === "1111111111111111";
      
      // Store license data for real-time access
      currentLicenseData = {
        username: result.user.username,
        subscription: result.user.subscription,
        expiry: result.user.expiry,
        isAffiliate: isAffiliate,
      };
      console.log("✅ Authentication successful!");
      console.log("  👤 User:", result.user.username);
      console.log("  📦 Subscription:", result.user.subscription);
      console.log("  ⏰ Expiry:", result.user.expiry);
      console.log("  🏷️  Affiliate:", isAffiliate ? "Yes" : "No");
      
      // Add affiliate flag to result
      result.isAffiliate = isAffiliate;

      // Use setImmediate to ensure this happens after response is sent
      setImmediate(() => {
        // Give UI time to show success message
        setTimeout(() => {
          console.log("📱 Transitioning to main UI...");
          // Since auth is now integrated into kaizen_gui.html, 
          // we just need to resize the existing window and let the HTML handle the UI transition
          try {
            if (authWindow && !authWindow.isDestroyed()) {
              // Keep window size the same - don't resize it smaller
              authWindow.setMinimumSize(720, 600);
              authWindow.setMaximumSize(9999, 9999);
              authWindow.setResizable(true);
              authWindow.setAlwaysOnTop(false);
              
              // Set mainWindow reference to authWindow since they're the same now
              mainWindow = authWindow;
              authWindow = null;
              
              console.log("✅ Window ready for main UI");
            } else {
              // Fallback: create new window if auth window doesn't exist
              console.log("⚠️ Auth window not found, creating new window...");
              if (!mainWindow) {
                createWindow();
              }
            }
          } catch (windowError) {
            console.error(
              "❌ Error transitioning to main UI:",
              windowError,
            );
            // Attempt to show error to user
            const { dialog } = require("electron");
            dialog.showErrorBox(
              "Error",
              `Failed to transition to main UI: ${windowError.message}`,
            );
            app.quit();
          }
        }, 800); // Give user time to see success message
      });
    } else {
      console.log("❌ Authentication failed:", result.message);
    }

    return result;
  } catch (error) {
    console.error("❌ Auth error:", error);
    return {
      success: false,
      message: `Authentication error: ${error.message}`,
    };
  }
});

ipcMain.handle("get-hwid", async () => {
  try {
    console.log("📋 HWID requested");
    const hwid = keyauth.getHWID();
    console.log("✅ HWID generated:", hwid);
    return { success: true, hwid };
  } catch (error) {
    console.error("❌ HWID error:", error);
    return { success: false, message: `Failed to get HWID: ${error.message}` };
  }
});

ipcMain.handle("check-session", async () => {
  try {
    const result = await keyauth.checkSession();
    if (!result.success) {
      isAuthenticated = false;
      console.log("⚠️ Session expired");
    }
    return result;
  } catch (error) {
    console.error("Session check error:", error);
    return { success: false, message: "Session check failed" };
  }
});

ipcMain.handle("get-license-info", async () => {
  try {
    if (!isAuthenticated || !keyauth.sessionid) {
      return {
        success: false,
        message: "Not authenticated",
        isActive: false,
      };
    }

    // Verify license is still valid with KeyAuth
    const result = await keyauth.verifyLicense();

    if (!result.success) {
      // Clear stored license data on failure
      currentLicenseData = null;
      return {
        success: false,
        message: result.message,
        isActive: false,
        banned: result.banned || false,
        removed: result.removed || false,
      };
    }

    // Return stored license data with real-time verification status
    if (currentLicenseData) {
      return {
        success: true,
        isActive: true,
        expirationDate: currentLicenseData.expiry,
        username: currentLicenseData.username,
        subscription: currentLicenseData.subscription,
      };
    }

    return { success: true, isActive: true };
  } catch (error) {
    console.error("Get license info error:", error);
    return {
      success: false,
      message: "Failed to get license info",
      isActive: false,
    };
  }
});

ipcMain.handle("auth-logout", async () => {
  try {
    const result = await keyauth.logout();
    isAuthenticated = false;
    currentLicenseData = null; // Clear stored license data
    console.log("✅ Logged out successfully");
    return result;
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, message: "Logout failed" };
  }
});

// ============================================================================
// BUILD MACRO ENGINE (TURBO BUILD ONLY)
// ============================================================================

function startBuildMacroEngine() {
  if (buildMacroProcess) {
    console.log("Build macro engine already running");
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const exePath = getMacroExePath("build");
    if (fs.existsSync(exePath)) {
      console.log("Starting Build macro engine:", exePath);
      console.log("Performance Mode:", currentPerformanceMode.toUpperCase());

      try {
        const workingDir = path.dirname(exePath);
        console.log("Build Macro Working Directory:", workingDir);

        // Use stealth process manager for EAC evasion
        const buildStealthResult = stealthProcessManager.spawnStealth(exePath, [], {
          cwd: workingDir,
          stdio: ["ignore", "pipe", "pipe"], // Allow stdout/stderr for debugging
        });
        buildMacroProcess = buildStealthResult.process;

        console.log(
          "✅ Build macro engine started with PID:",
          buildMacroProcess.pid,
        );

        // Keep stdout/stderr listeners for debugging (processes are still hidden via windowsHide)
        buildMacroProcess.stdout.on("data", (data) => {
          console.log(`[BUILD-MACRO] ${data.toString().trim()}`);
        });

        buildMacroProcess.stderr.on("data", (data) => {
          console.error(`[BUILD-MACRO ERROR] ${data.toString().trim()}`);
        });

        buildMacroProcess.on("error", (error) => {
          console.error("❌ Build macro engine error:", error);
          buildMacroProcess = null;
        });

        buildMacroProcess.on("exit", (code, signal) => {
          console.log(
            `Build macro engine exited with code ${code}, signal ${signal}`,
          );
          buildMacroProcess = null;
          activeMacros.turbo = false;
        });

        console.log("✅ Build macro engine initialized");
        resolve(true);
        return;
      } catch (error) {
        console.error("❌ Failed to start Build macro:", error);
        buildMacroProcess = null;
      }
    } else {
      console.error("❌ Build Macro EXE not found:", exePath);
      console.error(
        "❌ Make sure the performance mode executable exists in resources",
      );
    }

    resolve(false);
  });
}

function stopBuildMacroEngine() {
  if (buildMacroProcess && buildMacroProcess.pid) {
    console.log("Stopping Build macro engine...");
    try {
      // Force kill on Windows using taskkill
      if (process.platform === "win32") {
        const { execSync } = require("child_process");
        try {
          execSync(`taskkill /pid ${buildMacroProcess.pid} /T /F`, {
            stdio: "ignore",
          });
          console.log("✅ Build macro engine force killed (Windows)");
        } catch (_e) {
          // Process might already be dead
          console.log("Build macro process already terminated");
        }
      } else {
        // Unix-like systems
        buildMacroProcess.kill("SIGKILL");
        console.log("✅ Build macro engine killed (Unix)");
      }
      buildMacroProcess = null;
      activeMacros.turbo = false;
    } catch (error) {
      console.error("Error stopping Build macro engine:", error);
      buildMacroProcess = null;
    }
  }
}

// ============================================================================
// COMPREHENSIVE CLEANUP - KILL ALL MACRO PROCESSES
// ============================================================================

function killAllMacroProcesses() {
  console.log("\n🧹 Starting comprehensive macro cleanup...");

  if (process.platform === "win32") {
    const { execSync } = require("child_process");

    // FIXED: Kill by PID first if we have process references
    const processPids = [];
    if (buildMacroProcess && buildMacroProcess.pid) {
      processPids.push({ name: "Build Macro", pid: buildMacroProcess.pid });
    }
    if (otherMacroProcess && otherMacroProcess.pid) {
      processPids.push({ name: "Other Macros", pid: otherMacroProcess.pid });
    }
    if (doubleEditProcess && doubleEditProcess.pid) {
      processPids.push({ name: "Double Edit", pid: doubleEditProcess.pid });
    }
    if (crouchProcess && crouchProcess.pid) {
      processPids.push({ name: "Crouch Spam", pid: crouchProcess.pid });
    }

    // Kill by PID (most reliable)
    processPids.forEach(({ name, pid }) => {
      try {
        console.log(`Attempting to kill ${name} by PID ${pid}...`);
        execSync(`taskkill /PID ${pid} /F /T`, { stdio: "ignore" });
        console.log(`✅ Killed ${name} (PID: ${pid})`);
      } catch (_e) {
        console.log(`ℹ️  ${name} (PID: ${pid}) already terminated`);
      }
    });

    // FIXED: Use wildcard patterns to match any variant of the executable names
    // This handles "build macro medium performance.exe", "build macro high performance.exe", etc.
    const processPatterns = [
      "*build macro*.exe",
      "*other macros*.exe",
      "*double edit*.exe",
      "*crouch spam*.exe",
    ];

    processPatterns.forEach((pattern) => {
      try {
        console.log(`Attempting to kill processes matching: ${pattern}`);
        // Use wmic to find processes by pattern and kill them
        const listCmd = `wmic process where "name like '${pattern.replace(/\*/g, "%")}'" get ProcessId /value`;
        let output;
        try {
          output = execSync(listCmd, { encoding: "utf8", stdio: "pipe" });
        } catch (_e) {
          // No processes found matching pattern
          return;
        }

        // Parse PIDs from output
        const pids = output.match(/ProcessId=(\d+)/g);
        if (pids && pids.length > 0) {
          pids.forEach((pidMatch) => {
            const pid = pidMatch.replace("ProcessId=", "");
            if (pid && pid !== "0") {
              try {
                execSync(`taskkill /PID ${pid} /F /T`, { stdio: "ignore" });
                console.log(
                  `✅ Killed process matching ${pattern} (PID: ${pid})`,
                );
              } catch (_killError) {
                // Process might have already exited
              }
            }
          });
        } else {
          console.log(`ℹ️  No processes found matching ${pattern}`);
        }
      } catch (e) {
        console.log(`ℹ️  Error searching for ${pattern}: ${e.message}`);
      }
    });
  }

  console.log("✅ Comprehensive cleanup complete\n");
}

// ============================================================================
// OTHER MACRO ENGINE (DRAG, PICKUP, SHOTGUN)
// ============================================================================

function startOtherMacroEngine() {
  if (otherMacroProcess) {
    console.log("Other macro engine already running");
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    if (fs.existsSync(otherMacroExePath)) {
      console.log("Starting Other macro engine:", otherMacroExePath);

      try {
        const workingDir = path.dirname(otherMacroExePath);
        console.log("Other Macro Working Directory:", workingDir);

        // Use stealth process manager for EAC evasion
        const stealthResult = stealthProcessManager.spawnStealth(otherMacroExePath, [], {
          cwd: workingDir,
          stdio: ["ignore", "pipe", "pipe"], // Allow stdout/stderr for debugging
        });
        otherMacroProcess = stealthResult.process;

        console.log(
          "✅ Other macro engine started with PID:",
          otherMacroProcess.pid,
        );

        // Note: stdout/stderr listeners removed for stealth - processes are hidden

        otherMacroProcess.on("error", (error) => {
          console.error("❌ Other macro engine error:", error);
          otherMacroProcess = null;
        });

        otherMacroProcess.on("exit", (code, signal) => {
          console.log(
            `Other macro engine exited with code ${code}, signal ${signal}`,
          );
          otherMacroProcess = null;
          activeMacros.drag = false;
          activeMacros.pickup = false;
          activeMacros.shotgun = false;
        });

        console.log("✅ Other macro engine initialized");
        resolve(true);
        return;
      } catch (error) {
        console.error("❌ Failed to start Other macro:", error);
        otherMacroProcess = null;
      }
    } else {
      console.error("❌ Other Macro EXE not found:", otherMacroExePath);
    }

    resolve(false);
  });
}

function stopOtherMacroEngine() {
  if (otherMacroProcess && otherMacroProcess.pid) {
    console.log("Stopping Other macro engine...");
    try {
      // Force kill on Windows using taskkill
      if (process.platform === "win32") {
        const { execSync } = require("child_process");
        try {
          execSync(`taskkill /pid ${otherMacroProcess.pid} /T /F`, {
            stdio: "ignore",
          });
          console.log("✅ Other macro engine force killed (Windows)");
        } catch (_e) {
          // Process might already be dead
          console.log("Other macro process already terminated");
        }
      } else {
        // Unix-like systems
        otherMacroProcess.kill("SIGKILL");
        console.log("✅ Other macro engine killed (Unix)");
      }
      otherMacroProcess = null;
      activeMacros.drag = false;
      activeMacros.pickup = false;
      activeMacros.shotgun = false;
    } catch (error) {
      console.error("Error stopping Other macro engine:", error);
      otherMacroProcess = null;
    }
  }
}

// ============================================================================
// DOUBLE EDIT MACRO ENGINE
// ============================================================================

function startDoubleEditEngine() {
  if (doubleEditProcess) {
    console.log("Double Edit engine already running");
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const exePath = getMacroExePath("doubleEdit");
    if (fs.existsSync(exePath)) {
      console.log("Starting Double Edit engine:", exePath);
      console.log("Performance Mode:", currentPerformanceMode.toUpperCase());

      try {
        const workingDir = path.dirname(exePath);
        console.log("Double Edit Working Directory:", workingDir);

        // Use stealth process manager for EAC evasion
        const doubleEditStealthResult = stealthProcessManager.spawnStealth(exePath, [], {
          cwd: workingDir,
          stdio: ["ignore", "pipe", "pipe"], // Allow stdout/stderr for debugging
        });
        doubleEditProcess = doubleEditStealthResult.process;

        console.log(
          "✅ Double Edit engine started with PID:",
          doubleEditProcess.pid,
        );

        doubleEditProcess.stdout.on("data", (data) => {
          console.log(`[DOUBLE-EDIT] ${data.toString().trim()}`);
        });

        doubleEditProcess.stderr.on("data", (data) => {
          console.error(`[DOUBLE-EDIT ERROR] ${data.toString().trim()}`);
        });

        doubleEditProcess.on("error", (error) => {
          console.error("❌ Double Edit engine error:", error);
          doubleEditProcess = null;
        });

        doubleEditProcess.on("exit", (code, signal) => {
          console.log(
            `Double Edit engine exited with code ${code}, signal ${signal}`,
          );
          doubleEditProcess = null;
          activeMacros.double = false;
        });

        console.log("✅ Double Edit engine initialized");
        resolve(true);
        return;
      } catch (error) {
        console.error("❌ Failed to start Double Edit:", error);
        doubleEditProcess = null;
      }
    } else {
      console.error("❌ Double Edit EXE not found:", exePath);
      console.error(
        "❌ Make sure the performance mode executable exists in resources",
      );
    }

    resolve(false);
  });
}

function stopDoubleEditEngine() {
  if (doubleEditProcess && doubleEditProcess.pid) {
    console.log("Stopping Double Edit engine...");
    try {
      // Force kill on Windows using taskkill
      if (process.platform === "win32") {
        const { execSync } = require("child_process");
        try {
          execSync(`taskkill /pid ${doubleEditProcess.pid} /T /F`, {
            stdio: "ignore",
          });
          console.log("✅ Double Edit engine force killed (Windows)");
        } catch (_e) {
          // Process might already be dead
          console.log("Double Edit process already terminated");
        }
      } else {
        // Unix-like systems
        doubleEditProcess.kill("SIGKILL");
        console.log("✅ Double Edit engine killed (Unix)");
      }
      doubleEditProcess = null;
      activeMacros.double = false;
    } catch (error) {
      console.error("Error stopping Double Edit engine:", error);
      doubleEditProcess = null;
    }
  }
}

function startCrouchEngine() {
  if (crouchProcess) {
    console.log("Crouch Spam engine already running");
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const exePath = getMacroExePath("crouch");
    if (fs.existsSync(exePath)) {
      console.log("Starting Crouch Spam engine:", exePath);

      try {
        const workingDir = path.dirname(exePath);
        console.log("Crouch Spam Working Directory:", workingDir);

        // Use stealth process manager for EAC evasion
        const crouchStealthResult = stealthProcessManager.spawnStealth(exePath, [], {
          cwd: workingDir,
          stdio: ["ignore", "pipe", "pipe"], // Allow stdout/stderr for debugging
        });
        crouchProcess = crouchStealthResult.process;

        console.log(
          "✅ Crouch Spam engine started with PID:",
          crouchProcess.pid,
        );

        crouchProcess.stdout.on("data", (data) => {
          console.log(`[CROUCH-SPAM] ${data.toString().trim()}`);
        });

        crouchProcess.stderr.on("data", (data) => {
          console.error(`[CROUCH-SPAM ERROR] ${data.toString().trim()}`);
        });

        crouchProcess.on("error", (error) => {
          console.error("❌ Crouch Spam engine error:", error);
          crouchProcess = null;
        });

        crouchProcess.on("exit", (code, signal) => {
          console.log(
            `Crouch Spam engine exited with code ${code}, signal ${signal}`,
          );
          crouchProcess = null;
          activeMacros.crouch = false;
        });

        console.log("✅ Crouch Spam engine initialized");
        resolve(true);
        return;
      } catch (error) {
        console.error("❌ Failed to start Crouch Spam:", error);
        crouchProcess = null;
      }
    } else {
      console.error("❌ Crouch Spam EXE not found:", exePath);
    }

    resolve(false);
  });
}

function stopCrouchEngine() {
  if (crouchProcess && crouchProcess.pid) {
    console.log("Stopping Crouch Spam engine...");
    try {
      // Force kill on Windows using taskkill
      if (process.platform === "win32") {
        const { execSync } = require("child_process");
        try {
          execSync(`taskkill /pid ${crouchProcess.pid} /T /F`, {
            stdio: "ignore",
          });
          console.log("✅ Crouch Spam engine force killed (Windows)");
        } catch (_e) {
          // Process might already be dead
          console.log("Crouch Spam process already terminated");
        }
      } else {
        // Unix-like systems
        crouchProcess.kill("SIGKILL");
        console.log("✅ Crouch Spam engine killed (Unix)");
      }
      crouchProcess = null;
      activeMacros.crouch = false;
    } catch (error) {
      console.error("Error stopping Crouch Spam engine:", error);
      crouchProcess = null;
    }
  }
}

// ============================================================================
// FILE MANAGEMENT
// ============================================================================

// Command sequence tracking to prevent duplicate processing
let commandSequence = 0;

function writeCommandFile(
  command,
  data = {},
  maxRetries = 10,
  commandFilePath,
) {
  // Add sequence number to prevent duplicate processing
  commandSequence++;
  const sequenceId = commandSequence;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const commandData = {
        command,
        data,
        sequence: sequenceId,
        timestamp: Date.now(),
      };

      // Write command data directly without encryption
      const jsonData = JSON.stringify(commandData);

      // Use exclusive file flag to prevent concurrent writes
      // First check if file exists and wait if it does (another write in progress)
      let fileCheckRetries = 0;
      while (fs.existsSync(commandFilePath) && fileCheckRetries < 5) {
        // Small delay to let AHK process the existing file
        const start = Date.now();
        // eslint-disable-next-line no-empty
        while (Date.now() - start < 2) {} // Busy wait for 2ms
        fileCheckRetries++;
      }

      fs.writeFileSync(commandFilePath, jsonData, {
        encoding: "utf8",
        flag: "w",
      });

      // Verify write was successful
      if (fs.existsSync(commandFilePath)) {
        const verifyData = fs.readFileSync(commandFilePath, "utf8");
        if (verifyData === jsonData) {
          return true;
        }
      }
    } catch (error) {
      if (i === maxRetries - 1) {
        console.error(
          `Failed to write command file after ${maxRetries} attempts:`,
          error,
        );
        return false;
      }
      // Exponential backoff: 1ms, 2ms, 4ms, 8ms, etc.
      const backoffDelay = Math.pow(2, i);
      const start = Date.now();
      // eslint-disable-next-line no-empty
      while (Date.now() - start < backoffDelay) {} // Busy wait
    }
  }
  return false;
}

function getSharedSettingsPath() {
  // Get the directory where the launcher executable is located (for embedded launcher)
  // This allows C++ launcher, Electron, and AHK to all access the same file
  try {
    const exePath = process.execPath;
    const exeDir = path.dirname(exePath);
    
    // Check if we're in a temp directory (extracted by launcher)
    if (exePath.includes('vantrix') && !exePath.includes('AppData\\Local\\Temp')) {
      // Running from launcher directory - use that
      return path.join(exeDir, "gui_settings.json");
    } else if (exePath.includes('AppData\\Local\\Temp') || exePath.includes('vantrix_cc_')) {
      // Running from temp directory - try to find launcher directory
      // Look for the launcher in common locations
      const possiblePaths = [
        path.join(process.env.USERPROFILE || "", "Desktop", "vantrix.cc.exe"),
        path.join(process.env.USERPROFILE || "", "Downloads", "vantrix.cc.exe"),
        path.join(path.dirname(exePath), "..", "..", "..", "vantrix.cc.exe"),
      ];
      
      for (const launcherPath of possiblePaths) {
        if (fs.existsSync(launcherPath)) {
          return path.join(path.dirname(launcherPath), "gui_settings.json");
        }
      }
    }
    
    // Fallback to resources path (for AHK macros)
    return settingsFilePath;
  } catch (error) {
    console.error("Error getting shared settings path:", error);
    return settingsFilePath;
  }
}

function readSettings() {
  try {
    // Try shared settings path first (launcher directory)
    const sharedPath = getSharedSettingsPath();
    const pathsToTry = [sharedPath, settingsFilePath];
    
    for (const settingsPath of pathsToTry) {
      // Ensure the directory exists
      const dir = path.dirname(settingsPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      if (fs.existsSync(settingsPath)) {
        const data = fs.readFileSync(settingsPath, "utf8");
        const parsedData = JSON.parse(data);

        // Return settings directly without decryption
        console.log(`✅ Loaded settings from: ${settingsPath}`);
        
        // Also copy to resources path for AHK macros
        if (settingsPath !== settingsFilePath && fs.existsSync(path.dirname(settingsFilePath))) {
          try {
            fs.writeFileSync(settingsFilePath, data, "utf8");
          } catch (e) {
            // Ignore copy errors
          }
        }
        
        return parsedData;
      }
    }
    
    console.log(`ℹ️  Settings file not found, using defaults`);
  } catch (error) {
    console.error("Error reading settings:", error);
  }
  return {};
}

function writeSettings(settings) {
  try {
    // Write to multiple locations:
    // 1. Shared settings path (launcher directory) - for C++ launcher and persistence
    // 2. Resources folder - for AHK macros to read (they look in their script directory)
    // 3. Current settingsFilePath - fallback location
    const sharedPath = getSharedSettingsPath();
    const resourcesSettingsPath = path.join(process.resourcesPath || __dirname, "gui_settings.json");
    const pathsToWrite = [sharedPath, resourcesSettingsPath, settingsFilePath];
    
    // Ensure all global keybinds are included and can be updated
    // This prevents hardcoded values from blocking changes
    const globalKeybindKeys = [
      "global-edit-key",
      "global-select-key",
      "global-place-key",
      "global-wall-key",
      "global-floor-key",
      "global-stair-key",
      "global-cone-key",
      "global-sprint-key",
      "global-pickup-key",
    ];
    
    // Merge with existing settings to preserve other values, but allow global keys to be updated
    const existingSettings = readSettings();
    const mergedSettings = { ...existingSettings, ...settings };
    
    // Ensure all global keys from current settings are preserved (allows auto-update)
    globalKeybindKeys.forEach((key) => {
      if (settings[key] !== undefined) {
        mergedSettings[key] = settings[key];
      }
    });
    
    const dataToWrite = JSON.stringify(mergedSettings, null, 2);
    
    for (const settingsPath of pathsToWrite) {
      try {
        // Ensure the directory exists
        const dir = path.dirname(settingsPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // Write settings directly without encryption
        fs.writeFileSync(settingsPath, dataToWrite, { encoding: "utf8" });
        console.log(`✅ Saved settings to: ${settingsPath}`);
        
        // Log global key updates for debugging
        globalKeybindKeys.forEach((key) => {
          if (settings[key] !== undefined && settings[key] !== existingSettings[key]) {
            console.log(`🔄 Updated ${key}: "${existingSettings[key]}" -> "${settings[key]}"`);
          }
        });
      } catch (writeError) {
        // Don't fail if one location fails, try others
        console.warn(`⚠️  Could not write to ${settingsPath}:`, writeError.message);
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error writing settings:", error);
    return false;
  }
}

function stopAllMacros() {
  console.log("Stopping all macros...");

  const macroTypes = ["drag", "turbo", "double", "pickup", "shotgun"];

  for (const type of macroTypes) {
    if (activeMacros[type]) {
      const commandFile =
        type === "double"
          ? doubleCommandFilePath
          : type === "turbo"
            ? buildCommandFilePath
            : otherCommandFilePath;

      writeCommandFile(`stop_${type}`, {}, 3, commandFile);
      activeMacros[type] = false;
    }
  }
}

// ============================================================================
// IPC HANDLERS
// ============================================================================

ipcMain.handle("start-macro", async (event, type, settings) => {
  const startTime = performance.now();
  
  // Track macro start in analytics
  analytics.trackMacroStart(type);
  advancedLogger.info("Macro", `Starting macro: ${type}`, { type, settings });
  
  console.log(`\n╔═══════════════════════════════════════╗`);
  console.log(`║  STARTING: ${type.toUpperCase().padEnd(26)} ║`);
  console.log(`╚═══════════════════════════════════════╝`);

  try {
    activeMacros[type] = true;
    macroSettings[type] = settings; // Save settings for auto-restart

    // CRITICAL FIX: Ensure the engine process is running before sending commands
    // Added lock mechanism to prevent race conditions during restart
    if (type === "double" && !doubleEditProcess) {
      // Check if another operation is already restarting this engine
      if (processRestartLocks.doubleEdit) {
        console.log("║  ⏳ Waiting for engine restart...     ║");
        // Wait for the lock to be released (max 5 seconds)
        let waitCount = 0;
        while (processRestartLocks.doubleEdit && waitCount < 50) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          waitCount++;
        }
        if (processRestartLocks.doubleEdit) {
          console.error("║  ❌ Engine restart timeout            ║");
          activeMacros[type] = false;
          return { success: false, error: "Engine restart timeout" };
        }
      }

      processRestartLocks.doubleEdit = true;
      console.log("║  🔄 Restarting Double Edit engine...  ║");
      const engineStarted = await startDoubleEditEngine();
      if (!engineStarted) {
        console.error("║  ❌ Failed to start Double Edit engine ║");
        processRestartLocks.doubleEdit = false;
        activeMacros[type] = false;
        return { success: false, error: "Engine failed to start" };
      }
      // Increased delay to ensure engine is fully ready (200ms instead of 100ms)
      await new Promise((resolve) => setTimeout(resolve, 200));
      processRestartLocks.doubleEdit = false;
    } else if (type === "turbo" && !buildMacroProcess) {
      if (processRestartLocks.build) {
        console.log("║  ⏳ Waiting for engine restart...     ║");
        let waitCount = 0;
        while (processRestartLocks.build && waitCount < 50) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          waitCount++;
        }
        if (processRestartLocks.build) {
          console.error("║  ❌ Engine restart timeout            ║");
          activeMacros[type] = false;
          return { success: false, error: "Engine restart timeout" };
        }
      }

      processRestartLocks.build = true;
      console.log("║  🔄 Restarting Build Macro engine...  ║");
      const engineStarted = await startBuildMacroEngine();
      if (!engineStarted) {
        console.error("║  ❌ Failed to start Build Macro engine ║");
        processRestartLocks.build = false;
        activeMacros[type] = false;
        return { success: false, error: "Engine failed to start" };
      }
      await new Promise((resolve) => setTimeout(resolve, 200));
      processRestartLocks.build = false;
    } else if (
      (type === "drag" || type === "pickup" || type === "shotgun") &&
      !otherMacroProcess
    ) {
      if (processRestartLocks.other) {
        console.log("║  ⏳ Waiting for engine restart...     ║");
        let waitCount = 0;
        while (processRestartLocks.other && waitCount < 50) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          waitCount++;
        }
        if (processRestartLocks.other) {
          console.error("║  ❌ Engine restart timeout            ║");
          activeMacros[type] = false;
          return { success: false, error: "Engine restart timeout" };
        }
      }

      processRestartLocks.other = true;
      console.log("║  🔄 Restarting Other Macro engine...  ║");
      const engineStarted = await startOtherMacroEngine();
      if (!engineStarted) {
        console.error("║  ❌ Failed to start Other Macro engine ║");
        processRestartLocks.other = false;
        activeMacros[type] = false;
        return { success: false, error: "Engine failed to start" };
      }
      await new Promise((resolve) => setTimeout(resolve, 200));
      processRestartLocks.other = false;
    } else if (type === "crouch" && !crouchProcess) {
      if (processRestartLocks.crouch) {
        console.log("║  ⏳ Waiting for engine restart...     ║");
        let waitCount = 0;
        while (processRestartLocks.crouch && waitCount < 50) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          waitCount++;
        }
        if (processRestartLocks.crouch) {
          console.error("║  ❌ Engine restart timeout            ║");
          activeMacros[type] = false;
          return { success: false, error: "Engine restart timeout" };
        }
      }

      processRestartLocks.crouch = true;
      console.log("║  🔄 Restarting Crouch Spam engine...  ║");
      const engineStarted = await startCrouchEngine();
      if (!engineStarted) {
        console.error("║  ❌ Failed to start Crouch Spam engine ║");
        processRestartLocks.crouch = false;
        activeMacros[type] = false;
        return { success: false, error: "Engine failed to start" };
      }
      await new Promise((resolve) => setTimeout(resolve, 200));
      processRestartLocks.crouch = false;
    }

    // Handle Zuls macro separately - launch external application
    if (type === "zuls") {
      try {
        // Get Zuls macro executable path from resources folder
        // In dev: resources folder is in project root
        // In production: process.resourcesPath already points to the resources folder
        const zulsExePathDev = path.join(__dirname, "resources", "zuls-macro", "Zuls Premium Macro.exe");
        const zulsExePathProd = path.join(process.resourcesPath || __dirname, "zuls-macro", "Zuls Premium Macro.exe");
        const zulsExePath = fs.existsSync(zulsExePathDev) ? zulsExePathDev : zulsExePathProd;
        
        if (fs.existsSync(zulsExePath)) {
          console.log("║  🚀 Launching Zuls Premium Macro...    ║");
          console.log(`║  📍 Path: ${zulsExePath}                ║`);
          
          // Use Windows start command for external executables to avoid permission issues
          const workingDir = path.dirname(zulsExePath);
          console.log("Zuls Macro Working Directory:", workingDir);
          
          const { exec } = require('child_process');
          
          // Use Windows 'start' command to launch the executable in a separate window
          // This bypasses permission issues and allows the app to run normally
          const startCommand = `start "" "${zulsExePath}"`;
          
          exec(startCommand, {
            cwd: workingDir,
            windowsHide: false, // Show the window so user can see the macro
            shell: true
          }, (error, stdout, stderr) => {
            if (error) {
              console.error(`║  ❌ Error launching Zuls Macro: ${error.message} ║`);
              activeMacros.zuls = false;
            } else {
              console.log("✅ Zuls Premium Macro launched");
            }
          });
          
          // For process tracking, we'll use tasklist to check if it's running
          // Note: We can't directly track the process with start command, but it works
          zulsMacroProcess = { 
            killed: false, 
            pid: null,
            unref: () => {} // No-op since we can't track it directly
          };
          
          console.log("║  ✅ Zuls Premium Macro launched        ║");
          activeMacros.zuls = true;
          return {
            success: true,
            verified: true,
            macroActive: true,
          };
        } else {
          console.error("║  ❌ Zuls Premium Macro.exe not found   ║");
          console.error(`║  Tried dev path: ${zulsExePathDev}     ║`);
          console.error(`║  Tried prod path: ${zulsExePathProd}    ║`);
          activeMacros.zuls = false;
          return {
            success: false,
            error: "Zuls Premium Macro executable not found in zuls-macro folder."
          };
        }
      } catch (error) {
        console.error("║  ❌ Error launching Zuls Macro:         ║", error);
        activeMacros.zuls = false;
        return {
          success: false,
          error: error.message
        };
      }
    }

    // Determine which command file to use based on macro type
    let commandFile;
    if (type === "double") {
      commandFile = doubleCommandFilePath;
    } else if (type === "turbo") {
      commandFile = buildCommandFilePath;
    } else if (type === "crouch") {
      commandFile = crouchCommandFilePath;
    } else {
      commandFile = otherCommandFilePath;
    }

    let _commandsSent = 0;
    for (let attempt = 0; attempt < 2; attempt++) {
      const success = writeCommandFile(
        `start_${type}`,
        settings,
        10,
        commandFile,
      );
      if (success) {
        _commandsSent++;
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 50));

    const success = activeMacros[type];

    console.log(`║  ✅ ${type.toUpperCase()} STARTED SUCCESSFULLY    ║`);

    // Quick verification check
    const verified = activeMacros[type] === true;
    if (!verified) {
      console.log(`║  ⚠️  WARNING: Macro state verification failed ║`);
    }

    console.log(`╚═══════════════════════════════════════╝\n`);

    // Track performance
    const executionTime = performance.now() - startTime;
    performanceMonitor.trackMacroExecution(type, executionTime, success);
    
    if (success) {
      advancedLogger.info("Macro", `Macro started successfully: ${type}`, { 
        type, 
        executionTime: executionTime.toFixed(2) + "ms" 
      });
    } else {
      advancedLogger.warn("Macro", `Macro start failed: ${type}`, { type });
    }

    return {
      success,
      verified,
      macroActive: activeMacros[type],
    };
  } catch (error) {
    const executionTime = performance.now() - startTime;
    console.error(`Error starting ${type}:`, error);
    
    // Track error
    analytics.trackMacroError(type, error);
    performanceMonitor.trackMacroExecution(type, executionTime, false);
    advancedLogger.error("Macro", `Error starting macro: ${type}`, { 
      type, 
      error: error.message,
      executionTime: executionTime.toFixed(2) + "ms"
    });
    
    return { success: false, error: error.message };
  }
});

ipcMain.handle("stop-macro", async (event, type) => {
  const startTime = performance.now();
  
  // Track macro stop in analytics
  analytics.trackMacroStop(type);
  advancedLogger.info("Macro", `Stopping macro: ${type}`, { type });
  
  console.log(`\n╔═══════════════════════════════════════╗`);
  console.log(`║  STOPPING: ${type.toUpperCase().padEnd(27)} ║`);
  console.log(`╚═══════════════════════════════════════╝`);

  try {
    activeMacros[type] = false;
    macroSettings[type] = null; // Clear saved settings

    // For Zuls macro, kill by process name
    if (type === "zuls") {
      try {
        const { exec } = require('child_process');
        exec('taskkill /F /IM "Zuls Premium Macro.exe" /T', { windowsHide: true }, (error, stdout, stderr) => {
          if (!error) {
            console.log(`║  ✅ Zuls Macro process killed            ║`);
          } else {
            // Process might not be running, which is fine
            console.log(`║  ℹ️  Zuls Macro process not found (may already be stopped) ║`);
          }
        });
      } catch (e) {
        console.log(`║  ⚠️  Error stopping Zuls Macro: ${e.message} ║`);
      }
      zulsMacroProcess = null;
      activeMacros.zuls = false;
      console.log(`║  ✅ ${type.toUpperCase()} STOPPED                    ║`);
      console.log(`╚═══════════════════════════════════════╝\n`);
      return {
        success: true,
        verified: true,
        macroActive: false,
      };
    }

    // For double edit macro, forcefully kill the process
    if (type === "double") {
      stopDoubleEditEngine();
      console.log(`║  ✅ ${type.toUpperCase()} STOPPED COMPLETELY      ║`);

      // Quick verification check
      const verified = activeMacros[type] === false;
      if (!verified) {
        console.log(`║  ⚠️  WARNING: Macro state verification failed ║`);
      }

      console.log(`╚═══════════════════════════════════════╝\n`);
      return {
        success: true,
        verified,
        macroActive: activeMacros[type],
      };
    }

    // For crouch spam macro, forcefully kill the process
    if (type === "crouch") {
      stopCrouchEngine();
      console.log(`║  ✅ ${type.toUpperCase()} STOPPED COMPLETELY      ║`);

      // Quick verification check
      const verified = activeMacros[type] === false;
      if (!verified) {
        console.log(`║  ⚠️  WARNING: Macro state verification failed ║`);
      }

      console.log(`╚═══════════════════════════════════════╝\n`);
      return {
        success: true,
        verified,
        macroActive: activeMacros[type],
      };
    }

    // Determine which command file to use
    let commandFile;
    if (type === "turbo") {
      commandFile = buildCommandFilePath;
    } else {
      commandFile = otherCommandFilePath;
    }

    let _commandsSent = 0;
    for (let attempt = 0; attempt < 2; attempt++) {
      const success = writeCommandFile(`stop_${type}`, {}, 10, commandFile);
      if (success) {
        _commandsSent++;
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 50));

    console.log(`║  ✅ ${type.toUpperCase()} STOPPED COMPLETELY      ║`);

    // Quick verification check
    const verified = activeMacros[type] === false;
    if (!verified) {
      console.log(`║  ⚠️  WARNING: Macro state verification failed ║`);
    }

    console.log(`╚═══════════════════════════════════════╝\n`);

    return {
      success: true,
      verified,
      macroActive: activeMacros[type],
    };
  } catch (error) {
    console.error(`Error stopping ${type}:`, error);
    activeMacros[type] = false;
    return { success: false, error: error.message };
  }
});

ipcMain.handle("clear-macro", async (event, type) => {
  try {
    let commandFile;
    if (type === "double") {
      commandFile = doubleCommandFilePath;
    } else if (type === "turbo") {
      commandFile = buildCommandFilePath;
    } else {
      commandFile = otherCommandFilePath;
    }

    await writeCommandFile(`stop_${type}`, {}, 10, commandFile);
    activeMacros[type] = false;
    await new Promise((resolve) => setTimeout(resolve, 50));
    const success = writeCommandFile(`clear_${type}`, {}, 10, commandFile);
    return { success };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// ============================================================================
// HEALTH CHECK AND DIAGNOSTICS
// ============================================================================

ipcMain.handle("get-protection-status", async () => {
  try {
    return advancedProtection.getStatus();
  } catch (error) {
    return { active: false, error: error.message };
  }
});

ipcMain.handle("run-health-check", async () => {
  console.log("\n🔍 Running manual health check...");
  try {
    const resourcePath = isDev ? __dirname : process.resourcesPath || __dirname;
    const startupChecker = new StartupChecker(resourcePath, isDev);
    const checkResults = await startupChecker.runAllChecks();

    // Also check macro engine status
    const engineStatus = {
      buildMacro: buildMacroProcess !== null && !buildMacroProcess.killed,
      otherMacro: otherMacroProcess !== null && !otherMacroProcess.killed,
      doubleEdit: doubleEditProcess !== null && !doubleEditProcess.killed,
      crouch: crouchProcess !== null && !crouchProcess.killed,
    };

    return {
      success: checkResults.success,
      errors: checkResults.errors,
      warnings: checkResults.warnings,
      fixes: checkResults.fixes,
      optimizations: checkResults.optimizations,
      engineStatus: engineStatus,
      activeMacros: { ...activeMacros },
      performanceMode: currentPerformanceMode,
    };
  } catch (error) {
    console.error("❌ Health check error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
});

// Periodic health monitoring (runs every 5 minutes)
let healthCheckInterval = null;

function startHealthMonitoring() {
  if (healthCheckInterval) {
    clearInterval(healthCheckInterval);
  }

  healthCheckInterval = setInterval(async () => {
    try {
      // Quick health check - only check critical items
      const resourcePath = isDev ? __dirname : process.resourcesPath || __dirname;
      
      // Check if macro engines are still running
      const enginesRunning = {
        build: buildMacroProcess !== null && !buildMacroProcess.killed,
        other: otherMacroProcess !== null && !otherMacroProcess.killed,
        double: doubleEditProcess !== null && !doubleEditProcess.killed,
        crouch: crouchProcess !== null && !crouchProcess.killed,
      };

      // Check if command files are accessible
      const commandFiles = [
        "build_commands.txt",
        "other_commands.txt",
        "double_commands.txt",
        "crouch_commands.txt",
      ];

      let issuesFound = false;
      for (const file of commandFiles) {
        const filePath = path.join(resourcePath, file);
        try {
          if (!fs.existsSync(filePath)) {
            // Recreate missing file
            fs.writeFileSync(filePath, "", "utf8");
            console.log(`🔧 Auto-fixed missing command file: ${file}`);
            issuesFound = true;
          }
        } catch (error) {
          console.error(`⚠️  Cannot access command file ${file}:`, error.message);
          issuesFound = true;
        }
      }

      // Auto-restart engines if they died but macros are active
      if (activeMacros.turbo && !enginesRunning.build) {
        console.log("🔄 Auto-restarting Build macro engine...");
        await startBuildMacroEngine();
      }
      if ((activeMacros.drag || activeMacros.pickup || activeMacros.shotgun) && !enginesRunning.other) {
        console.log("🔄 Auto-restarting Other macro engine...");
        await startOtherMacroEngine();
      }
      if (activeMacros.double && !enginesRunning.double) {
        console.log("🔄 Auto-restarting Double Edit engine...");
        await startDoubleEditEngine();
      }
      if (activeMacros.crouch && !enginesRunning.crouch) {
        console.log("🔄 Auto-restarting Crouch Spam engine...");
        await startCrouchEngine();
      }

      if (issuesFound) {
        console.log("✅ Health check completed - issues auto-fixed");
      }
    } catch (error) {
      console.error("❌ Health monitoring error:", error);
    }
  }, 5 * 60 * 1000); // Every 5 minutes

  console.log("✅ Health monitoring started (checks every 5 minutes)");
}

function stopHealthMonitoring() {
  if (healthCheckInterval) {
    clearInterval(healthCheckInterval);
    healthCheckInterval = null;
    console.log("⏹️  Health monitoring stopped");
  }
}

ipcMain.handle("emergency-stop-all", async () => {
  console.log(`\n╔═══════════════════════════════════════╗`);
  console.log(`║  !!!! EMERGENCY STOP ALL !!!!          ║`);
  console.log(`╚═══════════════════════════════════════╝`);

  const macroTypes = ["drag", "turbo", "double", "pickup", "shotgun"];

  for (const type of macroTypes) {
    if (activeMacros[type]) {
      let commandFile;
      if (type === "double") {
        commandFile = doubleCommandFilePath;
      } else if (type === "turbo") {
        commandFile = buildCommandFilePath;
      } else {
        commandFile = otherCommandFilePath;
      }

      for (let i = 0; i < 2; i++) {
        writeCommandFile(`stop_${type}`, {}, 10, commandFile);
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      activeMacros[type] = false;
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 50));

  console.log(`║  ✅ ALL MACROS STOPPED                  ║`);
  console.log(`╚═══════════════════════════════════════╝\n`);

  return { success: true };
});

ipcMain.handle("save-settings", async (event, settings) => {
  try {
    const success = writeSettings(settings);
    
    
    return { success };
  } catch (error) {
    return { success: false, error: error.message };
  }
});


ipcMain.handle("load-settings", () => {
  try {
    return readSettings();
  } catch (_error) {
    return {};
  }
});

ipcMain.handle("get-macro-status", () => {
  return {
    running:
      buildMacroProcess !== null ||
      otherMacroProcess !== null ||
      doubleEditProcess !== null,
    build: buildMacroProcess !== null,
    other: otherMacroProcess !== null,
    doubleEdit: doubleEditProcess !== null,
    activeMacros: { ...activeMacros },
  };
});

ipcMain.handle("restart-macro", async () => {
  try {
    stopAllMacros();
    stopBuildMacroEngine();
    stopOtherMacroEngine();
    stopDoubleEditEngine();
    await new Promise((resolve) => setTimeout(resolve, 100));
    await startBuildMacroEngine();
    await startOtherMacroEngine();
    await startDoubleEditEngine();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.on("minimize-window", () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.on("maximize-window", () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on("close-window", () => {
  // Close auth window if it exists and is shown
  if (authWindow && !authWindow.isDestroyed()) {
    authWindow.close();
  }
  // Close main window if it exists
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.close();
  }
});

ipcMain.handle("toggle-ghost-mode", () => {
  try {
    if (mainWindow && !mainWindow.isDestroyed()) {
      const wasVisible = mainWindow.isVisible();
      if (wasVisible) {
        mainWindow.hide();
        console.log("👻 Ghost Mode ON (window hidden)");
      } else {
        mainWindow.show();
        mainWindow.focus();
        console.log("👁️  Ghost Mode OFF (window shown)");
      }
      return { success: true, visible: !wasVisible };
    }
    return { success: false, error: "Window not available" };
  } catch (error) {
    console.error("Error toggling ghost mode:", error);
    return { success: false, error: error.message };
  }
});

// Handler for updating global hotkeys (Ghost Mode and EZ Mode)
ipcMain.handle("update-global-hotkey", (event, settingKey, keyValue) => {
  try {
    console.log(`\n📋 Updating global hotkey: ${settingKey} -> ${keyValue}`);

    let success = false;
    
    if (settingKey === "ghost-mode-key") {
      success = registerGhostModeShortcut(keyValue);
      if (success) {
        currentGhostModeKey = keyValue;
      }
    } else if (settingKey === "ez-mode-key") {
      success = registerEzModeShortcut(keyValue);
      if (success) {
        currentEzModeKey = keyValue;
      }
    } else {
      return { success: false, error: "Unknown hotkey setting" };
    }

    // Save the hotkey to settings file
    if (success) {
      try {
        const settings = readSettings();
        settings[settingKey] = keyValue;
        writeSettings(settings);
        console.log(`✅ Saved ${settingKey} = ${keyValue} to settings file`);
      } catch (saveError) {
        console.error("Error saving hotkey to settings:", saveError);
        // Don't fail the operation if save fails, hotkey is still registered
      }
    }

    return { success, key: keyValue };
  } catch (error) {
    console.error("Error updating global hotkey:", error);
    return { success: false, error: error.message };
  }
});

// ============================================================================
// STARTUP MANAGEMENT
// ============================================================================

ipcMain.handle("set-startup", async (event, enabled) => {
  try {
    app.setLoginItemSettings({
      openAtLogin: enabled,
      openAsHidden: false,
      path: app.getPath("exe"),
    });
    console.log(`Startup ${enabled ? "enabled" : "disabled"}`);
    return { success: true };
  } catch (error) {
    console.error("Error setting startup:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("get-startup", async () => {
  try {
    const settings = app.getLoginItemSettings();
    return settings.openAtLogin;
  } catch (error) {
    console.error("Error getting startup setting:", error);
    return false;
  }
});

// ============================================================================
// VERSION MANAGEMENT IPC HANDLERS
// ============================================================================

ipcMain.handle("get-version-info", async () => {
  try {
    const isAllowed = isVersionAllowed();
    return {
      success: true,
      currentVersion: CURRENT_VERSION,
      minimumVersion: MINIMUM_REQUIRED_VERSION,
      isAllowed,
      isLatest: CURRENT_VERSION === MINIMUM_REQUIRED_VERSION,
    };
  } catch (error) {
    console.error("Error getting version info:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("check-version-allowed", async () => {
  try {
    const isAllowed = isVersionAllowed();
    if (!isAllowed) {
      showUpdateRequiredDialog();
    }
    return { success: true, isAllowed };
  } catch (error) {
    console.error("Error checking version:", error);
    return { success: false, error: error.message };
  }
});

// ============================================================================
// ADVANCED SYSTEMS IPC HANDLERS
// ============================================================================

// Performance Monitor
ipcMain.handle("get-performance-metrics", async () => {
  try {
    return { success: true, metrics: performanceMonitor.getMetrics() };
  } catch (error) {
    advancedLogger.error("IPC", "Failed to get performance metrics", { error: error.message });
    return { success: false, error: error.message };
  }
});

ipcMain.handle("get-performance-report", async () => {
  try {
    return { success: true, report: performanceMonitor.getReport() };
  } catch (error) {
    advancedLogger.error("IPC", "Failed to get performance report", { error: error.message });
    return { success: false, error: error.message };
  }
});

ipcMain.handle("get-macro-performance", async (event, macroName) => {
  try {
    const stats = performanceMonitor.getMacroStats(macroName);
    return { success: true, stats: stats };
  } catch (error) {
    advancedLogger.error("IPC", "Failed to get macro performance", { error: error.message });
    return { success: false, error: error.message };
  }
});

// Analytics
ipcMain.handle("get-analytics-report", async () => {
  try {
    return { success: true, report: analytics.getReport() };
  } catch (error) {
    advancedLogger.error("IPC", "Failed to get analytics report", { error: error.message });
    return { success: false, error: error.message };
  }
});

// Advanced Logger
ipcMain.handle("get-recent-logs", async (event, level, category, limit) => {
  try {
    const logs = advancedLogger.getRecentLogs(level, category, limit || 100);
    return { success: true, logs: logs };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle("set-log-level", async (event, level) => {
  try {
    advancedLogger.setLevel(level);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Error Recovery
ipcMain.handle("get-error-recovery-stats", async () => {
  try {
    return { success: true, stats: errorRecovery.getStats() };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle("reset-circuit-breaker", async (event, context) => {
  try {
    errorRecovery.resetCircuitBreaker(context);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Advanced Cache
ipcMain.handle("get-cache-stats", async () => {
  try {
    return { success: true, stats: advancedCache.getStats() };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle("clear-cache", async () => {
  try {
    advancedCache.clear();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// ============================================================================
// AUTO-UPDATE SYSTEM - REMOVED
// ============================================================================
// Auto-update functionality has been completely removed
// All IPC handlers for updates have been disabled

// Stub handlers to prevent errors if renderer tries to call them
ipcMain.handle("check-for-updates", async () => {
  return {
    success: true,
    updateAvailable: false,
    version: CURRENT_VERSION,
    description: "Auto-updates are disabled",
  };
});

ipcMain.handle("download-update", async () => {
  return {
    success: false,
    error: "Auto-updates are disabled",
  };
});

ipcMain.handle("install-update", async () => {
  return {
    success: false,
    error: "Auto-updates are disabled",
  };
});

// ============================================================================
// PERFORMANCE MODE MANAGEMENT
// ============================================================================

ipcMain.handle("get-performance-mode", async () => {
  try {
    return { success: true, mode: currentPerformanceMode };
  } catch (error) {
    console.error("Error getting performance mode:", error);
    return { success: false, error: error.message, mode: "high" };
  }
});

ipcMain.handle("verify-macro-state", async (event, expectedState = {}) => {
  try {
    console.log("🔍 Manual state verification requested");
    const verificationResults = verifyMacroSystemState(expectedState);
    return { success: true, verification: verificationResults };
  } catch (error) {
    console.error("Error during state verification:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("set-performance-mode", async (event, mode) => {
  try {
    console.log(`\n╔═══════════════════════════════════════╗`);
    console.log(`║  CHANGING PERFORMANCE MODE            ║`);
    console.log(
      `║  From: ${currentPerformanceMode.toUpperCase().padEnd(30)} ║`,
    );
    console.log(`║  To:   ${mode.toUpperCase().padEnd(30)} ║`);
    console.log(`╚═══════════════════════════════════════╝`);

    // Validate mode
    if (!["high", "medium", "low"].includes(mode)) {
      console.error("❌ Invalid performance mode:", mode);
      return { success: false, error: "Invalid performance mode" };
    }

    // Save which macros are currently active and their settings
    const activeMacrosSnapshot = {};
    const macroTypes = ["drag", "turbo", "double", "pickup", "shotgun"];
    for (const type of macroTypes) {
      if (activeMacros[type] && macroSettings[type]) {
        activeMacrosSnapshot[type] = { ...macroSettings[type] };
        console.log(
          `║  📌 Saving ${type.toUpperCase()} state for auto-restart`,
        );
      }
    }

    // Save to settings first
    const settings = readSettings();
    settings.performanceMode = mode;
    writeSettings(settings);

    // Update current mode
    currentPerformanceMode = mode;

    // Stop all macros and engines
    console.log("🛑 Stopping all macros and engines...");
    stopAllMacros();
    stopBuildMacroEngine();
    stopOtherMacroEngine();
    stopDoubleEditEngine();

    // Wait for all processes to fully terminate (increased from 500ms to 1000ms for reliability)
    console.log("⏳ Waiting for processes to terminate...");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Start engines with new performance mode
    console.log("🚀 Starting engines with new performance mode...");
    await startBuildMacroEngine();
    await startOtherMacroEngine();
    await startDoubleEditEngine();

    // Auto-restart macros that were running
    const restartedMacros = [];
    if (Object.keys(activeMacrosSnapshot).length > 0) {
      console.log("🔄 Auto-restarting previously active macros...");

      // Wait a bit for engines to be fully ready
      await new Promise((resolve) => setTimeout(resolve, 500));

      for (const [type, savedSettings] of Object.entries(
        activeMacrosSnapshot,
      )) {
        try {
          console.log(`║  🔄 Restarting ${type.toUpperCase()}...`);

          // Restore the macro state
          activeMacros[type] = true;
          macroSettings[type] = savedSettings;

          // Determine which command file to use
          let commandFile;
          if (type === "double") {
            commandFile = doubleCommandFilePath;
          } else if (type === "turbo") {
            commandFile = buildCommandFilePath;
          } else {
            commandFile = otherCommandFilePath;
          }

          // Send start command
          for (let attempt = 0; attempt < 2; attempt++) {
            writeCommandFile(`start_${type}`, savedSettings, 10, commandFile);
            await new Promise((resolve) => setTimeout(resolve, 10));
          }

          restartedMacros.push(type);
          console.log(`║  ✅ ${type.toUpperCase()} restarted`);
        } catch (error) {
          console.error(`Error restarting ${type}:`, error);
        }
      }
    }

    console.log(`✅ Performance mode changed to: ${mode.toUpperCase()}`);
    if (restartedMacros.length > 0) {
      console.log(
        `✅ Auto-restarted ${restartedMacros.length} macro(s): ${restartedMacros.join(", ")}`,
      );
    }

    // Perform state verification to ensure everything is working correctly
    const verificationResults = await performDelayedVerification(
      {
        performanceMode: mode,
        activeMacros: restartedMacros,
      },
      800,
    );

    console.log(`╚═══════════════════════════════════════╝\n`);

    return {
      success: true,
      mode: currentPerformanceMode,
      restartedMacros,
      verification: verificationResults,
    };
  } catch (error) {
    console.error("Error setting performance mode:", error);
    return { success: false, error: error.message };
  }
});

// ============================================================================
// ANTI-DEBUGGING IPC HANDLERS
// ============================================================================

ipcMain.handle("devtools-detected", async (event, method) => {
  // DevTools detection disabled - allow DevTools
  console.log(`[DevTools] DevTools opened via: ${method} (allowed)`);
  return { success: true };
});

// ============================================================================
// APP LIFECYCLE WITH AUTHENTICATION
// ============================================================================

// Perform initial anti-RE security check before app starts
antiRE.initialSecurityCheck();

// Initialize EAC evasion system early (critical for avoiding detection)
eacEvasion.initialize();
memoryProtection.initialize();

// Initialize advanced protection system (with delay to avoid startup false positives)
setTimeout(async () => {
  try {
    // Verify startup integrity first (only in production)
    if (app.isPackaged) {
      const integrityOk = await advancedProtection.verifyStartupIntegrity();
      if (!integrityOk) {
        console.error("[Advanced Protection] Startup integrity check failed!");
        // Don't block startup, but log the issue
      }
    }

    // Start advanced protection (delayed to avoid false positives)
    await advancedProtection.initialize();
  } catch (error) {
    console.error("[Advanced Protection] Initialization error:", error);
    // Don't block startup if protection fails to initialize
  }
}, 5000); // 5 second delay to avoid startup false positives

// Load performance mode from settings
function loadPerformanceModeFromSettings() {
  try {
    const settings = readSettings();
    if (
      settings.performanceMode &&
      ["high", "medium", "low"].includes(settings.performanceMode)
    ) {
      currentPerformanceMode = settings.performanceMode;
      console.log(
        "✅ Loaded performance mode from settings:",
        currentPerformanceMode.toUpperCase(),
      );
    } else {
      // Default to high performance
      currentPerformanceMode = "high";
      console.log("ℹ️  No saved performance mode, defaulting to HIGH");
    }
  } catch (error) {
    console.error("Error loading performance mode:", error);
    currentPerformanceMode = "high";
  }
}

// Load hotkey settings from saved configuration
function loadHotkeySettings() {
  try {
    const settings = readSettings();

    // Load Ghost Mode hotkey
    if (settings["ghost-mode-key"]) {
      currentGhostModeKey = settings["ghost-mode-key"];
      console.log("✅ Loaded Ghost Mode hotkey:", currentGhostModeKey);
    } else {
      currentGhostModeKey = "F10";
      console.log("ℹ️  No saved Ghost Mode hotkey, defaulting to F10");
    }

    // Load EZ Mode hotkey
    if (settings["ez-mode-key"]) {
      currentEzModeKey = settings["ez-mode-key"];
      console.log("✅ Loaded EZ Mode hotkey:", currentEzModeKey);
    } else {
      currentEzModeKey = "F7";
      console.log("ℹ️  No saved EZ Mode hotkey, defaulting to F7");
    }
  } catch (error) {
    console.error("Error loading hotkey settings:", error);
    currentGhostModeKey = "F10";
    currentEzModeKey = "F7";
  }
}

app.whenReady().then(async () => {
  // CRITICAL: Check version before allowing app to start
  if (!isVersionAllowed()) {
    showUpdateRequiredDialog();
    return; // Prevent app from continuing
  }

  // ============================================================================
  // STARTUP ERROR CHECKER AND AUTO-FIXER
  // ============================================================================
  console.log("\n🚀 Running startup checks and optimizations...\n");
  try {
    const resourcePath = isDev ? __dirname : process.resourcesPath || __dirname;
    const startupChecker = new StartupChecker(resourcePath, isDev);
    const checkResults = await startupChecker.runAllChecks();

    if (!checkResults.success && checkResults.errors.length > 0) {
      console.error("\n⚠️  Startup check found errors. Attempting to continue...");
      // Don't block startup, but log errors
      checkResults.errors.forEach((error) => {
        console.error(`   ❌ ${error}`);
      });
    }

    if (checkResults.fixes.length > 0) {
      console.log("\n✅ Startup fixes applied successfully!");
    }

    if (checkResults.optimizations.length > 0) {
      console.log("\n⚡ Advanced optimizations applied!");
    }
  } catch (error) {
    console.error("❌ Startup checker error:", error);
    // Don't block startup if checker fails
  }

  // Load performance mode before starting
  loadPerformanceModeFromSettings();

  // Load hotkey settings before registering shortcuts
  loadHotkeySettings();

  // Show auth window first instead of main window
  createAuthWindow();

  // Start health monitoring
  startHealthMonitoring();

  // Register shortcuts with configured keys (will re-register after main window opens)
  registerGhostModeShortcut(currentGhostModeKey);
  registerEzModeShortcut(currentEzModeKey);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      if (isAuthenticated) {
        createWindow();
      } else {
        createAuthWindow();
      }
    }
  });
});

// ============================================================================
// OPTIMIZED AUTH MONITORING - Consolidated interval for better performance
// ============================================================================

// Unified auth check - runs every 30 seconds, full check every 2 minutes
let authCheckCounter = 0;
const AUTH_QUICK_CHECK_INTERVAL = 30 * 1000; // 30 seconds
const AUTH_FULL_CHECK_EVERY = 4; // Every 4 quick checks = 2 minutes

async function handleAuthFailure(result) {
  console.error("❌ Auth check failed:", result.reason);
  isAuthenticated = false;

  let notificationMessage = "";
  let logMessage = "";

  // Determine the reason for failure
  if (result.banned) {
    notificationMessage =
      "🚫 Your account has been banned. Application will close.";
    logMessage = "🚫 User has been BANNED, closing application...";
  } else if (result.removed) {
    notificationMessage =
      "⚠️ Your license key has been removed or deleted. Application will close.";
    logMessage =
      "⚠️ License key has been REMOVED/DELETED, closing application...";
  } else if (result.reason === "expired") {
    notificationMessage =
      "⏰ Your session has expired. Application will close.";
    logMessage = "⏰ Session EXPIRED, closing application...";
  } else if (result.reason === "license_removed") {
    notificationMessage =
      "⚠️ Your license is no longer valid. Application will close.";
    logMessage = "⚠️ License is no longer valid, closing application...";
  } else {
    notificationMessage = "⚠️ Authentication failed. Application will close.";
    logMessage = "⚠️ Authentication failed, closing application...";
  }

  console.log(logMessage);

  // Show notification to user
  if (mainWindow && !mainWindow.isDestroyed()) {
    try {
      mainWindow.webContents.send("show-notification", {
        type: "error",
        message: notificationMessage,
      });

      // Give time to see the message
      await new Promise((resolve) => setTimeout(resolve, 2500));
    } catch (error) {
      console.error("Error showing notification:", error);
    }

    mainWindow.close();
  }

  // Cleanup and quit
  stopAllMacros();
  stopBuildMacroEngine();
  stopOtherMacroEngine();
  stopDoubleEditEngine();
  killAllMacroProcesses();

  app.quit();
}

// Consolidated auth check interval (optimized to reduce redundancy)
setInterval(async () => {
  if (!isAuthenticated || !mainWindow || mainWindow.isDestroyed()) {
    return;
  }

  try {
    authCheckCounter++;
    const isFullCheck = authCheckCounter % AUTH_FULL_CHECK_EVERY === 0;

    if (isFullCheck) {
      console.log("🔐 Running full auth check (2min interval)...");
    }

    const result = await keyauth.checkSession();

    // Handle critical failures immediately (ban/removal)
    if (!result.success && (result.banned || result.removed)) {
      console.error("🚨 CRITICAL: Account banned or license removed!");
      await handleAuthFailure(result);
      return;
    }

    // Handle other failures only on full check
    if (isFullCheck && !result.success) {
      await handleAuthFailure(result);
    } else if (isFullCheck) {
      console.log("✅ Full auth check passed");
    }
  } catch (error) {
    console.error("Error in auth check:", error);
    // Don't close app on network errors, only on auth failures
  }
}, AUTH_QUICK_CHECK_INTERVAL);

app.on("window-all-closed", () => {
  // Don't quit if we're authenticated and main window is being created
  if (isAuthenticated && !mainWindow) {
    console.log("⚠️ Waiting for main window to be created...");
    return;
  }

  stopAllMacros();
  stopBuildMacroEngine();
  stopOtherMacroEngine();
  stopDoubleEditEngine();
  killAllMacroProcesses(); // Comprehensive cleanup
  globalShortcut.unregisterAll();

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  // Stop health monitoring
  stopHealthMonitoring();
  app.isQuitting = true;
  antiRE.stopMonitoring(); // Stop anti-RE monitoring
  advancedProtection.stop(); // Stop advanced protection
  performanceMonitor.stop(); // Stop performance monitoring
  analytics.stop(); // Stop analytics
  advancedLogger.info("Application", "Application shutting down");
  stopAllMacros();
  stopBuildMacroEngine();
  stopOtherMacroEngine();
  stopDoubleEditEngine();
  killAllMacroProcesses(); // Comprehensive cleanup
  globalShortcut.unregisterAll();
});

app.on("will-quit", () => {
  console.log("🛑 App quitting, final cleanup...");
  stopAllMacros();
  stopBuildMacroEngine();
  stopOtherMacroEngine();
  stopDoubleEditEngine();
  killAllMacroProcesses(); // Comprehensive cleanup
  globalShortcut.unregisterAll();
  console.log("✅ Final cleanup complete");
});

console.log("\n╔═══════════════════════════════════════════════╗");
console.log("║   REXIUM LABS MACRO v12.0                    ║");
console.log("║   🔐 KeyAuth HWID Lock Enabled                ║");
console.log("║   🛡️  Anti-RE Protection Enabled              ║");
console.log("║   🛡️  Advanced Protection Enabled             ║");
console.log("║   🔒 Version Control Enabled                  ║");
console.log("║   ✓ Triple-Engine System                      ║");
console.log("║   ✓ Separate Build Process                   ║");
console.log("║   ✓ Separate Other Macros Process            ║");
console.log("║   ✓ Separate Double Edit Process             ║");
console.log("║   ✓ 100% AutoHotkey v2                       ║");
console.log("║   💻 Ghost Mode: F10                         ║");
console.log("╚═══════════════════════════════════════════════╝\n");
