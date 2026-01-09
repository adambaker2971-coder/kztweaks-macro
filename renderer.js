/**
 * @file renderer.js - Renderer Process for Rexium-X-macro
 * @description Handles UI interactions, macro state management, settings synchronization,
 * and communication with the main process via IPC
 * @version 12.0.0
 */

const macroStates = {
  drag: false,
  turbo: false,
  double: false,
  pickup: false,
  shotgun: false,
  crouch: false,
  zuls: false,
};

// Runtime tracking for each macro
const macroRuntimes = {
  drag: { startTime: null, interval: null },
  turbo: { startTime: null, interval: null },
  double: { startTime: null, interval: null },
  pickup: { startTime: null, interval: null },
  shotgun: { startTime: null, interval: null },
  crouch: { startTime: null, interval: null },
  zuls: { startTime: null, interval: null },
};

// Initialize app
window.addEventListener("DOMContentLoaded", async () => {

  // Check if electron bridge is available
  if (!window.electron) {
    console.error("Electron bridge not available!");
    showNotification("Error: Electron bridge not initialized", true);
    return;
  }

  await loadSavedSettings();
  await loadStartupSetting();

  // Expose handlers to global scope for inline functions
  window.startMacroHandler = startMacro;
  window.stopMacroHandler = stopMacro;
  window.saveMacroHandler = saveMacro;
  window.clearMacroHandler = clearMacro;
  window.saveSingleSetting = saveSingleSetting;

  // Set up macro status listener
  if (window.electron.onMacroStatus) {
    window.electron.onMacroStatus((status) => {
      // Macro status updates handled silently
    });
  }

  // Set up macro error listener
  if (window.electron.onMacroError) {
    window.electron.onMacroError((error) => {
      console.error("Macro error:", error);
      showNotification(`AHK engine error: ${error.message}`, true);
    });
  }

  // Check macro engine status
  checkMacroStatus();
});

// Check if macro engine is running
async function checkMacroStatus() {
  try {
    // Wait for engines to fully initialize (increased from 100ms to 500ms for reliability)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const status = await window.electron.getMacroStatus();

    if (!status.running) {
      console.warn("AHK engine is not running");
      // Warning notification removed
    } else {
      // Notification removed - engine starts silently
    }
  } catch (error) {
    console.error("Error checking macro status:", error);
  }
}

// Load saved settings from Electron backend
async function loadSavedSettings() {
  try {
    const settings = await window.electron.loadSettings();

    // Store settings in window scope for access by other scripts
    window.currentSettings = settings || {};

    if (settings && Object.keys(settings).length > 0) {
      applySettings(settings);
    } else {
    }
  } catch (error) {
    console.error("Error loading settings:", error);
    showNotification("Error loading settings", true);
  }
}

// Apply settings to UI
function applySettings(settings) {
  Object.keys(settings).forEach((key) => {
    const element = document.getElementById(key);
    if (element) {
      if (element.type === "checkbox") {
        element.checked = settings[key];
        // Special handling for performance mode
        if (key === "performance-mode" && settings[key]) {
          document.body.classList.add("performance-mode");
        }
      } else if (element.type === "range" || element.type === "number") {
        element.value = settings[key];
        if (element.type === "range") {
          updateSliderValue(key);
        }
      } else if (
        element.classList.contains("key-button") ||
        element.classList.contains("keybind-button")
      ) {
        const value = settings[key];
        if (value && value !== "SELECT" && value !== "SELECT BIND") {
          element.textContent = value.toUpperCase();
        }
      }
    }
    
    // Also update display elements for keybinds (e.g., global-select-key-display)
    // Check for keys that start with "global-" and end with "-key"
    if (key.startsWith("global-") && key.endsWith("-key")) {
      const value = settings[key];
      
      // Update display element (e.g., global-select-key-display)
      const displayElement = document.getElementById(`${key}-display`);
      if (displayElement) {
        if (value && value !== "SELECT" && value !== "SELECT BIND" && value !== "" && value !== "Not Set") {
          displayElement.textContent = value.toUpperCase();
        } else {
          displayElement.textContent = "Not Set";
        }
      }
      
      // Also update the button text if it exists
      const buttonElement = document.getElementById(`${key}-btn`);
      if (buttonElement) {
        if (value && value !== "SELECT" && value !== "SELECT BIND" && value !== "" && value !== "Not Set") {
          buttonElement.textContent = value.toUpperCase();
        } else {
          buttonElement.textContent = window.getTranslation?.('keybinds.select', 'SELECT') || 'SELECT';
        }
      }
    }
  });
  
  // Trigger HTML's keybind loading function if it exists (it will normalize the display)
  setTimeout(() => {
    if (typeof window.loadListViewKeybinds === "function") {
      window.loadListViewKeybinds();
    }
  }, 100);
}

