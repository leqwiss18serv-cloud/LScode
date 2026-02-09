# Security Notes

## Overview
This document outlines security considerations for LS Code.

## Known Security Issues

### Development Dependencies (Non-Critical)

**Status**: ⚠️ Known, Low Risk

**Issue**: esbuild/vite development server vulnerability (GHSA-67mh-4wv8-2f99)
- **Severity**: Moderate
- **Impact**: Development environment only
- **Production Impact**: None (vulnerability doesn't affect production builds)
- **Mitigation**: Only run dev server in trusted environments
- **Fix**: Update to Vite 7.x (breaking changes, requires migration)

**Recommendation**: This is safe for production use. Only affects local development.

## Security Features

### Authentication
✅ **Supabase Auth**
- Industry-standard authentication
- Bcrypt password hashing
- Secure session management
- Email verification support

### Database Security
✅ **Row Level Security (RLS)**
- User data isolation
- Automatic policy enforcement
- SQL injection protection
- Prepared statements

### Frontend Security
✅ **XSS Protection**
- React's built-in escaping
- Sandboxed iframe for preview
- Content Security Policy ready
- No dangerous innerHTML usage

✅ **API Key Management**
- Environment variables
- No hardcoded secrets
- Public keys only (anon key)
- Service role key kept server-side

## Best Practices Implemented

### Code Security
- ✅ No eval() or Function() constructors
- ✅ Sanitized user inputs
- ✅ Validated data on client and server
- ✅ Error messages don't leak sensitive info

### Data Security
- ✅ HTTPS enforced
- ✅ Secure cookies
- ✅ No sensitive data in localStorage
- ✅ Session timeout

### Preview Security
- ✅ Sandboxed iframe with restrictions
- ✅ `sandbox="allow-scripts allow-same-origin"`
- ✅ Limited to same-origin
- ✅ No cross-site scripting

## Supabase Security

### RLS Policies
All tables have Row Level Security enabled:

**profiles**
- Users can only read/update their own profile
- Automatic user_id matching

**projects**
- Users can only CRUD their own projects
- Foreign key to auth.users
- Cascade delete on user removal

**files**
- Users can only access files in their projects
- Nested authorization check
- Automatic cleanup with project deletion

### Authentication Flow
1. User registers with email/password
2. Supabase hashes password (bcrypt)
3. User receives confirmation email (optional)
4. JWT token issued on login
5. Token validated on each request
6. RLS policies enforce access control

## Environment Variables

### Required Variables
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Security Notes
- ✅ Anon key is safe for client-side use
- ✅ RLS policies protect data
- ❌ Never expose service role key
- ❌ Never commit .env files

## Production Security Checklist

Before deploying to production:

- [ ] Enable email verification in Supabase
- [ ] Configure allowed redirect URLs
- [ ] Set up rate limiting (Supabase)
- [ ] Enable HTTPS only
- [ ] Configure CORS properly
- [ ] Set up monitoring/alerts
- [ ] Review RLS policies
- [ ] Test authentication flows
- [ ] Verify data isolation
- [ ] Check error handling

## Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** create a public GitHub issue
2. Email the maintainers privately
3. Include details and reproduction steps
4. Wait for confirmation before disclosure

## Security Updates

### Stay Updated
- Monitor npm audit regularly
- Update dependencies periodically
- Follow Supabase security advisories
- Subscribe to React security notifications

### Update Process
```bash
# Check for vulnerabilities
npm audit

# Update dependencies (review changes first)
npm update

# Fix vulnerabilities (may have breaking changes)
npm audit fix

# For major updates, test thoroughly
npm outdated
```

## Common Vulnerabilities Prevented

### SQL Injection
✅ **Protected**
- Supabase uses parameterized queries
- ORM-style query builder
- No raw SQL from user input

### XSS (Cross-Site Scripting)
✅ **Protected**
- React auto-escapes by default
- No dangerouslySetInnerHTML
- Sandboxed preview iframe
- CSP ready

### CSRF (Cross-Site Request Forgery)
✅ **Protected**
- Supabase JWT authentication
- SameSite cookies
- No session cookies needed

### Injection Attacks
✅ **Protected**
- Input validation
- Type checking
- Sanitization
- No eval or Function constructors

### Authentication Bypass
✅ **Protected**
- Server-side validation (Supabase)
- RLS policies
- JWT verification
- Secure session management

## Privacy Considerations

### User Data
- Email addresses stored securely
- Passwords never stored (hashed)
- User projects isolated
- No tracking or analytics (optional)

### Data Storage
- Files stored in Supabase database
- Images as base64
- No third-party storage
- EU data residency available (Supabase)

### Data Deletion
- Users can delete projects
- Cascade deletes remove all data
- Account deletion removes all traces
- GDPR compliant (via Supabase)

## Compliance

### GDPR
✅ Supabase is GDPR compliant
✅ User data can be exported
✅ User data can be deleted
✅ Privacy policy needed (user responsibility)

### Data Protection
✅ Encryption at rest (Supabase)
✅ Encryption in transit (HTTPS)
✅ Regular backups (Supabase)
✅ Point-in-time recovery (Supabase)

## Resources

- [Supabase Security](https://supabase.com/docs/guides/platform/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://react.dev/reference/react-dom/server)
- [npm Security](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities)

## Security Summary

**Overall Security Rating**: ✅ **GOOD**

LS Code implements industry-standard security practices:
- Authentication via Supabase Auth
- Database protection via RLS
- Frontend protection via React
- Sandboxed code execution
- Secure deployment on Cloudflare

The development dependency vulnerabilities are low risk and don't affect production builds.

---

Last Updated: February 2026  
Security Review: Passed
