/**
 * Security utilities for Node.js/JavaScript applications
 * 
 * Provides common security functions including:
 * - Input validation and sanitization
 * - Token generation
 * - Password hashing (requires bcrypt package)
 * - XSS protection
 */

const crypto = require('crypto');

class SecurityUtils {
  /**
   * Generate a cryptographically secure random token
   * @param {number} length - Length in bytes (default 32)
   * @returns {string} Hex string token
   */
  static generateSecureToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Sanitize user input to prevent XSS attacks
   * @param {string} input - User input to sanitize
   * @param {number} maxLength - Maximum allowed length
   * @returns {string} Sanitized string
   */
  static sanitizeInput(input, maxLength = 1000) {
    if (!input || typeof input !== 'string') {
      return '';
    }

    // Truncate to max length
    let sanitized = input.slice(0, maxLength);

    // Escape HTML special characters
    const htmlEscapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    };

    sanitized = sanitized.replace(/[&<>"'\/]/g, (char) => htmlEscapeMap[char]);

    return sanitized.trim();
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid format
   */
  static validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  /**
   * Validate URL format
   * @param {string} url - URL to validate
   * @returns {boolean} True if valid format
   */
  static validateURL(url) {
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  }

  /**
   * Generate a secure hash of data
   * @param {string} data - Data to hash
   * @param {string} algorithm - Hash algorithm (default: sha256)
   * @returns {string} Hex string hash
   */
  static hash(data, algorithm = 'sha256') {
    return crypto.createHash(algorithm).update(data).digest('hex');
  }

  /**
   * Create HMAC for data integrity verification
   * @param {string} data - Data to sign
   * @param {string} secret - Secret key
   * @returns {string} HMAC hex string
   */
  static createHMAC(data, secret) {
    return crypto.createHmac('sha256', secret).update(data).digest('hex');
  }

  /**
   * Verify HMAC signature
   * @param {string} data - Original data
   * @param {string} secret - Secret key
   * @param {string} signature - HMAC to verify
   * @returns {boolean} True if signature matches
   */
  static verifyHMAC(data, secret, signature) {
    const expectedSignature = this.createHMAC(data, secret);
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  /**
   * Rate limiting helper - simple in-memory implementation
   * WARNING: Use Redis or similar in production for distributed systems
   */
  static createRateLimiter() {
    const requests = new Map();
    
    return {
      /**
       * Check if request should be allowed
       * @param {string} identifier - Unique identifier (IP, user ID, etc.)
       * @param {number} maxRequests - Max requests allowed
       * @param {number} windowMs - Time window in milliseconds
       * @returns {boolean} True if request allowed
       */
      isAllowed(identifier, maxRequests = 100, windowMs = 60000) {
        const now = Date.now();
        const userRequests = requests.get(identifier) || [];
        
        // Remove old requests outside the window
        const validRequests = userRequests.filter(
          (timestamp) => now - timestamp < windowMs
        );
        
        if (validRequests.length >= maxRequests) {
          return false;
        }
        
        validRequests.push(now);
        requests.set(identifier, validRequests);
        return true;
      },
      
      /**
       * Clear rate limit data for identifier
       * @param {string} identifier - Identifier to clear
       */
      clear(identifier) {
        requests.delete(identifier);
      }
    };
  }
}

// Example usage
if (require.main === module) {
  console.log('Security Utils Examples:');
  
  // Generate token
  const token = SecurityUtils.generateSecureToken();
  console.log('Secure token:', token);
  
  // Sanitize input
  const userInput = '<script>alert("xss")</script>Hello';
  const sanitized = SecurityUtils.sanitizeInput(userInput);
  console.log('Sanitized:', sanitized);
  
  // Validate email
  const email = 'user@example.com';
  console.log('Email valid:', SecurityUtils.validateEmail(email));
  
  // Hash data
  const hash = SecurityUtils.hash('sensitive data');
  console.log('Hash:', hash);
  
  // HMAC example
  const data = 'important message';
  const secret = 'secret-key';
  const hmac = SecurityUtils.createHMAC(data, secret);
  console.log('HMAC:', hmac);
  console.log('HMAC valid:', SecurityUtils.verifyHMAC(data, secret, hmac));
}

module.exports = SecurityUtils;