// Slider value updates
function updateSliderValue(id) {
  const slider = document.getElementById(id);
  const valueDisplay = document.getElementById(`${id}-value`);
  if (slider && valueDisplay) {
    valueDisplay.textContent = `Current: ${slider.value}ms`;
  }
}

// Debounced settings write to reduce file I/O
let settingsWriteTimeout = null;
const pendingSettings = {};

// Save single setting with debouncing (300ms delay)
// Keybinds are saved immediately to ensure they persist
async function saveSingleSetting(key, value) {
  try {
    // Update in-memory settings immediately
    if (!window.currentSettings) {
      window.currentSettings = {};
    }
    window.currentSettings[key] = value;

    // Add to pending settings queue
    pendingSettings[key] = value;

    // Clear existing timeout
    if (settingsWriteTimeout) {
      clearTimeout(settingsWriteTimeout);
    }

    // For keybinds (global-* keys), save immediately without debounce
    const isKeybind = key.startsWith("global-") || key.includes("-key");
    
    if (isKeybind) {
      // Save keybinds immediately to ensure they persist and auto-update gui_settings.json
      try {
        const settings = await window.electron.loadSettings();
        // Always update the key value - no restrictions, allows changes
        settings[key] = value;
        await window.electron.saveSettings(settings);
        console.log(`✅ Immediately saved keybind: ${key} = ${value} (auto-updated gui_settings.json)`);
        // Remove from pending queue since it's already saved
        delete pendingSettings[key];
      } catch (error) {
        console.error("Error immediately saving keybind:", error);
        showNotification("Error saving keybind", true);
      }
    } else {
      // For other settings, use debounced batch write
    settingsWriteTimeout = setTimeout(async () => {
      try {
        const settings = await window.electron.loadSettings();

        // Apply all pending settings
        Object.assign(settings, pendingSettings);

        // Write to disk once
        await window.electron.saveSettings(settings);

        // Clear pending queue
        Object.keys(pendingSettings).forEach((k) => delete pendingSettings[k]);
      } catch (error) {
        console.error("Error saving batched settings:", error);
        showNotification("Error saving settings", true);
      }
    }, 300); // 300ms debounce delay
    }


    // HOT-RELOAD: If this is a global keybind, update running macros instantly
    if (key.startsWith("global-")) {
      await updateRunningMacros(key);
    }
    // HOT-RELOAD: If this is a macro-specific setting, update it
    else if (key.includes("-")) {
      await updateRunningMacroSettings(key);
    }
  } catch (error) {
    console.error("Error saving setting:", error);
    showNotification("Error saving setting", true);
  }
}

// Update running macros when their specific settings change (toggles, delays, triggers)
async function updateRunningMacroSettings(changedKey) {
  // Determine which macro this setting belongs to
  const macroType = changedKey.split("-")[0]; // e.g., 'drag' from 'drag-sprint'

  // Check if this macro is currently running
  if (macroStates[macroType]) {

    // Re-gather all settings for this macro
    const updatedSettings = await gatherMacroSettings(macroType);

    // Validate the settings
    const errors = validateMacroSettings(macroType, updatedSettings);
    if (errors.length > 0) {
      console.warn(`Cannot hot-reload ${macroType}: ${errors.join(", ")}`);
      return;
    }

    // CRITICAL: Stop then restart to apply new settings
    try {
      // Stop the macro first
      await window.electron.stopMacro(macroType);

      // Wait a moment for AHK to fully unregister
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Restart with new settings
      const result = await window.electron.startMacro(
        macroType,
        updatedSettings,
      );

      if (result.success) {
        // Notification removed - silent update
      } else {
        console.error(`Failed to restart ${macroType}:`, result.error);
        showNotification(`Error updating ${macroType}`, true);
        macroStates[macroType] = false;
      }
    } catch (error) {
      console.error(`Error hot-reloading ${macroType} settings:`, error);
      showNotification(`Error updating ${macroType}`, true);
      macroStates[macroType] = false;
    }
  }
}

