/**
 * @file preload.js - Electron Preload Script
 * @description Securely exposes IPC communication between renderer and main process
 * using contextBridge for enhanced security
 * @version 12.0.0
 */

try {
  const { contextBridge, ipcRenderer } = require("electron");

  contextBridge.exposeInMainWorld("electron", {
    // Authentication
    authLicense: (licenseKey) => ipcRenderer.invoke("auth-license", licenseKey),
    getHWID: () => ipcRenderer.invoke("get-hwid"),
    checkSession: () => ipcRenderer.invoke("check-session"),
    authLogout: () => ipcRenderer.invoke("auth-logout"),
    getLicenseInfo: () => ipcRenderer.invoke("get-license-info"),

    // Macro operations
    startMacro: (type, settings) =>
      ipcRenderer.invoke("start-macro", type, settings),
    stopMacro: (type) => ipcRenderer.invoke("stop-macro", type),
    clearMacro: (type) => ipcRenderer.invoke("clear-macro", type),
    saveSettings: (settings) => ipcRenderer.invoke("save-settings", settings),
    loadSettings: () => ipcRenderer.invoke("load-settings"),
    getMacroStatus: () => ipcRenderer.invoke("get-macro-status"),
    restartMacro: () => ipcRenderer.invoke("restart-macro"),
    onMacroStatus: (callback) =>
      ipcRenderer.on("macro-status", (event, status) => callback(status)),
    onMacroError: (callback) =>
      ipcRenderer.on("macro-error", (event, error) => callback(error)),

    // Ghost mode
    toggleGhostMode: () => ipcRenderer.invoke("toggle-ghost-mode"),
    onGhostModeChanged: (callback) =>
      ipcRenderer.on("ghost-mode-changed", (event, isGhost) =>
        callback(isGhost),
      ),

    // EZ mode toggle (F7)
    onEzModeToggle: (callback) =>
      ipcRenderer.on("toggle-ez-mode", () => callback()),

    // Global hotkey configuration
    updateGlobalHotkey: (settingKey, keyValue) =>
      ipcRenderer.invoke("update-global-hotkey", settingKey, keyValue),

    // Startup management
    setStartup: (enabled) => ipcRenderer.invoke("set-startup", enabled),
    getStartup: () => ipcRenderer.invoke("get-startup"),

    // Performance mode management
    getPerformanceMode: () => ipcRenderer.invoke("get-performance-mode"),
    setPerformanceMode: (mode) =>
      ipcRenderer.invoke("set-performance-mode", mode),
    verifyMacroState: (expectedState) =>
      ipcRenderer.invoke("verify-macro-state", expectedState),

    // Version management
    getVersionInfo: () => ipcRenderer.invoke("get-version-info"),
    checkVersionAllowed: () => ipcRenderer.invoke("check-version-allowed"),

    // Auto-update system
    checkForUpdates: () => ipcRenderer.invoke("check-for-updates"),
    downloadUpdate: (updateInfo) =>
      ipcRenderer.invoke("download-update", updateInfo),
    installUpdate: () => ipcRenderer.invoke("install-update"),
    onUpdateAvailable: (callback) =>
      ipcRenderer.on("update-available", (event, info) => callback(info)),
    onUpdateNotAvailable: (callback) =>
      ipcRenderer.on("update-not-available", (event, info) => callback(info)),
    onUpdateProgress: (callback) =>
      ipcRenderer.on("update-progress", (event, progress) =>
        callback(progress),
      ),
    onUpdateDownloaded: (callback) =>
      ipcRenderer.on("update-downloaded", (event, info) => callback(info)),
    onUpdateError: (callback) =>
      ipcRenderer.on("update-error", (event, error) => callback(error)),

    // Window controls
    minimizeWindow: () => ipcRenderer.send("minimize-window"),
    maximizeWindow: () => ipcRenderer.send("maximize-window"),
    closeWindow: () => ipcRenderer.send("close-window"),

    // Anti-debugging
    devToolsDetected: (method) =>
      ipcRenderer.invoke("devtools-detected", method),
    
    // Advanced protection
    getProtectionStatus: () => ipcRenderer.invoke("get-protection-status"),
    
    // Performance Monitor
    getPerformanceMetrics: () => ipcRenderer.invoke("get-performance-metrics"),
    getPerformanceReport: () => ipcRenderer.invoke("get-performance-report"),
    getMacroPerformance: (macroName) => ipcRenderer.invoke("get-macro-performance", macroName),
    
    // Analytics
    getAnalyticsReport: () => ipcRenderer.invoke("get-analytics-report"),
    
    // Advanced Logger
    getRecentLogs: (level, category, limit) => ipcRenderer.invoke("get-recent-logs", level, category, limit),
    setLogLevel: (level) => ipcRenderer.invoke("set-log-level", level),
    
    // Error Recovery
    getErrorRecoveryStats: () => ipcRenderer.invoke("get-error-recovery-stats"),
    resetCircuitBreaker: (context) => ipcRenderer.invoke("reset-circuit-breaker", context),
    
    // Advanced Cache
    getCacheStats: () => ipcRenderer.invoke("get-cache-stats"),
    clearCache: () => ipcRenderer.invoke("clear-cache"),
  });

} catch (error) {
  console.error("❌ Error in preload script:", error);
  console.error("Stack:", error.stack);
}
