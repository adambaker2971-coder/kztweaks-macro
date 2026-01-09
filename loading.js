/**
 * @file loading.js - Loading Screen and UI Feedback Utilities
 * @description Provides optimized loading screen, toast notifications, and button loading states
 * @version 12.0.0
 */

// ============================================================================
// OPTIMIZED LOADING SCREEN - Fast, skippable, reduced animations
// ============================================================================

let loadingSequenceStarted = false;

function startLoadingSequence() {
  if (loadingSequenceStarted) {
    return;
  }
  loadingSequenceStarted = true;

  const loadingScreen = document.getElementById("loading-screen");
  const loadingBar = document.querySelector(".loading-bar-fill");
  const loadingStatus = document.querySelector(".loading-status");
  const loadingPercentage = document.querySelector(".loading-percentage");

  if (!loadingScreen || !loadingBar) {
    console.error("Loading screen elements not found");
    return;
  }

  // Make loading screen skippable on click
  loadingScreen.addEventListener("click", skipLoadingScreen);

  // Add skip hint
  const skipHint = document.createElement("div");
  skipHint.className = "loading-skip-hint";
  skipHint.textContent = "Click anywhere to skip";
  loadingScreen.appendChild(skipHint);

  let progress = 0;
  const totalTime = 1500; // Reduced from 2000ms to 1500ms
  const interval = 30;
  const increment = (100 / totalTime) * interval;

  const progressInterval = setInterval(() => {
    progress += increment;

    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);

      // Auto-hide after completion
      setTimeout(() => {
        hideLoadingScreen();
      }, 300);
    }

    if (loadingPercentage) {
      loadingPercentage.textContent = `${Math.floor(progress)}%`;
    }

    // Update status text based on progress
    if (loadingStatus) {
      if (progress < 30) {
        loadingStatus.textContent = "Initializing engines...";
      } else if (progress < 60) {
        loadingStatus.textContent = "Loading components...";
      } else if (progress < 90) {
        loadingStatus.textContent = "Preparing interface...";
      } else {
        loadingStatus.textContent = "Ready!";
      }
    }
  }, interval);
}

function skipLoadingScreen() {
  hideLoadingScreen();
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.classList.add("fade-out");

    // Remove from DOM after animation
    setTimeout(() => {
      if (loadingScreen.parentNode) {
        loadingScreen.parentNode.removeChild(loadingScreen);
      }
    }, 500);
  }
}

// ============================================================================
// VISUAL FEEDBACK FOR ASYNC OPERATIONS
// ============================================================================

// Loading spinner for buttons
function showButtonLoading(buttonElement, originalText) {
  if (!buttonElement) {
    return;
  }

  buttonElement.disabled = true;
  buttonElement.dataset.originalText =
    originalText || buttonElement.textContent;

  // Add spinner
  const spinner = document.createElement("span");
  spinner.className = "button-spinner";
  spinner.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 50 50" style="animation: spin 0.6s linear infinite; margin-right: 6px;">
            <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"
                    stroke-dasharray="31.4 31.4" stroke-linecap="round"></circle>
        </svg>
    `;

  buttonElement.innerHTML = "";
  buttonElement.appendChild(spinner);
  buttonElement.appendChild(
    document.createTextNode(buttonElement.dataset.originalText),
  );

  // Add styles if not already present
  if (!document.getElementById("loading-styles")) {
    const style = document.createElement("style");
    style.id = "loading-styles";
    style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .button-spinner {
                display: inline-flex;
                align-items: center;
            }
            button:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }
        `;
    document.head.appendChild(style);
  }
}

function hideButtonLoading(buttonElement) {
  if (!buttonElement) {
    return;
  }

  buttonElement.disabled = false;

  const originalText = buttonElement.dataset.originalText;
  if (originalText) {
    buttonElement.textContent = originalText;
    delete buttonElement.dataset.originalText;
  }
}

// Toast notifications queue (max 3 visible)
const toastQueue = [];
let visibleToasts = 0;
const MAX_VISIBLE_TOASTS = 3;

function showToast(message, type = "info", duration = 3000) {
  const toast = {
    message,
    type, // 'info', 'success', 'error', 'warning'
    duration,
  };

  toastQueue.push(toast);
  processToastQueue();
}

function processToastQueue() {
  if (toastQueue.length === 0 || visibleToasts >= MAX_VISIBLE_TOASTS) {
    return;
  }

  const toast = toastQueue.shift();
  visibleToasts++;

  const toastElement = document.createElement("div");
  toastElement.className = `toast toast-${toast.type}`;
  toastElement.textContent = toast.message;

  // Styles
  toastElement.style.cssText = `
        position: fixed;
        top: ${20 + (visibleToasts - 1) * 70}px;
        right: 20px;
        background: ${getToastColor(toast.type)};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        max-width: 350px;
        word-wrap: break-word;
    `;

  document.body.appendChild(toastElement);

  // Auto-remove after duration
  setTimeout(() => {
    toastElement.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      toastElement.remove();
      visibleToasts--;
      processToastQueue(); // Process next toast in queue
    }, 300);
  }, toast.duration);
}

function getToastColor(type) {
  switch (type) {
    case "success":
      return "linear-gradient(135deg, #10b981, #059669)";
    case "error":
      return "linear-gradient(135deg, #ef4444, #dc2626)";
    case "warning":
      return "linear-gradient(135deg, #f59e0b, #d97706)";
    case "info":
    default:
      return "linear-gradient(135deg, #3b82f6, #2563eb)";
  }
}

// Add animation styles
if (!document.getElementById("toast-animations")) {
  const style = document.createElement("style");
  style.id = "toast-animations";
  style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
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
}

// Make functions globally available
window.startLoadingSequence = startLoadingSequence;
window.showButtonLoading = showButtonLoading;
window.hideButtonLoading = hideButtonLoading;
window.showToast = showToast;
