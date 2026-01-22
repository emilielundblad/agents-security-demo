# Contributing Guidelines

## Security-First Development

Thank you for contributing! Security is a top priority for this project.

## Before You Contribute

1. Read [SECURITY.md](SECURITY.md) for security guidelines
2. Ensure you never commit sensitive data
3. Use `.env.example` as a template for local configuration
4. Run security checks before submitting PRs

## Development Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and configure your local settings
3. Install pre-commit hooks (optional but recommended):
   ```bash
   pip install pre-commit
   pre-commit install
   ```

## Security Checklist for Pull Requests

Before submitting a PR, ensure:

- [ ] No API keys, passwords, or secrets in code
- [ ] No hardcoded credentials or tokens
- [ ] All sensitive data uses environment variables
- [ ] Dependencies are up to date
- [ ] No new high/critical severity vulnerabilities
- [ ] Input validation is implemented where needed
- [ ] SQL queries use parameterized statements
- [ ] HTTPS/TLS is used for external communications
- [ ] Error messages don't leak sensitive information
- [ ] Security tests are included for security-related changes

## Pre-Commit Checks

The repository includes pre-commit hooks that will:
- Detect secrets and private keys
- Check for AWS credentials
- Scan for common security issues
- Validate YAML and JSON files
- Check for large files

## Running Security Scans Manually

```bash
# Install security tools
pip install bandit detect-secrets safety

# Run Python security scan
bandit -r . -f json -o bandit-report.json

# Scan for secrets
detect-secrets scan

# Check Python dependencies
safety check

# For Node.js projects
npm audit

# For comprehensive scanning
docker run --rm -v "$(pwd):/src" trufflesecurity/trufflehog:latest filesystem /src
```

## Code Review Process

1. All PRs require at least one review
2. Security-sensitive changes require review from a maintainer
3. Automated security checks must pass
4. Follow the principle of least privilege

## Reporting Issues

- For security vulnerabilities, see [SECURITY.md](SECURITY.md)
- For bugs and features, open a GitHub issue
- Include steps to reproduce for bugs
- Provide context and use cases for feature requests

## Questions?

If you have questions about security practices or contributing, please open a discussion or contact the maintainers.
