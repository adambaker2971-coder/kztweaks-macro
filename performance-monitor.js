/**
 * @file performance-monitor.js
 * @description Advanced performance monitoring and analytics system
 * Tracks CPU, memory, macro performance, and system metrics
 */

const os = require("os");
const { performance } = require("perf_hooks");
const fs = require("fs");
const path = require("path");

class PerformanceMonitor {
  constructor() {
    this.isActive = false;
    this.metrics = {
      cpu: {
        usage: 0,
        history: [],
        average: 0,
      },
      memory: {
        used: 0,
        total: 0,
        percentage: 0,
        history: [],
        peak: 0,
      },
      macros: {
        executionTimes: {},
        successRates: {},
        errorCounts: {},
        totalExecutions: {},
      },
      system: {
        uptime: 0,
        loadAverage: [],
        processCount: 0,
      },
      network: {
        latency: 0,
        requests: 0,
        errors: 0,
      },
    };
    
    this.intervals = {};
    this.startTime = Date.now();
    this.sampleInterval = 1000; // 1 second
    this.maxHistorySize = 300; // 5 minutes at 1s intervals
    
    // Performance thresholds
    this.thresholds = {
      cpu: { warning: 70, critical: 90 },
      memory: { warning: 75, critical: 90 },
      macroExecution: { warning: 100, critical: 200 }, // ms
    };
    
    // Alerts
    this.alerts = [];
    this.maxAlerts = 50;
  }

  /**
   * Start performance monitoring
   */
  start() {
    if (this.isActive) {
      console.log("[Performance Monitor] Already active");
      return;
    }

    console.log("\n╔═══════════════════════════════════════════════════════╗");
    console.log("║      ADVANCED PERFORMANCE MONITORING ACTIVATED        ║");
    console.log("╚═══════════════════════════════════════════════════════╝\n");

    this.isActive = true;
    this.startTime = Date.now();

    // Monitor CPU usage
    this.intervals.cpu = setInterval(() => this.updateCPUMetrics(), this.sampleInterval);

    // Monitor memory usage
    this.intervals.memory = setInterval(() => this.updateMemoryMetrics(), this.sampleInterval);

    // Monitor system metrics
    this.intervals.system = setInterval(() => this.updateSystemMetrics(), this.sampleInterval * 5);

    // Cleanup old history periodically
    this.intervals.cleanup = setInterval(() => this.cleanupHistory(), this.sampleInterval * 60);

    console.log("✅ Performance monitoring started");
  }

  /**
   * Stop performance monitoring
   */
  stop() {
    if (!this.isActive) return;

    console.log("[Performance Monitor] Stopping...");
    this.isActive = false;

    // Clear all intervals
    Object.values(this.intervals).forEach(interval => {
      if (interval) clearInterval(interval);
    });
    this.intervals = {};

    console.log("✅ Performance monitoring stopped");
  }

  /**
   * Update CPU metrics
   */
  updateCPUMetrics() {
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;

    cpus.forEach((cpu) => {
      for (const type in cpu.times) {
        totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
    });

    const idle = totalIdle / cpus.length;
    const total = totalTick / cpus.length;
    const usage = 100 - ~~((idle / total) * 100);

    this.metrics.cpu.usage = usage;
    this.metrics.cpu.history.push({
      timestamp: Date.now(),
      usage: usage,
    });

    // Maintain history size
    if (this.metrics.cpu.history.length > this.maxHistorySize) {
      this.metrics.cpu.history.shift();
    }

    // Calculate average
    const recent = this.metrics.cpu.history.slice(-60); // Last minute
    this.metrics.cpu.average = recent.reduce((sum, m) => sum + m.usage, 0) / recent.length;

    // Check thresholds
    if (usage >= this.thresholds.cpu.critical) {
      this.addAlert("critical", "CPU", `CPU usage critical: ${usage.toFixed(1)}%`);
    } else if (usage >= this.thresholds.cpu.warning) {
      this.addAlert("warning", "CPU", `CPU usage high: ${usage.toFixed(1)}%`);
    }
  }

  /**
   * Update memory metrics
   */
  updateMemoryMetrics() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const percentage = (usedMem / totalMem) * 100;

    this.metrics.memory.used = usedMem;
    this.metrics.memory.total = totalMem;
    this.metrics.memory.percentage = percentage;

    this.metrics.memory.history.push({
      timestamp: Date.now(),
      used: usedMem,
      percentage: percentage,
    });

    // Maintain history size
    if (this.metrics.memory.history.length > this.maxHistorySize) {
      this.metrics.memory.history.shift();
    }

    // Track peak
    if (percentage > this.metrics.memory.peak) {
      this.metrics.memory.peak = percentage;
    }

    // Check thresholds
    if (percentage >= this.thresholds.memory.critical) {
      this.addAlert("critical", "Memory", `Memory usage critical: ${percentage.toFixed(1)}%`);
    } else if (percentage >= this.thresholds.memory.warning) {
      this.addAlert("warning", "Memory", `Memory usage high: ${percentage.toFixed(1)}%`);
    }
  }

