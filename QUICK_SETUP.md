# Quick Security Setup Guide

This guide helps you enable all security features in this repository.

## 🚀 Quick Start (5 minutes)

### 1. Install Pre-commit Hooks (Optional but Recommended)

For Python projects:
```bash
pip install pre-commit
pre-commit install
```

For Node.js projects, you can also use:
```bash
npm install --save-dev pre-commit
```

This will run security checks before every commit automatically.

### 2. Set Up Environment Variables

```bash
# Copy the template
cp .env.example .env

# Edit .env with your actual values
# Never commit this file!
nano .env  # or use your preferred editor
```

### 3. Enable GitHub Security Features

Go to your repository on GitHub:

1. **Settings** → **Security & analysis**
2. Enable:
   - ✅ Dependency graph
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates
   - ✅ Secret scanning (if available)
   - ✅ Code scanning (CodeQL)

### 4. Run Initial Security Check

```bash
# For Python projects
pip install -r requirements.txt
bandit -r . -f json -o bandit-report.json
safety check

# For Node.js projects
npm audit
```

## 📋 Verification Checklist

After setup, verify:

- [ ] `.env` file exists and is NOT tracked by git
- [ ] Pre-commit hooks are installed (run `pre-commit run --all-files`)
- [ ] GitHub Actions workflows are active (check Actions tab)
- [ ] Dependabot is enabled (check Security tab)
- [ ] No secrets in code (run `git log -p | grep -i password`)

## 🔧 Common Commands

### Security Scanning

```bash
# Scan for secrets in entire repository
pre-commit run detect-secrets --all-files

# Check for private keys
pre-commit run detect-private-key --all-files

# Run all pre-commit hooks
pre-commit run --all-files

# Python security scan
bandit -r . -ll

# Node.js security audit
npm audit

# Check for outdated dependencies
npm outdated
```

### Maintenance

```bash
# Update pre-commit hooks
pre-commit autoupdate

# Update dependencies (Node.js)
npm update
npm audit fix

# Update dependencies (Python)
pip install --upgrade -r requirements.txt
pip-audit
```

## 🎯 Best Practices

### Daily Development
1. Use `.env` for local configuration
2. Never commit sensitive data
3. Run pre-commit hooks before pushing
4. Review Dependabot PRs promptly

### Before Each Commit
```bash
# Quick security check
git diff | grep -E "(password|api_key|secret|token)" && echo "⚠️  WARNING: Possible secret detected!"

# Run pre-commit (if installed)
pre-commit run
```

### Weekly Tasks
- Review Dependabot alerts
- Check GitHub Security tab
- Update dependencies
- Review access logs (if applicable)

### Monthly Tasks
- Rotate API keys
- Review user permissions
- Full security audit
- Update documentation

## 🆘 Troubleshooting

### Pre-commit hooks not running
```bash
# Reinstall hooks
pre-commit uninstall
pre-commit install

# Test hooks
pre-commit run --all-files
```

### Environment variables not loading
```bash
# Check .env file exists
ls -la .env

# Verify .env is in .gitignore
git check-ignore .env
# Should output: .env
```

### False positive in secret detection
```bash
# Add to .secrets.baseline
detect-secrets scan > .secrets.baseline

# Or skip pre-commit for one commit (use sparingly!)
git commit --no-verify -m "message"
```

## 📚 Additional Resources

- [SECURITY.md](SECURITY.md) - Full security policy
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [SECURITY_CHECKLIST.md](SECURITY_CHECKLIST.md) - Comprehensive checklist
- [SECURITY_AUDIT_REPORT.md](SECURITY_AUDIT_REPORT.md) - Audit findings

## 🔐 Security Contacts

For security issues, please refer to [SECURITY.md](SECURITY.md) for reporting instructions.

---

**Last Updated**: January 22, 2026
