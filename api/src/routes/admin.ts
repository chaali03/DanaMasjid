// routes/admin.routes.ts
import { Elysia } from 'elysia';
import { authMiddleware, type AuthState } from '../middleware/auth';

export const adminRoutes = new Elysia({ prefix: '/admin' })
    .use(authMiddleware)  // semua endpoint di sini butuh auth
    
    .get('/profile', ({ store }) => {
        const auth = store as AuthState;
        return {
            success: true,
            data: auth.admin
        };
    })
    
    .get('/dashboard', ({ store }) => {
        return {
            success: true,
            message: `Welcome ${store.admin.name} to dashboard`
        };
    });