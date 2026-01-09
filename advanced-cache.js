/**
 * @file advanced-cache.js
 * @description Advanced caching system with TTL, LRU eviction, and smart invalidation
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

class AdvancedCache {
  constructor() {
    this.cache = new Map();
    this.maxSize = 1000; // Maximum number of entries
    this.defaultTTL = 5 * 60 * 1000; // 5 minutes default TTL
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0,
      sets: 0,
      gets: 0,
    };
    this.accessOrder = []; // For LRU tracking
  }

  /**
   * Generate cache key from arguments
   */
  generateKey(key) {
    if (typeof key === "string") {
      return key;
    }
    return crypto.createHash("md5").update(JSON.stringify(key)).digest("hex");
  }

  /**
   * Get value from cache
   */
  get(key) {
    this.stats.gets++;
    const cacheKey = this.generateKey(key);
    const entry = this.cache.get(cacheKey);

    if (!entry) {
      this.stats.misses++;
      return null;
    }

    // Check if expired
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.cache.delete(cacheKey);
      this.removeFromAccessOrder(cacheKey);
      this.stats.misses++;
      return null;
    }

    // Update access order for LRU
    this.updateAccessOrder(cacheKey);
    this.stats.hits++;
    return entry.value;
  }

  /**
   * Set value in cache
   */
  set(key, value, ttl = this.defaultTTL) {
    this.stats.sets++;
    const cacheKey = this.generateKey(key);

    // Check if we need to evict
    if (this.cache.size >= this.maxSize && !this.cache.has(cacheKey)) {
      this.evictLRU();
    }

    const expiresAt = ttl ? Date.now() + ttl : null;
    this.cache.set(cacheKey, {
      value: value,
      expiresAt: expiresAt,
      createdAt: Date.now(),
    });

    this.updateAccessOrder(cacheKey);
  }

  /**
   * Check if key exists and is valid
   */
  has(key) {
    const cacheKey = this.generateKey(key);
    const entry = this.cache.get(cacheKey);

    if (!entry) return false;

    // Check if expired
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.cache.delete(cacheKey);
      this.removeFromAccessOrder(cacheKey);
      return false;
    }

    return true;
  }

  /**
   * Delete key from cache
   */
  delete(key) {
    const cacheKey = this.generateKey(key);
    const removed = this.cache.delete(cacheKey);
    this.removeFromAccessOrder(cacheKey);
    return removed;
  }

  /**
   * Clear all cache
   */
  clear() {
    this.cache.clear();
    this.accessOrder = [];
  }

  /**
   * Update access order for LRU
   */
  updateAccessOrder(key) {
    this.removeFromAccessOrder(key);
    this.accessOrder.push(key);
  }

  /**
   * Remove from access order
   */
  removeFromAccessOrder(key) {
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
  }

  /**
   * Evict least recently used entry
   */
  evictLRU() {
    if (this.accessOrder.length === 0) return;

    const lruKey = this.accessOrder.shift();
    this.cache.delete(lruKey);
    this.stats.evictions++;
  }

  /**
   * Clean expired entries
   */
  cleanExpired() {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiresAt && now > entry.expiresAt) {
        this.cache.delete(key);
        this.removeFromAccessOrder(key);
        cleaned++;
      }
    }

    return cleaned;
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const hitRate = this.stats.gets > 0
      ? (this.stats.hits / this.stats.gets) * 100
      : 0;

    return {
      ...this.stats,
      hitRate: hitRate.toFixed(2) + "%",
      size: this.cache.size,
      maxSize: this.maxSize,
      utilization: ((this.cache.size / this.maxSize) * 100).toFixed(2) + "%",
    };
  }

  /**
   * Get all keys
   */
  keys() {
    return Array.from(this.cache.keys());
  }

  /**
   * Get cache size
   */
  size() {
    return this.cache.size;
  }
}

// Export singleton instance
module.exports = new AdvancedCache();

