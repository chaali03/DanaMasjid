import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { authRoutes } from './routes/auth';
import { adminRoutes } from './routes/admin';

const app = new Elysia()
    .use(cors())
    .use(swagger({
        path: '/docs',
        documentation: {
            info: { 
                title: 'Dana Masjid API', 
                version: '1.0.0',
                description: 'API untuk manajemen keuangan masjid'
            },
            tags: [
                { name: 'Auth', description: 'Endpoint autentikasi admin' }
            ]
        },
    }))
    
    // Home route
    .get('/', () => ({ 
        message: 'Dana Masjid API',
        docs: '/docs'
    }))
    
    // API Routes - cuma auth doang
    .group('/api', (app) => {
        return app
            .use(authRoutes)
            .use(adminRoutes)
    })
    
    .listen(3001);

console.log(`\n🕌 Dana Masjid API running on http://localhost:${3001}`);
console.log(`📚 Swagger docs: http://localhost:${3001}/docs\n`);