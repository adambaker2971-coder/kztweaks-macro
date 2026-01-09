/**
 * Backend API Server for Electron App
 * Deploy this to Railway to provide backend services
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Secret key for encryption (store in Railway environment variables)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const API_SECRET = process.env.API_SECRET || crypto.randomBytes(32).toString('hex');

// Session storage (in production, use Redis or database)
const activeSessions = new Map();
const SESSION_TIMEOUT = 3600000; // 1 hour

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Electron App Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Example: Analytics endpoint
app.post('/api/analytics', (req, res) => {
  try {
    const { event, data, userId, timestamp } = req.body;
    
    // Log analytics event
    console.log('Analytics Event:', {
      event,
      data,
      userId,
      timestamp: timestamp || new Date().toISOString()
    });

    // Here you could save to a database
    // For now, just acknowledge receipt
    res.json({
      success: true,
      message: 'Analytics event recorded',
      eventId: Date.now().toString()
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record analytics event'
    });
  }
});

// Example: Settings sync endpoint
app.post('/api/settings/sync', (req, res) => {
  try {
    const { userId, settings } = req.body;
    
    // Here you would save settings to a database
    // For now, just acknowledge receipt
    res.json({
      success: true,
      message: 'Settings synced',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Settings sync error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to sync settings'
    });
  }
});

app.get('/api/settings/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    // Here you would fetch settings from a database
    // For now, return empty settings
    res.json({
      success: true,
      settings: {},
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Settings fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch settings'
    });
  }
});

// Example: License validation proxy (if needed)
app.post('/api/license/validate', async (req, res) => {
  try {
    const { licenseKey, hwid } = req.body;
    
    // This is just an example - you might want to proxy to KeyAuth
    // or implement your own validation logic
    res.json({
      success: false,
      message: 'License validation should be done client-side with KeyAuth'
    });
  } catch (error) {
    console.error('License validation error:', error);
    res.status(500).json({
      success: false,
      message: 'License validation failed'
    });
  }
});

// ============================================================================
// REMOTE CODE LOADER ENDPOINTS - CRITICAL FOR ANTI-CRACK PROTECTION
// ============================================================================

/**
 * Authenticate and get session token for remote code access
 */
app.post('/api/remote-code/auth', async (req, res) => {
  try {
    const { hwid, licenseKey, appVersion, timestamp } = req.body;

    // Validate request
    if (!hwid || !licenseKey) {
      return res.status(400).json({
        success: false,
        message: 'HWID and license key required'
      });
    }

    // TODO: Validate license key with KeyAuth or your own system
    // For now, basic validation
    if (licenseKey.length < 10) {
      return res.status(401).json({
        success: false,
        message: 'Invalid license key'
      });
    }

    // Generate session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + SESSION_TIMEOUT;

    // Store session
    activeSessions.set(sessionToken, {
      hwid,
      licenseKey,
      appVersion,
      createdAt: Date.now(),
      expiresAt,
      lastAccess: Date.now()
    });

    // Clean up expired sessions
    cleanupExpiredSessions();

    console.log(`✅ Remote code auth successful for HWID: ${hwid.substring(0, 8)}...`);

    res.json({
      success: true,
      sessionToken,
      expiresAt,
      message: 'Authentication successful'
    });
  } catch (error) {
    console.error('Remote code auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
});

/**
 * Fetch encrypted code module
 */
app.post('/api/remote-code/fetch', async (req, res) => {
  try {
    const { moduleName, sessionToken, hwid } = req.body;

    // Validate session
    const session = activeSessions.get(sessionToken);
    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session'
      });
    }

    // Check session expiration
    if (Date.now() > session.expiresAt) {
      activeSessions.delete(sessionToken);
      return res.status(401).json({
        success: false,
        message: 'Session expired'
      });
    }

    // Verify HWID matches session
    if (session.hwid !== hwid) {
      return res.status(403).json({
        success: false,
        message: 'HWID mismatch'
      });
    }

    // Update last access
    session.lastAccess = Date.now();

    // Get the code module
    const codeModule = getCodeModule(moduleName);
    if (!codeModule) {
      return res.status(404).json({
        success: false,
        message: `Module ${moduleName} not found`
      });
    }

    // Encrypt the code
    const { encryptedCode, iv, hash } = encryptCode(codeModule.code, sessionToken);

    console.log(`📦 Served module: ${moduleName} to HWID: ${hwid.substring(0, 8)}...`);

    res.json({
      success: true,
      moduleName,
      encryptedCode,
      iv,
      hash,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Remote code fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch module'
    });
  }
});

/**
 * Get code module by name
 */
function getCodeModule(moduleName) {
  const modules = {
    'core-logic': {
      code: `
        // Core Logic Module - Critical application logic
        // This code runs on the client but is fetched from server
        
        module.exports = {
          initialize: function() {
            console.log('✅ Core logic module loaded from server');
            return true;
          },
          
          validateExecution: function() {
            // Critical validation that must pass
            const timestamp = Date.now();
            const isValid = timestamp > 0; // Basic check
            if (!isValid) {
              throw new Error('Execution validation failed');
            }
            return true;
          },
          
          getCriticalValue: function() {
            // Critical value that crackers can't modify
            return '${crypto.randomBytes(16).toString('hex')}';
          }
        };
      `
    },
    'macro-engine': {
      code: `
        // Macro Engine Module - Critical macro execution logic
        module.exports = {
          executeMacro: function(type, settings) {
            // Critical macro execution code
            console.log('Executing macro:', type);
            return { success: true, executed: true };
          },
          
          validateMacroSettings: function(settings) {
            // Validation that prevents tampering
            if (!settings || typeof settings !== 'object') {
              return false;
            }
            return true;
          }
        };
      `
    },
    'security-module': {
      code: `
        // Security Module - Anti-tampering checks
        module.exports = {
          performSecurityCheck: function() {
            // Critical security checks
            const checksum = require('crypto').createHash('sha256')
              .update(process.execPath)
              .digest('hex');
            return { valid: true, checksum };
          },
          
          validateIntegrity: function() {
            // Integrity validation
            return true;
          }
        };
      `
    },
    'validation-module': {
      code: `
        // Validation Module - Runtime validation
        module.exports = {
          validateRuntime: function() {
            // Runtime environment validation
            const nodeVersion = process.versions.node;
            const isValid = parseFloat(nodeVersion) >= 14.0;
            return { valid: isValid, nodeVersion };
          },
          
          checkEnvironment: function() {
            // Environment checks
            return {
              valid: true,
              platform: process.platform,
              arch: process.arch
            };
          }
        };
      `
    }
  };

  return modules[moduleName];
}

/**
 * Encrypt code using AES-256-CBC
 */
function encryptCode(code, key) {
  const keyHash = crypto.createHash('sha256').update(key).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', keyHash, iv);
  
  let encrypted = cipher.update(code, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const hash = crypto.createHash('sha256').update(code).digest('hex');
  
  return {
    encryptedCode: encrypted,
    iv: iv.toString('hex'),
    hash
  };
}

/**
 * Clean up expired sessions
 */
function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [token, session] of activeSessions.entries()) {
    if (now > session.expiresAt) {
      activeSessions.delete(token);
    }
  }
}

// Cleanup expired sessions every 5 minutes
setInterval(cleanupExpiredSessions, 300000);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});