// Update running macros when global keybinds change
async function updateRunningMacros(changedKey) {
  // Map which macros use which global keys
  const affectedMacros = {
    "global-edit-key": ["drag", "double", "shotgun"],
    "global-select-key": ["drag", "double"],
    "global-place-key": ["turbo"],
    "global-wall-key": ["turbo"],
    "global-floor-key": ["turbo"],
    "global-stair-key": ["turbo"],
    "global-cone-key": ["turbo"],
    "global-sprint-key": ["drag", "double"],
    "global-pickup-key": ["pickup"],
  };

  const macrosToUpdate = affectedMacros[changedKey] || [];

  for (const macroType of macrosToUpdate) {
    // Check if this macro is currently running
    if (macroStates[macroType]) {

      // Re-gather all settings for this macro
      const updatedSettings = await gatherMacroSettings(macroType);

      // Validate the settings
      const errors = validateMacroSettings(macroType, updatedSettings);
      if (errors.length > 0) {
        console.warn(`Cannot hot-reload ${macroType}: ${errors.join(", ")}`);
        continue;
      }

      // CRITICAL FIX: Stop then restart to clear old hotkeys
      try {
        // Stop the macro first to unregister old hotkeys
        await window.electron.stopMacro(macroType);

        // Wait for AHK to fully unregister hotkeys (increased from 20ms to 100ms for reliability)
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Restart with new settings
        const result = await window.electron.startMacro(
          macroType,
          updatedSettings,
        );

        if (result.success) {
          // Notification removed - silent update
        } else {
          console.error(`Failed to restart ${macroType}:`, result.error);
          showNotification(`Error updating ${macroType}`, true);
          macroStates[macroType] = false;
        }
      } catch (error) {
        console.error(`Error hot-reloading ${macroType} macro:`, error);
        showNotification(`Error updating ${macroType}`, true);
        macroStates[macroType] = false;
      }
    }
  }
}

// Gather macro settings
async function gatherMacroSettings(type) {
  const settings = {};

  // First, load saved settings to get global keybinds from Keybinds tab
  const savedSettings = await window.electron.loadSettings();

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

  // Map global keybinds to macro-specific keys
  globalKeybindKeys.forEach((globalKey) => {
    const value = savedSettings[globalKey];
    if (
      value &&
      value !== "" &&
      value !== "SELECT" &&
      value !== "SELECT BIND"
    ) {

      // Map to macro-specific keys
      switch (globalKey) {
        case "global-edit-key":
          settings["drag-main-key"] = value;
          settings["double-key1"] = value;
          settings["shotgun-edit"] = value;
          break;
        case "global-select-key":
          settings["drag-select-key"] = value;
          settings["double-key2"] = value;
          break;
        case "global-place-key":
          settings["turbo-place"] = value;
          break;
        case "global-wall-key":
          settings["turbo-wall"] = value;
          break;
        case "global-floor-key":
          settings["turbo-floor"] = value;
          break;
        case "global-stair-key":
          settings["turbo-ramp"] = value;
          break;
        case "global-cone-key":
          settings["turbo-cone"] = value;
          break;
        case "global-sprint-key":
          settings["drag-sprint-key"] = value;
          settings["double-sprint-key"] = value;
          break;
        case "global-pickup-key":
          settings["pickup-spam"] = value;
          break;
        default:
          // Unknown global key - no action needed
          break;
      }
    } else {
      console.warn(
        `⚠️ Skipping invalid or unset global keybind ${globalKey}: "${value}"`,
      );
    }
  });

  // Then gather macro-specific settings (delays, toggles, trigger keys)
  const elements = document.querySelectorAll(`[id^="${type}-"]`);

  elements.forEach((el) => {
    if (el.type === "checkbox") {
      settings[el.id] = el.checked;
    } else if (el.type === "range" || el.type === "number") {
      settings[el.id] = parseInt(el.value);
    } else if (el.type === "color") {
      // For color picker, remove # and store hex value
      settings[el.id] = el.value.replace("#", "");
    } else if (el.type === "select-one") {
      // For dropdown/select elements
      settings[el.id] = el.value;
    } else if (
      el.classList.contains("key-button") ||
      el.classList.contains("keybind-button")
    ) {
      const text = el.textContent.trim();
      // FIXED: Correctly filter out ACTUAL waiting state text 'PRESS KEY...' instead of wrong text
      if (
        text !== "SELECT" &&
        text !== "SELECT BIND" &&
        text !== "PRESS KEY..." &&
        text !== "SELECT SPRINT KEY" &&
        text !== "" &&
        text.length > 0
      ) {
        settings[el.id] = text.toLowerCase();
      } else {
        // Don't override if already set from global
        if (!settings[el.id]) {
          settings[el.id] = "";
        }
      }
    }
  });

  return settings;
}

