import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import subscribeRoutes from './routes/subscribeRoutes';
import { 
  apiLimiter, 
  sanitizeInput, 
  preventHPP,
  detectSuspiciousPatterns,
  validateContentType,
  validateUserAgent
} from './middleware/security';

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// SECURITY MIDDLEWARE - Applied in Order
// ============================================

// 1. Helmet - Set secure HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  frameguard: {
    action: 'deny' // Prevent clickjacking
  },
  noSniff: true, // Prevent MIME type sniffing
  xssFilter: true, // Enable XSS filter
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin'
  }
}));

// 2. CORS - Configure allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL || 'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`[SECURITY] Blocked CORS request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400 // 24 hours
}));

// 3. Body parsing with size limits
app.use(express.json({ 
  limit: '10kb', // Prevent large payload attacks
  strict: true
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10kb'
}));

// 4. Cookie parser
app.use(cookieParser());

// 5. Rate limiting - Prevent brute force
app.use(apiLimiter);

// 6. Input sanitization - Prevent NoSQL injection
app.use(sanitizeInput);

// 7. Prevent HTTP Parameter Pollution
app.use(preventHPP);

// 8. Detect suspicious patterns
app.use(detectSuspiciousPatterns);

// 9. Validate Content-Type
app.use(validateContentType);

// 10. Validate User-Agent
app.use(validateUserAgent);

// 11. Disable X-Powered-By header
app.disable('x-powered-by');

// 12. Trust proxy (if behind reverse proxy like Nginx)
app.set('trust proxy', 1);

// ============================================
// ROUTES
// ============================================

app.use('/api/auth', authRoutes);
app.use('/api/subscribe', subscribeRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ============================================
// ERROR HANDLERS
// ============================================

// 404 handler
app.use((req: Request, res: Response) => {
  console.warn(`[404] ${req.method} ${req.path} from IP: ${req.ip}`);
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log error details
  console.error('='.repeat(50));
  console.error(`[ERROR] ${new Date().toISOString()}`);
  console.error(`[ERROR] IP: ${req.ip}`);
  console.error(`[ERROR] Method: ${req.method}`);
  console.error(`[ERROR] Path: ${req.path}`);
  console.error(`[ERROR] Message: ${err.message}`);
  console.error(`[ERROR] Stack:`, err.stack);
  console.error('='.repeat(50));

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(500).json({
    success: false,
    message: isDevelopment ? err.message : 'Terjadi kesalahan server',
    ...(isDevelopment && { stack: err.stack })
  });
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

const server = app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`🛡️  Security: Enhanced protection enabled`);
  console.log('='.repeat(50));
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
