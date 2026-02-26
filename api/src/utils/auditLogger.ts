export enum AuditEventType {
  // Authentication Events
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
  PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST',
  PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  
  // Authorization Events
  ACCESS_DENIED = 'ACCESS_DENIED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  
  // Data Events
  DATA_CREATE = 'DATA_CREATE',
  DATA_READ = 'DATA_READ',
  DATA_UPDATE = 'DATA_UPDATE',
  DATA_DELETE = 'DATA_DELETE',
  
  // Security Events
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  SQL_INJECTION_ATTEMPT = 'SQL_INJECTION_ATTEMPT',
  XSS_ATTEMPT = 'XSS_ATTEMPT',
  CSRF_ATTEMPT = 'CSRF_ATTEMPT',
  BRUTE_FORCE_ATTEMPT = 'BRUTE_FORCE_ATTEMPT',
  
  // System Events
  API_ERROR = 'API_ERROR',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
}

export enum AuditSeverity {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}

export interface AuditLog {
  timestamp: string;
  eventType: AuditEventType;
  severity: AuditSeverity;
  userId?: string;
  email?: string;
  ipAddress?: string;
  userAgent?: string;
  endpoint?: string;
  method?: string;
  statusCode?: number;
  message: string;
  metadata?: Record<string, any>;
  requestId?: string;
}

/**
 * Audit Logger Class
 */
export class AuditLogger {
  private logs: AuditLog[] = [];
  private maxLogs: number = 10000; // Keep last 10k logs in memory

  /**
   * Log an audit event
   */
  log(event: Omit<AuditLog, 'timestamp'>): void {
    const auditLog: AuditLog = {
      ...event,
      timestamp: new Date().toISOString(),
    };

    // Add to in-memory storage
    this.logs.push(auditLog);

    // Trim logs if exceeds max
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log to console with color coding
    this.logToConsole(auditLog);

    // TODO: Send to external logging service (e.g., Cloudflare Analytics, Sentry)
    // this.sendToExternalService(auditLog);
  }

  /**
   * Log to console with formatting
   */
  private logToConsole(log: AuditLog): void {
    const emoji = this.getSeverityEmoji(log.severity);
    const color = this.getSeverityColor(log.severity);
    
    console.log(
      `${emoji} [${log.timestamp}] ${log.severity} - ${log.eventType}`,
      `\n  User: ${log.email || log.userId || 'Anonymous'}`,
      `\n  IP: ${log.ipAddress || 'Unknown'}`,
      `\n  Endpoint: ${log.method} ${log.endpoint || 'N/A'}`,
      `\n  Message: ${log.message}`,
      log.metadata ? `\n  Metadata: ${JSON.stringify(log.metadata)}` : ''
    );
  }

  /**
   * Get emoji for severity level
   */
  private getSeverityEmoji(severity: AuditSeverity): string {
    switch (severity) {
      case AuditSeverity.INFO:
        return 'ℹ️';
      case AuditSeverity.WARNING:
        return '⚠️';
      case AuditSeverity.ERROR:
        return '❌';
      case AuditSeverity.CRITICAL:
        return '🚨';
      default:
        return '📝';
    }
  }

  /**
   * Get color for severity level
   */
  private getSeverityColor(severity: AuditSeverity): string {
    switch (severity) {
      case AuditSeverity.INFO:
        return '\x1b[36m'; // Cyan
      case AuditSeverity.WARNING:
        return '\x1b[33m'; // Yellow
      case AuditSeverity.ERROR:
        return '\x1b[31m'; // Red
      case AuditSeverity.CRITICAL:
        return '\x1b[35m'; // Magenta
      default:
        return '\x1b[0m'; // Reset
    }
  }

  /**
   * Get all logs
   */
  getLogs(filter?: {
    eventType?: AuditEventType;
    severity?: AuditSeverity;
    userId?: string;
    startDate?: Date;
    endDate?: Date;
  }): AuditLog[] {
    let filteredLogs = [...this.logs];

    if (filter) {
      if (filter.eventType) {
        filteredLogs = filteredLogs.filter(log => log.eventType === filter.eventType);
      }
      if (filter.severity) {
        filteredLogs = filteredLogs.filter(log => log.severity === filter.severity);
      }
      if (filter.userId) {
        filteredLogs = filteredLogs.filter(log => log.userId === filter.userId);
      }
      if (filter.startDate) {
        filteredLogs = filteredLogs.filter(
          log => new Date(log.timestamp) >= filter.startDate!
        );
      }
      if (filter.endDate) {
        filteredLogs = filteredLogs.filter(
          log => new Date(log.timestamp) <= filter.endDate!
        );
      }
    }

    return filteredLogs;
  }

  /**
   * Get logs count by event type
   */
  getLogStats(): Record<AuditEventType, number> {
    const stats: Record<string, number> = {};
    
    this.logs.forEach(log => {
      stats[log.eventType] = (stats[log.eventType] || 0) + 1;
    });

    return stats as Record<AuditEventType, number>;
  }

  /**
   * Get security incidents (high severity events)
   */
  getSecurityIncidents(): AuditLog[] {
    return this.logs.filter(
      log =>
        log.severity === AuditSeverity.CRITICAL ||
        log.severity === AuditSeverity.ERROR
    );
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Export logs as JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Singleton instance
export const auditLogger = new AuditLogger();

/**
 * Helper function to log authentication events
 */
export function logAuthEvent(
  eventType: AuditEventType,
  email: string,
  ipAddress: string,
  success: boolean,
  metadata?: Record<string, any>
): void {
  auditLogger.log({
    eventType,
    severity: success ? AuditSeverity.INFO : AuditSeverity.WARNING,
    email,
    ipAddress,
    message: success
      ? `Authentication successful for ${email}`
      : `Authentication failed for ${email}`,
    metadata,
  });
}

/**
 * Helper function to log security events
 */
export function logSecurityEvent(
  eventType: AuditEventType,
  ipAddress: string,
  endpoint: string,
  message: string,
  metadata?: Record<string, any>
): void {
  auditLogger.log({
    eventType,
    severity: AuditSeverity.CRITICAL,
    ipAddress,
    endpoint,
    message,
    metadata,
  });
}