// Validate macro settings
function validateMacroSettings(type, settings) {
  const errors = [];

  // Helper function to check if a key value is valid
  const isValidKey = (key) => {
    return (
      key &&
      key !== "" &&
      key !== "select" &&
      key !== "select bind" &&
      key !== "press key..." &&
      key !== "select sprint key" &&
      key.trim().length > 0
    );
  };

  switch (type) {
    case "drag":
      if (!isValidKey(settings["drag-main-key"])) {
        errors.push("Main Edit Key is required (set in Keybinds tab)");
        console.warn("❌ drag-main-key invalid:", settings["drag-main-key"]);
      }
      if (!isValidKey(settings["drag-select-key"])) {
        errors.push("Select Edit Key is required (set in Keybinds tab)");
        console.warn(
          "❌ drag-select-key invalid:",
          settings["drag-select-key"],
        );
      }
      if (settings["drag-sprint"] === true) {
        if (!isValidKey(settings["drag-sprint-key"])) {
          errors.push(
            "Sprint Key is required when Auto-Sprint is enabled (set in Keybinds tab)",
          );
          console.warn(
            "❌ drag-sprint-key invalid:",
            settings["drag-sprint-key"],
          );
        }
      }
      break;

    case "turbo":
      if (!isValidKey(settings["turbo-place"])) {
        errors.push("Place Button is required (set in Keybinds tab)");
        console.warn("❌ turbo-place invalid:", settings["turbo-place"]);
      }
      const hasBuild =
        isValidKey(settings["turbo-wall"]) ||
        isValidKey(settings["turbo-floor"]) ||
        isValidKey(settings["turbo-ramp"]) ||
        isValidKey(settings["turbo-cone"]);
      if (!hasBuild) {
        errors.push(
          "At least one build piece is required (set in Keybinds tab)",
        );
        console.warn("❌ No valid build pieces set");
      }
      break;

    case "double":
      if (!isValidKey(settings["double-trigger"])) {
        errors.push("Trigger Key is required");
        console.warn("❌ double-trigger invalid:", settings["double-trigger"]);
      }
      if (!isValidKey(settings["double-key1"])) {
        errors.push("Main Edit Key is required (set in Keybinds tab)");
        console.warn("❌ double-key1 invalid:", settings["double-key1"]);
      }
      if (!isValidKey(settings["double-key2"])) {
        errors.push("Select Key is required (set in Keybinds tab)");
        console.warn("❌ double-key2 invalid:", settings["double-key2"]);
      }
      if (settings["double-sprint"] === true) {
        if (!isValidKey(settings["double-sprint-key"])) {
          errors.push(
            "Sprint Key is required when Auto-Sprint is enabled (set in Keybinds tab)",
          );
          console.warn(
            "❌ double-sprint-key invalid:",
            settings["double-sprint-key"],
          );
        }
      }
      break;

    case "pickup":
      if (!isValidKey(settings["pickup-trigger"])) {
        errors.push("Trigger Key is required");
        console.warn("❌ pickup-trigger invalid:", settings["pickup-trigger"]);
      }
      if (!isValidKey(settings["pickup-spam"])) {
        errors.push("Pick Up Key is required (set in Keybinds tab)");
        console.warn("❌ pickup-spam invalid:", settings["pickup-spam"]);
      }
      break;

    case "shotgun":
      if (!isValidKey(settings["shotgun-edit"])) {
        errors.push("Edit Key is required (set in Keybinds tab)");
        console.warn("❌ shotgun-edit invalid:", settings["shotgun-edit"]);
      }
      if (!isValidKey(settings["shotgun-select1"])) {
        errors.push("Select Tiles Key #1 is required");
        console.warn(
          "❌ shotgun-select1 invalid:",
          settings["shotgun-select1"],
        );
      }
      break;

    case "crouch":
      if (!isValidKey(settings["crouch-key"])) {
        errors.push("Crouch Key is required");
        console.warn("❌ crouch-key invalid:", settings["crouch-key"]);
      }
      break;

    default:
      // Unknown macro type - no validation needed
      break;
  }

  return errors;
}

