# Security Checklist

Use this checklist to ensure security best practices are followed.

## Before Every Commit

- [ ] No hardcoded secrets, API keys, or passwords in code
- [ ] No `.env` files or credential files being committed
- [ ] No private keys or certificates being committed
- [ ] All sensitive data uses environment variables
- [ ] No comments containing TODO with security implications unaddressed
- [ ] Pre-commit hooks have passed (if installed)

## Code Security

### Input Validation
- [ ] All user inputs are validated
- [ ] Input length limits are enforced
- [ ] Special characters are properly handled
- [ ] File uploads are validated (type, size, content)
- [ ] Path traversal vulnerabilities are prevented

### Authentication & Authorization
- [ ] Passwords are hashed using strong algorithms (bcrypt, argon2)
- [ ] Multi-factor authentication is available (if applicable)
- [ ] Session management is secure
- [ ] Password reset mechanism is secure
- [ ] Account lockout after failed attempts
- [ ] Proper authorization checks on all endpoints
- [ ] Principle of least privilege is followed

### Data Protection
- [ ] Sensitive data is encrypted at rest
- [ ] TLS/HTTPS is enforced for data in transit
- [ ] Database credentials are not hardcoded
- [ ] SQL injection is prevented (parameterized queries)
- [ ] XSS vulnerabilities are addressed
- [ ] CSRF protection is implemented (for web apps)
- [ ] Sensitive data is not logged

### API Security
- [ ] Rate limiting is implemented
- [ ] API keys are not exposed in client-side code
- [ ] CORS is properly configured
- [ ] API versioning is implemented
- [ ] Input validation on all endpoints
- [ ] Proper error handling (no sensitive data in errors)

### Dependencies
- [ ] All dependencies are up to date
- [ ] No known vulnerabilities in dependencies (run `npm audit` or `pip-audit`)
- [ ] Dependencies are from trusted sources
- [ ] Lock files are committed (`package-lock.json`, `Pipfile.lock`)
- [ ] Minimal dependencies (remove unused)

## Infrastructure Security

- [ ] Environment variables are used for configuration
- [ ] Secrets management system is in place (production)
- [ ] Database backups are automated and encrypted
- [ ] Logs are monitored for security events
- [ ] Security headers are configured (CSP, HSTS, etc.)
- [ ] HTTPS/TLS certificates are valid and up to date
- [ ] Unnecessary services/ports are closed

## Before Deployment

- [ ] Security scan has been run and passed
- [ ] Dependency vulnerabilities have been addressed
- [ ] Code review has been completed
- [ ] Security tests have passed
- [ ] Environment variables are configured in production
- [ ] Secrets are rotated from development values
- [ ] Monitoring and alerting are configured
- [ ] Incident response plan is documented
- [ ] Backup and recovery procedures are tested

## Regular Maintenance

### Weekly
- [ ] Review Dependabot alerts
- [ ] Check security scan results
- [ ] Review access logs for anomalies

### Monthly
- [ ] Rotate API keys and tokens
- [ ] Review user permissions
- [ ] Update dependencies
- [ ] Security awareness training (team)
- [ ] Review and update security documentation

### Quarterly
- [ ] Comprehensive security audit
- [ ] Penetration testing (if applicable)
- [ ] Review and update security policies
- [ ] Disaster recovery drill
- [ ] Review third-party integrations

## Incident Response

If a security incident occurs:

1. [ ] Isolate affected systems
2. [ ] Assess the scope and impact
3. [ ] Notify stakeholders
4. [ ] Preserve evidence
5. [ ] Remediate the vulnerability
6. [ ] Document the incident
7. [ ] Review and improve security measures
8. [ ] Conduct post-incident review

## Compliance Checklist (if applicable)

- [ ] GDPR compliance (EU)
- [ ] CCPA compliance (California)
- [ ] HIPAA compliance (healthcare)
- [ ] PCI DSS compliance (payment processing)
- [ ] SOC 2 compliance
- [ ] ISO 27001 compliance

## Notes

Add any security-specific notes or context here:

---

**Last Review Date:** _____________
**Reviewed By:** _____________
**Next Review Date:** _____________
