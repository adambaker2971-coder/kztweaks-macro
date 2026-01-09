/**
 * Application Constants and Configuration
 * Centralized configuration for magic numbers, timeouts, and string constants
 */

module.exports = {
  // Application Metadata
  APP: {
    NAME: "Rexium-X-macro",
    VERSION: "12.0.0",
    DESCRIPTION: "Game with no Limits!",
  },

  // File Paths
  PATHS: {
    SETTINGS_FILE: "gui_settings.json",
    BUILD_COMMAND_FILE: "build_commands.json",
    OTHER_COMMAND_FILE: "other_commands.json",
    DOUBLE_COMMAND_FILE: "double_commands.json",
    LICENSE_DB: "keydb.kzn",
  },

  // Performance Modes
  PERFORMANCE: {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
    DEFAULT: "medium",
  },

  // Timing Constants (in milliseconds)
  TIMING: {
    DEBOUNCE_SAVE: 300, // Settings save debounce
    FILE_WRITE_RETRY: 2, // Busy wait for file operations (ms)
    COMMAND_RETRY_DELAY: 10, // Delay between command retries (ms)
    COMMAND_VERIFY_DELAY: 50, // Delay before verifying command success (ms)
    MACRO_RESTART_DELAY: 100, // Delay before restarting macro (ms)
    LOADING_SCREEN_DURATION: 1500, // Loading screen duration (ms)
    TOAST_DURATION: 4000, // Toast notification duration (ms)
    AUTH_CHECK_INTERVAL: 30000, // Auth status check interval (30 seconds)
    ANTI_RE_CHECK_INTERVAL: 5000, // Anti-RE check interval (5 seconds)
    DEBUGGER_PAUSE_THRESHOLD: 500, // Debugger detection threshold (ms)
  },

  // Retry Limits
  RETRIES: {
    FILE_CHECK: 5, // Max retries for file existence check
    COMMAND_WRITE: 10, // Max retries for command file write
    COMMAND_SEND: 2, // Number of command sends per macro action
    EXPONENTIAL_BACKOFF: 5, // Max exponential backoff iterations
  },

  // IPC Event Names
  IPC: {
    // Authentication
    AUTH_LICENSE: "auth-license",
    AUTH_LOGOUT: "auth-logout",
    CHECK_SESSION: "check-session",
    GET_HWID: "get-hwid",
    GET_LICENSE_INFO: "get-license-info",

    // Macro Control
    START_MACRO: "start-macro",
    STOP_MACRO: "stop-macro",
    UPDATE_MACRO: "update-macro",
    GET_MACRO_STATUS: "get-macro-status",
    RESTART_MACRO: "restart-macro",
    CLEAR_MACRO: "clear-macro",

    // Settings
    SAVE_SETTINGS: "save-settings",
    LOAD_SETTINGS: "load-settings",
    WRITE_FILE: "write-file",

    // Updates
    CHECK_FOR_UPDATES: "check-for-updates",
    DOWNLOAD_UPDATE: "download-update",
    INSTALL_UPDATE: "install-update",
    UPDATE_AVAILABLE: "update-available",
    UPDATE_NOT_AVAILABLE: "update-not-available",
    UPDATE_DOWNLOADED: "update-downloaded",
    UPDATE_ERROR: "update-error",
    UPDATE_PROGRESS: "update-progress",

    // Window Control
    MINIMIZE_WINDOW: "minimize-window",
    MAXIMIZE_WINDOW: "maximize-window",
    CLOSE_WINDOW: "close-window",
    QUIT_APP: "quit-app",

    // Security
    DEV_TOOLS_DETECTED: "dev-tools-detected",
  },

  // Macro Types
  MACRO_TYPES: {
    DRAG: "drag",
    TURBO: "turbo",
    DOUBLE: "double",
    PICKUP: "pickup",
    SHOTGUN: "shotgun",
    CROUCH: "crouch",
  },

  // Window Configuration
  WINDOW: {
    DEFAULT_WIDTH: 1200,
    DEFAULT_HEIGHT: 800,
    MIN_WIDTH: 800,
    MIN_HEIGHT: 600,
    FRAME: false,
    TRANSPARENT: false,
  },

  // KeyAuth Configuration
  KEYAUTH: {
    API_URL: "https://keyauth.win/api/1.2/",
    APP_NAME: "Rexium",
    OWNER_ID: "Zl4RQdE7J5",
    APP_VERSION: "1.0",
  },

  // Security Configuration
  SECURITY: {
    ANTI_DEBUG_THRESHOLD: 5, // Number of detections before action
    MAX_TOAST_NOTIFICATIONS: 3, // Max simultaneous toast notifications
  },

  // Build Macro Executable Names
  EXECUTABLES: {
    BUILD_HIGH: "Build Macro high performance.exe",
    BUILD_MEDIUM: "Build Macro medium performance.exe",
    BUILD_LOW: "Build Macro low performance.exe",
    DOUBLE_HIGH: "Double Edit Macro high performance.exe",
    DOUBLE_MEDIUM: "Double Edit Macro medium performance.exe",
    DOUBLE_LOW: "Double Edit Macro low performance.exe",
    OTHER: "Other Macros.exe",
    CROUCH: "crouch spam.exe",
  },

  // Default Settings
  DEFAULTS: {
    // Drag Macro
    DRAG_DELAY: 1,
    DRAG_SPRINT: false,

    // Turbo Build
    TURBO_SPEED: 1,

    // Double Edit
    DOUBLE_DELAY: 0,
    DOUBLE_SPRINT: false,

    // Pickup
    PICKUP_SPEED: 10,

    // Shotgun
    SHOTGUN_DELAY: 3,
    SHOTGUN_SLOT: "2",

    // Crouch
    CROUCH_DELAY: 1,
  },

  // Validation Rules
  VALIDATION: {
    MIN_DELAY: 0,
    MAX_DELAY: 100,
    MIN_SPEED: 1,
    MAX_SPEED: 100,
    ALLOWED_KEY_PATTERN:
      /^[a-z0-9]$|^F[0-9]{1,2}$|^(lbutton|rbutton|mbutton|xbutton[12])$/i,
  },

  // Error Messages
  ERRORS: {
    LICENSE_REQUIRED: "Please enter a license key",
    LICENSE_INVALID: "Invalid license key",
    SESSION_EXPIRED: "Session expired. Please login again.",
    MACRO_ALREADY_RUNNING: "Macro is already running",
    INVALID_KEYBIND: "Invalid keybind configuration",
    FILE_WRITE_FAILED: "Failed to write configuration file",
    NETWORK_ERROR: "Network connection error",
  },

  // Success Messages
  SUCCESS: {
    LICENSE_VALIDATED: "License validated successfully",
    MACRO_STARTED: "Macro started successfully",
    MACRO_STOPPED: "Macro stopped successfully",
    SETTINGS_SAVED: "Settings saved successfully",
    UPDATE_AVAILABLE: "Update available",
  },
};
