# 🕌 DanaMasjid API

Production-grade REST API untuk sistem manajemen donasi masjid dengan keamanan tingkat enterprise.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ atau Bun
- PostgreSQL 14+
- npm atau bun

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env dengan konfigurasi Anda
nano .env

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

Server akan berjalan di `http://localhost:3001`

## 🛡️ Security Features

### ✅ Production-Grade Security
API ini dilengkapi dengan **10+ layer keamanan** untuk melindungi dari berbagai jenis serangan:

#### 1. **HTTP Security Headers (Helmet.js)**
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options (Clickjacking Protection)
- X-Content-Type-Options (MIME Sniffing Protection)
- X-XSS-Protection
- Referrer Policy

#### 2. **Rate Limiting & Brute Force Protection**
- **Login**: 5 attempts / 15 minutes + progressive delays
- **OTP**: 3 requests / 5 minutes
- **Registration**: 3 attempts / hour
- **Password Reset**: 3 attempts / hour
- **General API**: 100 requests / 15 minutes

#### 3. **Input Validation & Sanitization**
- NoSQL Injection Prevention (express-mongo-sanitize)
- XSS Attack Prevention (pattern detection)
- SQL Injection Prevention (Prisma ORM)
- HTTP Parameter Pollution Prevention (hpp)

#### 4. **CORS Configuration**
- Whitelist-based origin validation
- Credential support
- Method restrictions

#### 5. **Request Validation**
- Content-Type validation
- User-Agent validation (blocks malicious tools)
- Payload size limits (10KB max)

#### 6. **Authentication & Authorization**
- JWT with HS256 algorithm
- bcrypt password hashing (10 rounds)
- Token expiration handling
- Protected route middleware

#### 7. **Timing Attack Prevention**
- Random delays on auth endpoints
- Prevents username/password enumeration

#### 8. **Comprehensive Logging**
- All authentication attempts
- Rate limit violations
- Suspicious pattern detections
- Security event tracking

#### 9. **Error Handling**
- Environment-aware error messages
- No information leakage in production
- Graceful shutdown handling

#### 10. **Process Management**
- Uncaught exception handling
- Unhandled rejection handling
- SIGTERM/SIGINT signal handling

📖 **Dokumentasi lengkap**: Lihat [SECURITY.md](./SECURITY.md)

## 📁 Project Structure

```
api/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── db/             # Database connection & migrations
│   ├── lib/            # External libraries (Prisma)
│   ├── middleware/     # Express middleware
│   │   ├── auth.ts     # JWT authentication
│   │   ├── security.ts # Security middleware (rate limiting, etc)
│   │   └── validation.ts # Input validation
│   ├── routes/         # API routes
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   └── index.ts        # Application entry point
├── prisma/             # Prisma schema & migrations
├── .env.example        # Environment variables template
├── SECURITY.md         # Security documentation
└── package.json
```

## 🔌 API Endpoints

### Authentication

#### Registration (3 Steps)
```bash
# Step 1: Send OTP
POST /api/auth/register/step1
Content-Type: application/json

{
  "name": "Admin Masjid",
  "email": "admin@masjid.com",
  "phone": "081234567890"
}

# Step 2: Verify OTP
POST /api/auth/register/verify-otp
Content-Type: application/json

{
  "email": "admin@masjid.com",
  "otp": "123456"
}

# Step 3: Complete Registration
POST /api/auth/register/complete
Content-Type: application/json

{
  "name": "Admin Masjid",
  "email": "admin@masjid.com",
  "phone": "081234567890",
  "password": "securepassword123",
  "mosqueName": "Masjid Al-Ikhlas",
  "mosqueAddress": "Jl. Raya No. 123",
  "mosqueCity": "Jakarta"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@masjid.com",
  "password": "securepassword123"
}

# Response
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": 1,
      "name": "Admin Masjid",
      "email": "admin@masjid.com"
    }
  }
}
```

#### Forgot Password (3 Steps)
```bash
# Step 1: Send OTP
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "admin@masjid.com"
}

# Step 2: Verify OTP
POST /api/auth/verify-reset-otp
Content-Type: application/json

{
  "email": "admin@masjid.com",
  "otp": "123456"
}

# Step 3: Reset Password
POST /api/auth/reset-password
Content-Type: application/json

{
  "email": "admin@masjid.com",
  "otp": "123456",
  "password": "newpassword123"
}
```

#### Protected Routes
```bash
# Get Profile
GET /api/auth/profile
Authorization: Bearer <token>

# Logout
POST /api/auth/logout
Authorization: Bearer <token>

# Refresh Token
POST /api/auth/refresh-token
Authorization: Bearer <token>
```

### Health Check
```bash
GET /health

# Response
{
  "success": true,
  "message": "API is running",
  "timestamp": "2025-02-25T10:30:00.000Z",
  "uptime": 3600,
  "environment": "development"
}
```

## 🔧 Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Production
npm run build            # Build TypeScript to JavaScript
npm start                # Start production server

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Run migrations
npm run db:studio        # Open Prisma Studio

# Type Checking
npm run type-check       # Check TypeScript types
```

## 🌍 Environment Variables

```env
# Server
NODE_ENV=production
PORT=3001

# Security
FRONTEND_URL=https://yourdomain.com
JWT_SECRET=your-256-bit-secret-key
JWT_EXPIRES_IN=7d

# Database
DATABASE_URL=postgresql://user:password@localhost:5433/database

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
```

## 🧪 Testing

### Manual Testing
```bash
# Test rate limiting
for i in {1..10}; do
  curl -X POST http://localhost:3001/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}'
done

# Test input sanitization
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":{"$ne":""},"password":"test"}'
```

### Security Audit
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## 📊 Monitoring

### Logs
Semua security events dicatat dengan format:
```
[SECURITY] Rate limit exceeded from IP: 192.168.1.1
[AUTH] 2025-02-25T10:30:00.000Z | POST /api/auth/login | IP: 192.168.1.1 | Success: false
[ERROR] Suspicious pattern detected from IP: 192.168.1.1
```

### Recommended Monitoring Tools
- **Logging**: Winston, Pino
- **Monitoring**: Prometheus + Grafana
- **Error Tracking**: Sentry
- **Security**: Snyk, npm audit

## 🚀 Deployment

### Docker
```bash
# Build image
docker build -t danamasjid-api .

# Run container
docker run -p 3001:3001 --env-file .env danamasjid-api
```

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT_SECRET (256-bit)
- [ ] Configure FRONTEND_URL for CORS
- [ ] Enable HTTPS (Nginx/Caddy)
- [ ] Set up logging (Winston/Sentry)
- [ ] Configure monitoring (Prometheus)
- [ ] Enable firewall rules
- [ ] Regular security audits
- [ ] Keep dependencies updated

## 📚 Documentation

- [Security Documentation](./SECURITY.md) - Comprehensive security guide
- [API Documentation](./docs/API.md) - Detailed API reference (coming soon)
- [Database Schema](./prisma/schema.prisma) - Prisma schema

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

Copyright © 2025 DanaMasjid. All rights reserved.

## 🆘 Support

- Email: support@danamasjid.com
- Issues: [GitHub Issues](https://github.com/yourusername/danamasjid/issues)

---

**Built with ❤️ for Indonesian Mosques**
