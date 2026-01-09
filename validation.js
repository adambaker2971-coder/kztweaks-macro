/**
 * Input Validation Module
 * Provides validation functions for user inputs, settings, and configurations
 */

const CONSTANTS = require("./constants");

/**
 * Validates a key binding string
 * @param {string} key - The key binding to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidKey(key) {
  if (!key || typeof key !== "string") {
    return false;
  }

  const trimmed = key.trim();
  if (trimmed.length === 0) {
    return false;
  }

  // Check against allowed key pattern
  return CONSTANTS.VALIDATION.ALLOWED_KEY_PATTERN.test(trimmed);
}

/**
 * Validates macro delay value
 * @param {number} delay - The delay value to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidDelay(delay) {
  const num = Number(delay);
  return (
    !isNaN(num) &&
    num >= CONSTANTS.VALIDATION.MIN_DELAY &&
    num <= CONSTANTS.VALIDATION.MAX_DELAY
  );
}

/**
 * Validates macro speed value
 * @param {number} speed - The speed value to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidSpeed(speed) {
  const num = Number(speed);
  return (
    !isNaN(num) &&
    num >= CONSTANTS.VALIDATION.MIN_SPEED &&
    num <= CONSTANTS.VALIDATION.MAX_SPEED
  );
}

/**
 * Validates a macro type
 * @param {string} type - The macro type to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidMacroType(type) {
  return Object.values(CONSTANTS.MACRO_TYPES).includes(type);
}

/**
 * Validates a performance mode
 * @param {string} mode - The performance mode to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidPerformanceMode(mode) {
  return Object.values(CONSTANTS.PERFORMANCE).includes(mode);
}

/**
 * Validates license key format
 * @param {string} key - The license key to validate
 * @returns {boolean} True if format is valid, false otherwise
 */
function isValidLicenseKeyFormat(key) {
  if (!key || typeof key !== "string") {
    return false;
  }

  const trimmed = key.trim();
  // License keys should be non-empty strings (actual validation happens server-side)
  return trimmed.length > 0 && trimmed.length < 100;
}

/**
 * Sanitizes a string by removing potentially dangerous characters
 * @param {string} input - The string to sanitize
 * @returns {string} Sanitized string
 */
function sanitizeString(input) {
  if (typeof input !== "string") {
    return "";
  }

  // Remove null bytes, carriage returns, and other control characters
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
}

/**
 * Validates macro settings object
 * @param {object} settings - The settings object to validate
 * @param {string} macroType - The type of macro these settings are for
 * @returns {{valid: boolean, errors: string[]}} Validation result
 */
function validateMacroSettings(settings, macroType) {
  const errors = [];

  if (!settings || typeof settings !== "object") {
    return { valid: false, errors: ["Settings must be an object"] };
  }

  if (!isValidMacroType(macroType)) {
    errors.push(`Invalid macro type: ${macroType}`);
    return { valid: false, errors };
  }

  // Type-specific validation
  switch (macroType) {
    case CONSTANTS.MACRO_TYPES.DRAG:
      if (!isValidKey(settings["drag-main-key"])) {
        errors.push("Drag macro requires valid main key");
      }
      if (!isValidKey(settings["drag-select-key"])) {
        errors.push("Drag macro requires valid select key");
      }
      if (
        settings["drag-delay"] !== undefined &&
        !isValidDelay(settings["drag-delay"])
      ) {
        errors.push("Invalid drag delay value");
      }
      break;

    case CONSTANTS.MACRO_TYPES.TURBO:
      if (!isValidKey(settings["turbo-place"])) {
        errors.push("Turbo macro requires valid place key");
      }
      if (
        settings["turbo-speed"] !== undefined &&
        !isValidSpeed(settings["turbo-speed"])
      ) {
        errors.push("Invalid turbo speed value");
      }
      break;

    case CONSTANTS.MACRO_TYPES.DOUBLE:
      if (!isValidKey(settings["double-trigger"])) {
        errors.push("Double edit requires valid trigger key");
      }
      if (!isValidKey(settings["double-key1"])) {
        errors.push("Double edit requires valid key1");
      }
      if (!isValidKey(settings["double-key2"])) {
        errors.push("Double edit requires valid key2");
      }
      break;

    case CONSTANTS.MACRO_TYPES.PICKUP:
      if (!isValidKey(settings["pickup-trigger"])) {
        errors.push("Pickup macro requires valid trigger key");
      }
      if (
        settings["pickup-speed"] !== undefined &&
        !isValidSpeed(settings["pickup-speed"])
      ) {
        errors.push("Invalid pickup speed value");
      }
      break;

    case CONSTANTS.MACRO_TYPES.SHOTGUN:
      if (!isValidKey(settings["shotgun-edit"])) {
        errors.push("Shotgun macro requires valid edit key");
      }
      break;

    case CONSTANTS.MACRO_TYPES.CROUCH:
      if (!isValidKey(settings["crouch-key"])) {
        errors.push("Crouch macro requires valid crouch key");
      }
      break;

    default:
      errors.push("Unknown macro type");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates file path for security (prevent path traversal)
 * @param {string} filePath - The file path to validate
 * @returns {boolean} True if safe, false otherwise
 */
function isSafeFilePath(filePath) {
  if (!filePath || typeof filePath !== "string") {
    return false;
  }

  // Prevent path traversal attacks
  const dangerous = ["../", "..\\", "..", "~"];
  return !dangerous.some((pattern) => filePath.includes(pattern));
}

module.exports = {
  isValidKey,
  isValidDelay,
  isValidSpeed,
  isValidMacroType,
  isValidPerformanceMode,
  isValidLicenseKeyFormat,
  sanitizeString,
  validateMacroSettings,
  isSafeFilePath,
};
