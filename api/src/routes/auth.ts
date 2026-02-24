// routes/auth.routes.ts
import { Elysia, t } from 'elysia';
import bcrypt from 'bcryptjs';
import { query } from '../db/connection';
import { generateToken } from '../middleware/auth';
import { 
    type Admin, 
    type AdminWithPassword, 
    type AdminResult,
    isAdminWithPassword 
} from '../types/database';

// Schema validasi untuk login
const LoginSchema = t.Object({
    email: t.String({
        format: 'email',
        error: 'Format email tidak valid'
    }),
    password: t.String({
        minLength: 1,
        error: 'Password wajib diisi'
    })
});

// Schema validasi untuk register
const RegisterSchema = t.Object({
    email: t.String({
        format: 'email',
        error: 'Format email tidak valid'
    }),
    password: t.String({
        minLength: 6,
        error: 'Password minimal 6 karakter'
    }),
    name: t.String({
        minLength: 1,
        error: 'Nama wajib diisi'
    })
});

export const authRoutes = new Elysia({ prefix: '/auth' })
    .post('/login', async ({ body, set }) => {
        const { email, password } = body as { email: string; password: string };

        if (!email || !password) {
            set.status = 400;
            return {
                success: false,
                message: 'Email dan password wajib diisi'
            };
        }

        // Query dengan typing AdminWithPassword
        const result = await query<AdminWithPassword>(
            'SELECT id, email, name, password_hash FROM admins WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            set.status = 401;
            return {
                success: false,
                message: 'Email atau password salah'
            };
        }

        const admin = result.rows[0];

        // Validasi dengan type guard (opsional, untuk keamanan ekstra)
        if (!isAdminWithPassword(admin)) {
            console.error('Invalid admin data from database');
            set.status = 500;
            return {
                success: false,
                message: 'Terjadi kesalahan internal'
            };
        }

        const isValid = await bcrypt.compare(password, admin.password_hash);
        if (!isValid) {
            set.status = 401;
            return {
                success: false,
                message: 'Email atau password salah'
            };
        }

        // Buat object admin tanpa password_hash untuk token
        const adminForToken: Admin = {
            id: admin.id,
            email: admin.email,
            name: admin.name
        };

        const token = generateToken(adminForToken);

        return {
            success: true,
            message: 'Login berhasil',
            data: {
                token,
                admin: adminForToken
            }
        };
    }, {
        body: LoginSchema
    })

// routes/auth.routes.ts - Bagian register
.post('/register', async ({ body, set }) => {
    const { email, password, name } = body as { email: string; password: string; name: string };

    try {
        // Log request
        console.log('[REGISTER] Attempting to register:', { email, name });

        // Validasi email sudah terdaftar
        const existingAdmin = await query<{ id: number }>(
            'SELECT id FROM admins WHERE email = $1',
            [email]
        );

        if (existingAdmin.rows.length > 0) {
            console.log('[REGISTER] Email already exists:', email);
            set.status = 409;
            return {
                success: false,
                message: 'Email sudah terdaftar'
            };
        }

        // Hash password
        console.log('[REGISTER] Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log('[REGISTER] Password hashed successfully');

        // Insert admin baru
        console.log('[REGISTER] Inserting admin to database...');
        const result = await query<AdminWithPassword>(
            `INSERT INTO admins (email, password_hash, name) 
             VALUES ($1, $2, $3) 
             RETURNING id, email, name, password_hash`,
            [email, hashedPassword, name]
        );

        console.log('[REGISTER] Database insert result:', result.rows[0]);

        if (result.rows.length === 0) {
            throw new Error('No data returned after insert');
        }

        const newAdmin = result.rows[0];

        // Buat response
        const adminResponse: Admin = {
            id: newAdmin.id,
            email: newAdmin.email,
            name: newAdmin.name
        };

        const token = generateToken(adminResponse);

        console.log('[REGISTER] Registration successful for:', email);

        return {
            success: true,
            message: 'Registrasi berhasil',
            data: {
                token,
                admin: adminResponse
            }
        };
    } catch (error) {
        // Log error detail
        console.error('[REGISTER] Detailed error:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            error: error
        });

        set.status = 500;
        return {
            success: false,
            message: 'Terjadi kesalahan saat registrasi',
            // Hanya untuk development, jangan tampilkan di production
            ...(Bun.env.NODE_ENV === 'development' && {
                debug: error instanceof Error ? error.message : String(error)
            })
        };
    }
})

    // Optional: Endpoint untuk mendapatkan profile admin yang sedang login
    .get('/profile', async ({ headers, set }) => {
        try {
            const authHeader = headers.authorization;
            
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                set.status = 401;
                return {
                    success: false,
                    message: 'Token tidak ditemukan'
                };
            }

            const token = authHeader.substring(7);
            
            // Verify token dan dapatkan admin info (implementasi sesuai kebutuhan)
            // Ini hanya contoh sederhana, sebaiknya pakai middleware yang sudah ada
            
            return {
                success: true,
                message: 'Profile berhasil diambil',
                data: null // Isi dengan data admin dari token
            };
        } catch (error) {
            set.status = 401;
            return {
                success: false,
                message: 'Token tidak valid'
            };
        }
    });