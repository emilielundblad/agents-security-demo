"""
Security utilities and helper functions for the application.

This module provides security-related functions including:
- Password hashing and verification
- Token generation and validation
- Input sanitization
- Secure random generation
"""

import secrets
import hashlib
import re
from typing import Optional


class SecurityUtils:
    """Security utility class with common security functions."""

    @staticmethod
    def generate_secure_token(length: int = 32) -> str:
        """
        Generate a cryptographically secure random token.

        Args:
            length: Length of the token in bytes (default 32)

        Returns:
            Hex string of the generated token
        """
        return secrets.token_hex(length)

    @staticmethod
    def hash_password(password: str) -> str:
        """
        Hash a password using SHA-256 with salt.
        
        WARNING: This is a basic example. In production, use:
        - bcrypt (recommended)
        - argon2 (recommended)
        - PBKDF2
        
        Args:
            password: Plain text password
            
        Returns:
            Hashed password with salt
        """
        salt = secrets.token_hex(16)
        pwd_hash = hashlib.pbkdf2_hmac('sha256', 
                                        password.encode('utf-8'), 
                                        salt.encode('utf-8'), 
                                        100000)
        return f"{salt}${pwd_hash.hex()}"

    @staticmethod
    def verify_password(password: str, hashed: str) -> bool:
        """
        Verify a password against a hash.
        
        Args:
            password: Plain text password to verify
            hashed: Stored password hash
            
        Returns:
            True if password matches, False otherwise
        """
        try:
            salt, pwd_hash = hashed.split('$')
            new_hash = hashlib.pbkdf2_hmac('sha256',
                                           password.encode('utf-8'),
                                           salt.encode('utf-8'),
                                           100000)
            return new_hash.hex() == pwd_hash
        except (ValueError, AttributeError):
            return False

    @staticmethod
    def sanitize_input(user_input: str, max_length: int = 1000) -> str:
        """
        Sanitize user input to prevent injection attacks.
        
        Args:
            user_input: Raw user input
            max_length: Maximum allowed length
            
        Returns:
            Sanitized string
        """
        if not user_input:
            return ""
        
        # Truncate to max length
        sanitized = user_input[:max_length]
        
        # Remove potentially dangerous characters
        # Customize based on your specific needs
        sanitized = re.sub(r'[<>\"\'&;]', '', sanitized)
        
        return sanitized.strip()

    @staticmethod
    def validate_email(email: str) -> bool:
        """
        Validate email format.
        
        Args:
            email: Email address to validate
            
        Returns:
            True if valid format, False otherwise
        """
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(pattern, email))


# Example usage (for documentation purposes)
if __name__ == "__main__":
    utils = SecurityUtils()
    
    # Generate secure token
    token = utils.generate_secure_token()
    print(f"Secure token: {token}")
    
    # Password hashing example
    password = "example_password"
    hashed = utils.hash_password(password)
    print(f"Hashed password: {hashed}")
    
    # Verify password
    is_valid = utils.verify_password(password, hashed)
    print(f"Password valid: {is_valid}")
    
    # Sanitize input
    user_input = "<script>alert('xss')</script>Hello"
    clean = utils.sanitize_input(user_input)
    print(f"Sanitized: {clean}")
    
    # Validate email
    email = "user@example.com"
    is_valid_email = utils.validate_email(email)
    print(f"Email valid: {is_valid_email}")
