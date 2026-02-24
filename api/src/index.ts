import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';

const app = new Elysia()
  .use(cors())
  .use(swagger({ path: '/docs' }))
  .get('/', () => ({ message: 'Dana Masjid API' }))
  .get('/health', () => ({ status: 'OK' }));

const port = Number(Bun.env.PORT) || 3001;

app.listen(port);
console.log(`API running on http://localhost:${port}`);