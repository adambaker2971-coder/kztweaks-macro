/**
 * @file analytics.js
 * @description Advanced analytics and telemetry system
 * Tracks usage patterns, performance metrics, and user behavior
 */

const fs = require("fs");
const path = require("path");
const { app } = require("electron");
const crypto = require("crypto");

class Analytics {
  constructor() {
    this.isActive = false;
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.events = [];
    this.maxEvents = 10000;
    this.userId = this.getOrCreateUserId();
    
    // Tracked metrics
    this.metrics = {
      sessions: 0,
      totalUptime: 0,
      macroUsage: {},
      featureUsage: {},
      errors: 0,
      performance: {
        averageResponseTime: 0,
        peakMemoryUsage: 0,
        averageCPUUsage: 0,
      },
    };

    // Event types
    this.eventTypes = {
      SESSION_START: "session_start",
      SESSION_END: "session_end",
      MACRO_START: "macro_start",
      MACRO_STOP: "macro_stop",
      MACRO_ERROR: "macro_error",
      FEATURE_USED: "feature_used",
      SETTING_CHANGED: "setting_changed",
      ERROR: "error",
      PERFORMANCE: "performance",
    };

    this.analyticsFile = null;
    this.initializeAnalyticsFile();
  }

  /**
   * Initialize analytics file
   */
  initializeAnalyticsFile() {
    try {
      const userDataPath = app.getPath("userData");
      const analyticsDir = path.join(userDataPath, "analytics");
      
      if (!fs.existsSync(analyticsDir)) {
        fs.mkdirSync(analyticsDir, { recursive: true });
      }

      this.analyticsFile = path.join(analyticsDir, "analytics.json");
      this.loadAnalytics();
    } catch (error) {
      console.error("Failed to initialize analytics file:", error);
    }
  }

  /**
   * Get or create user ID
   */
  getOrCreateUserId() {
    try {
      const userDataPath = app.getPath("userData");
      const userIdFile = path.join(userDataPath, "user_id.txt");
      
      if (fs.existsSync(userIdFile)) {
        return fs.readFileSync(userIdFile, "utf8").trim();
      } else {
        const userId = crypto.randomBytes(16).toString("hex");
        fs.writeFileSync(userIdFile, userId, "utf8");
        return userId;
      }
    } catch (error) {
      return crypto.randomBytes(16).toString("hex");
    }
  }

  /**
   * Generate session ID
   */
  generateSessionId() {
    return `${Date.now()}-${crypto.randomBytes(8).toString("hex")}`;
  }

  /**
   * Start analytics
   */
  start() {
    if (this.isActive) return;

    this.isActive = true;
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.metrics.sessions++;

    this.trackEvent(this.eventTypes.SESSION_START, {
      sessionId: this.sessionId,
      timestamp: this.startTime,
    });

    console.log("[Analytics] Analytics started");
  }

  /**
   * Stop analytics
   */
  stop() {
    if (!this.isActive) return;

    const sessionDuration = Date.now() - this.startTime;
    this.metrics.totalUptime += sessionDuration;

    this.trackEvent(this.eventTypes.SESSION_END, {
      sessionId: this.sessionId,
      duration: sessionDuration,
    });

    this.saveAnalytics();
    this.isActive = false;

    console.log("[Analytics] Analytics stopped");
  }

  /**
   * Track event
   */
  trackEvent(type, data = {}) {
    if (!this.isActive) return;

    const event = {
      id: crypto.randomBytes(8).toString("hex"),
      type: type,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      data: data,
    };

    this.events.push(event);

    // Maintain event history
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }

