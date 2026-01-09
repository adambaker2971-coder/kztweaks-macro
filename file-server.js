/**
 * File Server - Serves all Electron app files from Railway
 * This makes ALL files come from Railway, not bundled in the app
 */

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// This will be used as a router function
function createFileServerRouter() {
  const express = require('express');
  const router = express.Router();

// Files that should be served from Railway
const SERVEABLE_FILES = [
  // Core files
  'main.js',
  'preload.js',
  'renderer.js',
  'auth.js',
  'constants.js',
  'validation.js',
  'utils.js',
  'loading.js',
  
  // Protection files
  'anti-re.js',
  'anti-debug-client.js',
  'advanced-protection.js',
  'advanced-cache.js',
  'advanced-logger.js',
  'eac-evasion.js',
  'stealth-process.js',
  'memory-protection.js',
  'string-obfuscator.js',
  'anti-signature-loader.js',
  'loader-wrapper.js',
  
  // Other files
  'startup-checker.js',
  'analytics.js',
  'error-recovery.js',
  'performance-monitor.js',
  'remote-code-loader.js',
  
  // UI files
  'kaizen_gui.html',
  'styles.css',
  'gui_settings.json',
];

// Store file contents in memory (in production, use database or file system)
const fileCache = new Map();

/**
 * Load files from local directory (for Railway deployment)
 * In production, these files should be in the Railway server
 */
function loadFiles() {
  // Try multiple paths: Railway root, files folder, or current directory
  const possibleDirs = [
    path.join(__dirname, '../'),  // Parent directory (if files are there)
    __dirname,                    // Current directory
    process.cwd()                 // Working directory
  ];
  
  let filesDir = null;
  for (const dir of possibleDirs) {
    // Check if main.js exists in this directory
    if (fs.existsSync(path.join(dir, 'main.js'))) {
      filesDir = dir;
      break;
    }
  }
  
  if (!filesDir) {
    console.warn('⚠️ Could not find app files directory. Files will not be served.');
    return;
  }
  
  console.log(`📁 Loading files from: ${filesDir}`);
  
  SERVEABLE_FILES.forEach(filename => {
    const filePath = path.join(filesDir, filename);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const hash = crypto.createHash('sha256').update(content).digest('hex');
        fileCache.set(filename, {
          content,
          hash,
          size: content.length,
          lastModified: fs.statSync(filePath).mtime
        });
        console.log(`✅ Loaded file: ${filename} (${content.length} bytes)`);
      } catch (error) {
        console.error(`❌ Error loading ${filename}:`, error.message);
      }
    } else {
      console.warn(`⚠️ File not found: ${filename}`);
    }
  });
}

// Load files on startup
loadFiles();

/**
 * Get file endpoint
 * Serves encrypted file content
 */
router.get('/api/files/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const { sessionToken, hwid } = req.query;

    // Validate session (you can add session validation here)
    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        message: 'Session token required'
      });
    }

    // Check if file exists
    if (!fileCache.has(filename)) {
      return res.status(404).json({
        success: false,
        message: `File ${filename} not found`
      });
    }

    const fileData = fileCache.get(filename);
    
    // Encrypt file content
    const { encryptedContent, iv } = encryptFile(fileData.content, sessionToken);

    console.log(`📦 Served file: ${filename} to HWID: ${hwid?.substring(0, 8)}...`);

    res.json({
      success: true,
      filename,
      encryptedContent,
      iv,
      hash: fileData.hash,
      size: fileData.size,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('File serve error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to serve file'
    });
  }
});

/**
 * Get file list endpoint
 */
router.get('/api/files', async (req, res) => {
  try {
    const { sessionToken } = req.query;

    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        message: 'Session token required'
      });
    }

    const fileList = Array.from(fileCache.keys()).map(filename => {
      const fileData = fileCache.get(filename);
      return {
        filename,
        hash: fileData.hash,
        size: fileData.size
      };
    });

    res.json({
      success: true,
      files: fileList,
      count: fileList.length
    });
  } catch (error) {
    console.error('File list error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get file list'
    });
  }
});

/**
 * Encrypt file content
 */
function encryptFile(content, key) {
  const keyHash = crypto.createHash('sha256').update(key).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', keyHash, iv);
  
  let encrypted = cipher.update(content, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    encryptedContent: encrypted,
    iv: iv.toString('hex')
  };
}

  return router;
}

module.exports = createFileServerRouter;
