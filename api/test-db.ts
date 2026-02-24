import { query } from './src/db/connection';

async function testDB() {
    try {
        const result = await query('SELECT NOW()');
        console.log('✅ Database connected!');
        console.log('Server time:', result.rows[0].now);
        
        // Test query users
        const users = await query('SELECT COUNT(*) as total FROM users');
        console.log('Total users:', users.rows[0].total);
        
    } catch (error) {
        console.error('❌ Database connection failed:');
        console.error(error);
    } finally {
        process.exit();
    }
}

testDB();