/**
 * @file error-recovery.js
 * @description Advanced error recovery and resilience system
 * Implements retry logic, circuit breakers, and automatic recovery
 */

class ErrorRecovery {
  constructor() {
    this.circuitBreakers = new Map();
    this.retryStrategies = new Map();
    this.errorHistory = [];
    this.maxErrorHistory = 100;
    
    // Default retry configuration
    this.defaultRetryConfig = {
      maxRetries: 3,
      initialDelay: 100,
      maxDelay: 5000,
      backoffMultiplier: 2,
      retryableErrors: ["ECONNRESET", "ETIMEDOUT", "ENOTFOUND"],
    };

    // Circuit breaker configuration
    this.circuitBreakerConfig = {
      failureThreshold: 5,
      resetTimeout: 30000, // 30 seconds
      halfOpenMaxAttempts: 3,
    };
  }

  /**
   * Execute with retry logic
   */
  async executeWithRetry(operation, context = "unknown", config = {}) {
    const retryConfig = { ...this.defaultRetryConfig, ...config };
    let lastError = null;
    let delay = retryConfig.initialDelay;

    for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
      try {
        // Check circuit breaker
        if (this.isCircuitOpen(context)) {
          throw new Error(`Circuit breaker is OPEN for ${context}`);
        }

        const result = await operation();
        
        // Success - reset circuit breaker
        this.recordSuccess(context);
        return result;
      } catch (error) {
        lastError = error;
        
        // Check if error is retryable
        if (!this.isRetryableError(error, retryConfig.retryableErrors)) {
          this.recordFailure(context, error);
          throw error;
        }

        // Last attempt - throw error
        if (attempt === retryConfig.maxRetries) {
          this.recordFailure(context, error);
          throw error;
        }

        // Wait before retry
        await this.sleep(delay);
        delay = Math.min(delay * retryConfig.backoffMultiplier, retryConfig.maxDelay);
      }
    }

    this.recordFailure(context, lastError);
    throw lastError;
  }

  /**
   * Check if error is retryable
   */
  isRetryableError(error, retryableErrors) {
    if (!error) return false;
    
    const errorCode = error.code || error.name || "";
    const errorMessage = error.message || "";
    
    return retryableErrors.some(retryable => 
      errorCode.includes(retryable) || errorMessage.includes(retryable)
    );
  }

  /**
   * Circuit breaker - check if circuit is open
   */
  isCircuitOpen(context) {
    const breaker = this.circuitBreakers.get(context);
    if (!breaker) return false;

    const now = Date.now();

    // Check if reset timeout has passed
    if (breaker.state === "OPEN" && now - breaker.lastFailureTime > breaker.resetTimeout) {
      breaker.state = "HALF_OPEN";
      breaker.halfOpenAttempts = 0;
      console.log(`[Error Recovery] Circuit breaker ${context} moved to HALF_OPEN`);
    }

    // Reject if circuit is open
    if (breaker.state === "OPEN") {
      return true;
    }

    // Allow limited attempts in half-open state
    if (breaker.state === "HALF_OPEN") {
      if (breaker.halfOpenAttempts >= this.circuitBreakerConfig.halfOpenMaxAttempts) {
        breaker.state = "OPEN";
        breaker.lastFailureTime = now;
        console.log(`[Error Recovery] Circuit breaker ${context} moved back to OPEN`);
        return true;
      }
      breaker.halfOpenAttempts++;
    }

    return false;
  }

  /**
   * Record success for circuit breaker
   */
  recordSuccess(context) {
    const breaker = this.circuitBreakers.get(context);
    if (!breaker) return;

    // Reset failure count
    breaker.failureCount = 0;

    // Move from half-open to closed
    if (breaker.state === "HALF_OPEN") {
      breaker.state = "CLOSED";
      console.log(`[Error Recovery] Circuit breaker ${context} moved to CLOSED`);
    }
  }

  /**
   * Record failure for circuit breaker
   */
  recordFailure(context, error) {
    // Initialize circuit breaker if needed
    if (!this.circuitBreakers.has(context)) {
      this.circuitBreakers.set(context, {
        state: "CLOSED",
        failureCount: 0,
        lastFailureTime: 0,
        resetTimeout: this.circuitBreakerConfig.resetTimeout,
        halfOpenAttempts: 0,
      });
    }

    const breaker = this.circuitBreakers.get(context);
    breaker.failureCount++;
    breaker.lastFailureTime = Date.now();

    // Add to error history
    this.addToErrorHistory(context, error);

    // Open circuit if threshold exceeded
    if (breaker.failureCount >= this.circuitBreakerConfig.failureThreshold) {
      breaker.state = "OPEN";
      console.warn(`[Error Recovery] Circuit breaker ${context} opened after ${breaker.failureCount} failures`);
    }
  }

  /**
   * Add error to history
   */
  addToErrorHistory(context, error) {
    this.errorHistory.push({
      timestamp: Date.now(),
      context: context,
      error: {
        message: error.message,
        code: error.code,
        name: error.name,
      },
    });

    // Maintain history size
    if (this.errorHistory.length > this.maxErrorHistory) {
      this.errorHistory.shift();
    }
  }

  /**
   * Get error history
   */
  getErrorHistory(context = null, limit = 50) {
    let history = this.errorHistory;

    if (context) {
      history = history.filter(e => e.context === context);
    }

    return history.slice(-limit);
  }

  /**
   * Get circuit breaker status
   */
  getCircuitBreakerStatus(context) {
    const breaker = this.circuitBreakers.get(context);
    if (!breaker) {
      return { state: "CLOSED", failureCount: 0 };
    }

    return {
      state: breaker.state,
      failureCount: breaker.failureCount,
      lastFailureTime: breaker.lastFailureTime,
      halfOpenAttempts: breaker.halfOpenAttempts,
    };
  }

  /**
   * Reset circuit breaker
   */
  resetCircuitBreaker(context) {
    if (this.circuitBreakers.has(context)) {
      const breaker = this.circuitBreakers.get(context);
      breaker.state = "CLOSED";
      breaker.failureCount = 0;
      breaker.halfOpenAttempts = 0;
      console.log(`[Error Recovery] Circuit breaker ${context} manually reset`);
    }
  }

  /**
   * Sleep utility
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get recovery statistics
   */
  getStats() {
    const breakers = {};
    for (const [context, breaker] of this.circuitBreakers.entries()) {
      breakers[context] = {
        state: breaker.state,
        failureCount: breaker.failureCount,
      };
    }

    return {
      circuitBreakers: breakers,
      errorHistorySize: this.errorHistory.length,
      recentErrors: this.errorHistory.slice(-10),
    };
  }
}

// Export singleton instance
module.exports = new ErrorRecovery();

