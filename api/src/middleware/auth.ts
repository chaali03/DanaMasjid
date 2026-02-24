// middleware/auth.ts
import { Elysia } from 'elysia';
import jwt from 'jsonwebtoken';
import { query } from '../db/connection';
import { type Admin, isAdmin } from '../types/database';

export interface AuthState {
    admin: Admin;
}

const JWT_SECRET = Bun.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this';

export function generateToken(admin: Admin): string {
    return jwt.sign(
        { id: admin.id, email: admin.email },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
}

export function verifyToken(token: string): { id: number; email: string } {
    return jwt.verify(token, JWT_SECRET) as { id: number; email: string };
}

export const authMiddleware = new Elysia({ name: 'auth-middleware' })
    .derive(async ({ request, set }) => {
        const authHeader = request.headers.get('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            set.status = 401;
            throw new Error('Token tidak ditemukan. Silakan login terlebih dahulu.');
        }

        const token = authHeader.substring(7);

        try {
            const decoded = verifyToken(token);

            // Query dengan typing Admin
            const result = await query<Admin>(
                'SELECT id, email, name FROM admins WHERE id = $1',
                [decoded.id]
            );

            if (result.rows.length === 0) {
                set.status = 401;
                throw new Error('Admin tidak ditemukan.');
            }

            const admin = result.rows[0];

            // Validasi dengan type guard
            if (!isAdmin(admin)) {
                set.status = 500;
                throw new Error('Data admin tidak valid.');
            }

            return { admin };
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                set.status = 401;
                throw new Error('Token tidak valid atau sudah expired.');
            }
            throw error;
        }
    })
    .state('admin', {} as Admin);