// Start macro
async function startMacro(type) {
  try {
    // Check if already running
    if (macroStates[type]) {
      return;
    }

    // Gather settings
    const settings = await gatherMacroSettings(type);

    // Validate settings
    const errors = validateMacroSettings(type, settings);
    if (errors.length > 0) {
      showNotification(`Error: ${errors[0]}`, true);
      console.error("Validation errors:", errors);
      return;
    }


    // Send to backend
    const result = await window.electron.startMacro(type, settings);

    if (result.success) {
      macroStates[type] = true;

      // Update visual indicators
      const indicator = document.getElementById(`${type}-indicator`);
      if (indicator) {
        indicator.classList.add("active");
      }

      const status = document.getElementById(`${type}-status`);
      if (status) {
        let statusText = `ACTIVE - Macro running`;
        if (type === "drag" && settings["drag-sprint"]) {
          statusText += " (Auto-Sprint: ON)";
        } else if (type === "double" && settings["double-sprint"]) {
          statusText += " (Auto-Sprint: ON)";
        }
        status.textContent = statusText;
        // Use custom color from localStorage if available
        const customColor = localStorage.getItem("customColor") || "#dc2626";
        status.style.color = customColor;
      }

      // Start runtime counter
      startRuntimeCounter(type);

    } else {
      showNotification(
        `Error starting macro: ${result.error || "Unknown error"}`,
        true,
      );
      console.error("Failed to start macro:", result.error);
    }
  } catch (error) {
    console.error("Error starting macro:", error);
    showNotification(`Error starting macro: ${error.message}`, true);
  }
}

// Stop macro
async function stopMacro(type) {
  try {
    const result = await window.electron.stopMacro(type);

    if (result.success) {
      macroStates[type] = false;

      // Update visual indicators
      const indicator = document.getElementById(`${type}-indicator`);
      if (indicator) {
        indicator.classList.remove("active");
      }

      const status = document.getElementById(`${type}-status`);
      if (status) {
        status.textContent = "Stopped";
        status.style.color = ""; // Remove inline style to use CSS default
      }

      // Stop runtime counter
      stopRuntimeCounter(type);

    } else {
      showNotification(
        `Error stopping macro: ${result.error || "Unknown error"}`,
        true,
      );
    }
  } catch (error) {
    console.error("Error stopping macro:", error);
    showNotification("Error stopping macro!", true);
  }
}

// Start runtime counter for a macro
function startRuntimeCounter(type) {
  // Initialize runtime tracking if it doesn't exist
  if (!macroRuntimes[type]) {
    macroRuntimes[type] = { startTime: null, interval: null };
  }
  // Clear any existing interval
  if (macroRuntimes[type].interval) {
    clearInterval(macroRuntimes[type].interval);
  }

  // Set start time
  macroRuntimes[type].startTime = Date.now();

  // Show runtime display
  const runtimeDisplay = document.getElementById(`${type}-runtime`);
  if (runtimeDisplay) {
    runtimeDisplay.style.display = "block";
  }

  // Update every second
  macroRuntimes[type].interval = setInterval(() => {
    updateRuntimeDisplay(type);
  }, 1000);

  // Initial update
  updateRuntimeDisplay(type);
}

// Stop runtime counter for a macro
function stopRuntimeCounter(type) {
  if (!macroRuntimes[type]) {
    macroRuntimes[type] = { startTime: null, interval: null };
  }
  if (macroRuntimes[type].interval) {
    clearInterval(macroRuntimes[type].interval);
    macroRuntimes[type].interval = null;
  }

  macroRuntimes[type].startTime = null;

  // Hide runtime display
  const runtimeDisplay = document.getElementById(`${type}-runtime`);
  if (runtimeDisplay) {
    runtimeDisplay.style.display = "none";
  }
}