    // Update metrics based on event type
    this.updateMetrics(event);
  }

  /**
   * Update metrics based on event
   */
  updateMetrics(event) {
    switch (event.type) {
      case this.eventTypes.MACRO_START:
        const macroName = event.data.macro || "unknown";
        if (!this.metrics.macroUsage[macroName]) {
          this.metrics.macroUsage[macroName] = { starts: 0, stops: 0, errors: 0 };
        }
        this.metrics.macroUsage[macroName].starts++;
        break;

      case this.eventTypes.MACRO_STOP:
        const macroName2 = event.data.macro || "unknown";
        if (!this.metrics.macroUsage[macroName2]) {
          this.metrics.macroUsage[macroName2] = { starts: 0, stops: 0, errors: 0 };
        }
        this.metrics.macroUsage[macroName2].stops++;
        break;

      case this.eventTypes.MACRO_ERROR:
        const macroName3 = event.data.macro || "unknown";
        if (!this.metrics.macroUsage[macroName3]) {
          this.metrics.macroUsage[macroName3] = { starts: 0, stops: 0, errors: 0 };
        }
        this.metrics.macroUsage[macroName3].errors++;
        this.metrics.errors++;
        break;

      case this.eventTypes.FEATURE_USED:
        const feature = event.data.feature || "unknown";
        if (!this.metrics.featureUsage[feature]) {
          this.metrics.featureUsage[feature] = 0;
        }
        this.metrics.featureUsage[feature]++;
        break;

      case this.eventTypes.ERROR:
        this.metrics.errors++;
        break;

      case this.eventTypes.PERFORMANCE:
        if (event.data.memory) {
          if (event.data.memory > this.metrics.performance.peakMemoryUsage) {
            this.metrics.performance.peakMemoryUsage = event.data.memory;
          }
        }
        if (event.data.cpu) {
          const currentAvg = this.metrics.performance.averageCPUUsage;
          const newValue = event.data.cpu;
          this.metrics.performance.averageCPUUsage = (currentAvg + newValue) / 2;
        }
        break;
    }
  }

  /**
   * Track macro usage
   */
  trackMacroStart(macroName) {
    this.trackEvent(this.eventTypes.MACRO_START, { macro: macroName });
  }

  trackMacroStop(macroName) {
    this.trackEvent(this.eventTypes.MACRO_STOP, { macro: macroName });
  }

  trackMacroError(macroName, error) {
    this.trackEvent(this.eventTypes.MACRO_ERROR, {
      macro: macroName,
      error: error.message || String(error),
    });
  }

  /**
   * Track feature usage
   */
  trackFeatureUsage(featureName) {
    this.trackEvent(this.eventTypes.FEATURE_USED, { feature: featureName });
  }

  /**
   * Track setting change
   */
  trackSettingChange(settingName, oldValue, newValue) {
    this.trackEvent(this.eventTypes.SETTING_CHANGED, {
      setting: settingName,
      oldValue: oldValue,
      newValue: newValue,
    });
  }

  /**
   * Track error
   */
  trackError(error, context = "unknown") {
    this.trackEvent(this.eventTypes.ERROR, {
      error: error.message || String(error),
      context: context,
      stack: error.stack,
    });
  }

  /**
   * Track performance metrics
   */
  trackPerformance(cpu, memory, responseTime) {
    this.trackEvent(this.eventTypes.PERFORMANCE, {
      cpu: cpu,
      memory: memory,
      responseTime: responseTime,
    });
  }

  /**
   * Load analytics from file
   */
  loadAnalytics() {
    try {
      if (fs.existsSync(this.analyticsFile)) {
        const data = fs.readFileSync(this.analyticsFile, "utf8");
        const analytics = JSON.parse(data);
        this.metrics = { ...this.metrics, ...analytics.metrics };
      }
    } catch (error) {
      console.error("Failed to load analytics:", error);
    }
  }

  /**
   * Save analytics to file
   */
  saveAnalytics() {
    try {
      if (!this.analyticsFile) return;

      const data = {
        userId: this.userId,
        lastUpdated: Date.now(),
        metrics: this.metrics,
        recentEvents: this.events.slice(-1000), // Last 1000 events
      };

      fs.writeFileSync(this.analyticsFile, JSON.stringify(data, null, 2), "utf8");
    } catch (error) {
      console.error("Failed to save analytics:", error);
    }
  }

  /**
   * Get analytics report
   */
  getReport() {
    const currentSessionDuration = this.isActive ? Date.now() - this.startTime : 0;
    const averageSessionDuration = this.metrics.sessions > 0
      ? this.metrics.totalUptime / this.metrics.sessions
      : 0;

    return {
      userId: this.userId,
      sessionId: this.sessionId,
      currentSessionDuration: currentSessionDuration,
      totalSessions: this.metrics.sessions,
      totalUptime: this.metrics.totalUptime,
      averageSessionDuration: averageSessionDuration,
      macroUsage: this.metrics.macroUsage,
      featureUsage: this.metrics.featureUsage,
      errors: this.metrics.errors,
      performance: this.metrics.performance,
      recentEvents: this.events.slice(-100),
    };
  }

  /**
   * Export analytics
   */
  exportAnalytics(filePath) {
    try {
      const report = this.getReport();
      report.allEvents = this.events;
      fs.writeFileSync(filePath, JSON.stringify(report, null, 2), "utf8");
      return true;
    } catch (error) {
      console.error("Failed to export analytics:", error);
      return false;
    }
  }
}

// Export singleton instance
module.exports = new Analytics();

