/**
 * String Obfuscator
 * Obfuscates strings at build/run time to prevent static analysis
 */

const crypto = require("crypto");

class StringObfuscator {
  constructor() {
    this.obfuscationMap = new Map();
    this.reverseMap = new Map();
    this.globalKey = crypto.randomBytes(32);
  }

  /**
   * Obfuscate a string using XOR encryption
   */
  obfuscate(plaintext) {
    if (this.reverseMap.has(plaintext)) {
      return this.reverseMap.get(plaintext);
    }
    
    const key = crypto.randomBytes(plaintext.length);
    const ciphertext = Buffer.from(plaintext).map((byte, i) => 
      byte ^ key[i] ^ this.globalKey[i % this.globalKey.length]
    );
    
    const obfuscated = {
      data: ciphertext.toString("base64"),
      key: key.toString("base64"),
    };
    
    const id = `_${crypto.randomBytes(4).toString("hex")}`;
    this.obfuscationMap.set(id, obfuscated);
    this.reverseMap.set(plaintext, id);
    
    return id;
  }

  /**
   * Deobfuscate a string at runtime
   */
  deobfuscate(id) {
    const obfuscated = this.obfuscationMap.get(id);
    if (!obfuscated) return null;
    
    try {
      const ciphertext = Buffer.from(obfuscated.data, "base64");
      const key = Buffer.from(obfuscated.key, "base64");
      
      const plaintext = ciphertext.map((byte, i) => 
        byte ^ key[i] ^ this.globalKey[i % this.globalKey.length]
      );
      
      return plaintext.toString("utf8");
    } catch (e) {
      return null;
    }
  }

  /**
   * Generate obfuscated string accessor function
   */
  generateAccessor(id) {
    return () => this.deobfuscate(id);
  }
}

const stringObfuscator = new StringObfuscator();

module.exports = stringObfuscator;