  /**
   * Update system metrics
   */
  updateSystemMetrics() {
    this.metrics.system.uptime = os.uptime();
    this.metrics.system.loadAverage = os.loadavg();
    
    // Get process count (approximate)
    try {
      const { execSync } = require("child_process");
      const output = execSync("tasklist /FO CSV", { encoding: "utf8" });
      this.metrics.system.processCount = output.split("\n").length - 1;
    } catch (error) {
      // Ignore errors
    }
  }

  /**
   * Track macro execution
   */
  trackMacroExecution(macroName, executionTime, success = true) {
    if (!this.metrics.macros.executionTimes[macroName]) {
      this.metrics.macros.executionTimes[macroName] = [];
      this.metrics.macros.successRates[macroName] = { total: 0, successful: 0 };
      this.metrics.macros.errorCounts[macroName] = 0;
      this.metrics.macros.totalExecutions[macroName] = 0;
    }

    const macro = this.metrics.macros.executionTimes[macroName];
    macro.push({
      timestamp: Date.now(),
      executionTime: executionTime,
      success: success,
    });

    // Maintain history (keep last 100 executions)
    if (macro.length > 100) {
      macro.shift();
    }

    // Update statistics
    this.metrics.macros.totalExecutions[macroName]++;
    if (success) {
      this.metrics.macros.successRates[macroName].successful++;
    } else {
      this.metrics.macros.errorCounts[macroName]++;
    }
    this.metrics.macros.successRates[macroName].total++;

    // Check thresholds
    if (executionTime >= this.thresholds.macroExecution.critical) {
      this.addAlert("warning", "Macro", `${macroName} execution slow: ${executionTime}ms`);
    }
  }

  /**
   * Get macro performance statistics
   */
  getMacroStats(macroName) {
    if (!this.metrics.macros.executionTimes[macroName]) {
      return null;
    }

    const executions = this.metrics.macros.executionTimes[macroName];
    const times = executions.map(e => e.executionTime);
    const successRate = this.metrics.macros.successRates[macroName];

    return {
      averageTime: times.reduce((a, b) => a + b, 0) / times.length,
      minTime: Math.min(...times),
      maxTime: Math.max(...times),
      totalExecutions: this.metrics.macros.totalExecutions[macroName],
      successRate: (successRate.successful / successRate.total) * 100,
      errorCount: this.metrics.macros.errorCounts[macroName],
      recentExecutions: executions.slice(-10),
    };
  }

  /**
   * Add alert
   */
  addAlert(level, category, message) {
    const alert = {
      timestamp: Date.now(),
      level: level,
      category: category,
      message: message,
    };

    this.alerts.push(alert);

    // Maintain alert history
    if (this.alerts.length > this.maxAlerts) {
      this.alerts.shift();
    }

    // Log critical alerts
    if (level === "critical") {
      console.warn(`[Performance Monitor] ⚠️ ${category}: ${message}`);
    }
  }

  /**
   * Cleanup old history
   */
  cleanupHistory() {
    const now = Date.now();
    const maxAge = 5 * 60 * 1000; // 5 minutes

    // Clean CPU history
    this.metrics.cpu.history = this.metrics.cpu.history.filter(
      m => now - m.timestamp < maxAge
    );

    // Clean memory history
    this.metrics.memory.history = this.metrics.memory.history.filter(
      m => now - m.timestamp < maxAge
    );
  }

  /**
   * Get current metrics
   */
  getMetrics() {
    return {
      ...this.metrics,
      uptime: Date.now() - this.startTime,
      alerts: this.alerts.slice(-10), // Last 10 alerts
    };
  }

  /**
   * Get performance report
   */
  getReport() {
    const report = {
      timestamp: Date.now(),
      uptime: Date.now() - this.startTime,
      cpu: {
        current: this.metrics.cpu.usage,
        average: this.metrics.cpu.average,
        peak: Math.max(...this.metrics.cpu.history.map(h => h.usage)),
      },
      memory: {
        current: this.metrics.memory.percentage,
        used: this.metrics.memory.used,
        total: this.metrics.memory.total,
        peak: this.metrics.memory.peak,
      },
      system: {
        ...this.metrics.system,
      },
      macros: {},
      alerts: this.alerts.slice(-20),
    };

    // Add macro statistics
    Object.keys(this.metrics.macros.executionTimes).forEach(macroName => {
      report.macros[macroName] = this.getMacroStats(macroName);
    });

    return report;
  }

  /**
   * Export metrics to file
   */
  exportMetrics(filePath) {
    try {
      const report = this.getReport();
      fs.writeFileSync(filePath, JSON.stringify(report, null, 2));
      console.log(`[Performance Monitor] Metrics exported to ${filePath}`);
      return true;
    } catch (error) {
      console.error("[Performance Monitor] Failed to export metrics:", error);
      return false;
    }
  }
}

// Export singleton instance
module.exports = new PerformanceMonitor();

