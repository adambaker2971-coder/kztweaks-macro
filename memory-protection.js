/**
 * Memory Protection Module
 * Protects sensitive data in memory from detection and scanning
 */

const crypto = require("crypto");

class MemoryProtection {
  constructor() {
    this.protectedStrings = new Map();
    this.memoryPools = [];
    this.isActive = false;
  }

  /**
   * Encrypt string in memory (XOR with rotating key)
   */
  protectString(str) {
    const id = crypto.randomBytes(8).toString("hex");
    const key = crypto.randomBytes(str.length);
    const encrypted = Buffer.from(str).map((byte, i) => byte ^ key[i % key.length]);
    
    this.protectedStrings.set(id, {
      encrypted,
      key,
      length: str.length,
    });
    
    return id;
  }

  /**
   * Decrypt string from memory
   */
  unprotectString(id) {
    const protectedEntry = this.protectedStrings.get(id);
    if (!protectedEntry) return null;
    
    const decrypted = protectedEntry.encrypted.map((byte, i) => 
      byte ^ protectedEntry.key[i % protectedEntry.key.length]
    );
    
    return decrypted.toString("utf8");
  }

  /**
   * Clear protected strings from memory
   */
  clearProtected(id) {
    if (id) {
      const protectedEntry = this.protectedStrings.get(id);
      if (protectedEntry) {
        // Overwrite memory
        protectedEntry.encrypted.fill(0);
        protectedEntry.key.fill(0);
        this.protectedStrings.delete(id);
      }
    } else {
      // Clear all
      for (const [entryId, protectedEntry] of this.protectedStrings.entries()) {
        protectedEntry.encrypted.fill(0);
        protectedEntry.key.fill(0);
      }
      this.protectedStrings.clear();
    }
  }

  /**
   * Allocate decoy memory pools (makes scanning harder)
   */
  allocateDecoyPools(count = 5) {
    for (let i = 0; i < count; i++) {
      const size = Math.floor(Math.random() * 1024) + 512;
      const pool = Buffer.allocUnsafe(size);
      crypto.randomFillSync(pool);
      this.memoryPools.push(pool);
    }
  }

  /**
   * Scramble memory periodically
   */
  scrambleMemory() {
    // Randomize decoy pools
    for (const pool of this.memoryPools) {
      crypto.randomFillSync(pool, 0, Math.floor(pool.length / 2));
    }
    
    // Re-encrypt protected strings with new keys
    for (const [id, protectedEntry] of this.protectedStrings.entries()) {
      const newKey = crypto.randomBytes(protectedEntry.length);
      protectedEntry.encrypted = protectedEntry.encrypted.map((byte, i) => 
        byte ^ protectedEntry.key[i % protectedEntry.key.length] ^ newKey[i % newKey.length]
      );
      protectedEntry.key = newKey;
    }
  }

  /**
   * Initialize memory protection
   */
  initialize() {
    if (this.isActive) return;
    
    this.allocateDecoyPools(5);
    this.isActive = true;
    
    // Periodic memory scrambling
    setInterval(() => {
      this.scrambleMemory();
    }, 30000 + Math.random() * 20000); // 30-50 seconds
  }

  /**
   * Cleanup
   */
  cleanup() {
    this.clearProtected();
    for (const pool of this.memoryPools) {
      pool.fill(0);
    }
    this.memoryPools = [];
    this.isActive = false;
  }
}

const memoryProtection = new MemoryProtection();

// Auto-initialize
setImmediate(() => {
  memoryProtection.initialize();
});

module.exports = memoryProtection;

