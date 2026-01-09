/**
 * Utility Functions Module
 * Common helper functions used throughout the application
 */

/**
 * Delays execution for a specified number of milliseconds
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>} Promise that resolves after the delay
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounces a function call
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Formats bytes to human-readable string
 * @param {number} bytes - Number of bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted string (e.g., "1.5 MB")
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Safely parses JSON with fallback
 * @param {string} jsonString - The JSON string to parse
 * @param {*} fallback - Value to return if parsing fails
 * @returns {*} Parsed object or fallback value
 */
function safeJsonParse(jsonString, fallback = null) {
  try {
    return JSON.parse(jsonString);
  } catch (_error) {
    return fallback;
  }
}

/**
 * Safely stringifies an object to JSON
 * @param {*} obj - The object to stringify
 * @param {number} spaces - Number of spaces for indentation
 * @returns {string|null} JSON string or null if error
 */
function safeJsonStringify(obj, spaces = 2) {
  try {
    return JSON.stringify(obj, null, spaces);
  } catch (_error) {
    return null;
  }
}

/**
 * Retries an async function with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise<*>} Result of the function
 * @throws {Error} If all retries fail
 */
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      const delayMs = baseDelay * Math.pow(2, i);
      await delay(delayMs);
    }
  }
}

/**
 * Clamps a number between min and max values
 * @param {number} num - The number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 * Checks if an object is empty
 * @param {object} obj - The object to check
 * @returns {boolean} True if empty, false otherwise
 */
function isEmptyObject(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * Deep clones an object
 * @param {*} obj - The object to clone
 * @returns {*} Cloned object
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item));
  }

  if (obj instanceof Object) {
    const clonedObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

/**
 * Generates a unique ID
 * @returns {string} Unique identifier
 */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Formats a timestamp to readable date string
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted date string
 */
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

/**
 * Throttles a function call
 * @param {Function} func - The function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Escapes HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

module.exports = {
  delay,
  debounce,
  formatBytes,
  safeJsonParse,
  safeJsonStringify,
  retryWithBackoff,
  clamp,
  isEmptyObject,
  deepClone,
  generateId,
  formatTimestamp,
  throttle,
  escapeHtml,
};