// Update runtime display
function updateRuntimeDisplay(type) {
  if (!macroRuntimes[type].startTime) {
    return;
  }

  const elapsed = Math.floor(
    (Date.now() - macroRuntimes[type].startTime) / 1000,
  );
  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;

  let timeString;
  if (hours > 0) {
    timeString = `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    timeString = `${minutes}m ${seconds}s`;
  } else {
    timeString = `${seconds}s`;
  }

  const runtimeDisplay = document.getElementById(`${type}-runtime`);
  if (runtimeDisplay) {
    runtimeDisplay.textContent = `Runtime: ${timeString}`;
  }
}

// Save macro settings
async function saveMacro(type) {
  try {
    const settings = await gatherMacroSettings(type);
    const allSettings = await window.electron.loadSettings();

    // Merge with existing settings
    Object.assign(allSettings, settings);

    const result = await window.electron.saveSettings(allSettings);

    if (result.success) {
    } else {
      showNotification(
        `Error saving settings: ${result.error || "Unknown error"}`,
        true,
      );
    }
  } catch (error) {
    console.error("Error saving settings:", error);
    showNotification("Error saving settings!", true);
  }
}

// Clear macro settings
async function clearMacro(type) {
  try {
    // Stop macro if running
    if (macroStates[type]) {
      await stopMacro(type);
      // Wait a bit for the stop to complete
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // Clear UI
    const buttons = document.querySelectorAll(`[id^="${type}-"]`);
    buttons.forEach((button) => {
      if (button.classList.contains("key-button")) {
        if (button.id.includes("sprint-key")) {
          button.textContent = "SELECT SPRINT KEY";
        } else if (
          button.id.includes("select") ||
          button.id.includes("key") ||
          button.id.includes("trigger")
        ) {
          button.textContent = "SELECT";
        } else {
          button.textContent = "SELECT BIND";
        }
      } else if (button.type === "range") {
        button.value = button.min || 0;
        updateSliderValue(button.id);
      } else if (button.type === "checkbox") {
        button.checked = false;
      } else if (button.type === "number") {
        button.value = 2;
      }
    });

    // Clear from settings
    const allSettings = await window.electron.loadSettings();
    Object.keys(allSettings).forEach((key) => {
      if (key.startsWith(`${type}-`)) {
        delete allSettings[key];
      }
    });
    await window.electron.saveSettings(allSettings);

    await window.electron.clearMacro(type);
  } catch (error) {
    console.error("Error clearing macro:", error);
    showNotification("Error clearing macro!", true);
  }
}

// Show notification
function showNotification(message, isError = false) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${isError ? "rgba(239, 68, 68, 0.9)" : "rgba(34, 197, 94, 0.9)"};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 150);
  }, 3000);
}

// Add CSS for notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Handle window close
window.addEventListener("beforeunload", async (_e) => {
  // Check if any macros are active
  const hasActiveMacros = Object.values(macroStates).some((state) => state);

  if (hasActiveMacros) {
    // Stop all active macros
    for (const [type, active] of Object.entries(macroStates)) {
      if (active) {
        try {
          await window.electron.stopMacro(type);
        } catch (error) {
          console.error(`Error stopping ${type} macro:`, error);
        }
      }
    }
  }
});

// ============================================================================
// STARTUP MANAGEMENT
// ============================================================================

// Toggle startup setting (reserved for future use)
// eslint-disable-next-line no-unused-vars
async function toggleStartup(enabled) {
  try {
    const result = await window.electron.setStartup(enabled);
    if (result.success) {
      showNotification(
        enabled ? "App will start on system startup" : "Startup disabled",
        false,
      );
    } else {
      showNotification("Error changing startup setting", true);
    }
  } catch (error) {
    console.error("Error toggling startup:", error);
    showNotification("Error changing startup setting", true);
  }
}

// Load startup setting
async function loadStartupSetting() {
  try {
    const isEnabled = await window.electron.getStartup();
    const toggle = document.getElementById("startup-toggle");
    if (toggle) {
      toggle.checked = isEnabled;
    }
  } catch (error) {
    console.error("Error loading startup setting:", error);
  }
}
