/**
 * Loader Wrapper - Entry Point Obfuscation
 * This file wraps the main application to prevent signature detection
 * The actual main.js is loaded through dynamic require with randomization
 */

// Load Electron and required modules first (standard entry point)
const { app } = require("electron");

const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

// Generate unique identifiers per execution
const LOADER_ID = crypto.randomBytes(12).toString("hex");
const LOADER_TIMESTAMP = Date.now();
const LOADER_RANDOM = Math.random().toString(36).substring(7);

// Anti-signature patterns
const ANTI_SIG_PATTERNS = {
  delay: Math.floor(Math.random() * 100) + 50,
  junkOps: Math.floor(Math.random() * 5) + 3,
  decoyFiles: Math.floor(Math.random() * 3)
};

// Decoy file operations (looks like normal app behavior)
function performDecoyOperations() {
  try {
    const tempDir = require("os").tmpdir();
    const decoyFile = path.join(tempDir, `${LOADER_ID}.tmp`);
    
    // Create and immediately delete decoy file
    fs.writeFileSync(decoyFile, LOADER_ID);
    setTimeout(() => {
      try {
        if (fs.existsSync(decoyFile)) {
          fs.unlinkSync(decoyFile);
        }
      } catch (e) {
        // Ignore
      }
    }, 100);
  } catch (e) {
    // Ignore errors
  }
}

// Randomize module loading
function loadMainWithRandomization() {
  // Add random delay
  if (ANTI_SIG_PATTERNS.delay > 0) {
    const start = Date.now();
    while (Date.now() - start < ANTI_SIG_PATTERNS.delay) {
      // Busy wait
    }
  }
  
  // Perform decoy operations
  performDecoyOperations();
  
  // Random string operations (decoy)
  const decoyVar1 = crypto.randomBytes(16).toString("hex");
  const decoyVar2 = crypto.randomBytes(16).toString("hex");
  const decoyResult = Buffer.from(decoyVar1 + decoyVar2).toString("base64").substring(0, 10);
  
  // Random require path manipulation
  const mainPath = path.join(__dirname, "main.js");
  const altPaths = [
    path.join(__dirname, "main.js"),
    path.join(process.cwd(), "main.js"),
    require.resolve("./main.js")
  ];
  
  // Use random path resolution method
  const selectedPath = altPaths[Math.floor(Math.random() * altPaths.length)];
  
  // Dynamic require with error handling
  try {
    // Load anti-signature module first
    try {
      require("./anti-signature-loader.js");
    } catch (e) {
      // Continue if anti-signature module doesn't exist
    }
    
    // Load main application
    require(selectedPath);
  } catch (error) {
    // Fallback: direct require
    require(mainPath);
  }
}

// For Electron, we need to load main.js directly but with randomization
// The wrapper pattern doesn't work well with Electron's entry point system
// Instead, we'll inject randomization into main.js itself

// Load anti-signature module first
try {
  require("./anti-signature-loader.js");
} catch (e) {
  // Continue if module doesn't exist
}

// Execute decoy operations before loading main
performDecoyOperations();

// Add random delay
if (ANTI_SIG_PATTERNS.delay > 0) {
  const start = Date.now();
  while (Date.now() - start < ANTI_SIG_PATTERNS.delay) {
    // Busy wait
  }
}

// Now load the actual main.js (which Electron will load anyway)
// But we've already randomized the environment

// Export for potential external use
module.exports = {
  LOADER_ID,
  loadMainWithRandomization
};

