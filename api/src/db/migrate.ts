import { pool, query } from './connection';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function migrate() {
    console.log('🚀 Starting database migration...\n');

    await query(`
        CREATE TABLE IF NOT EXISTS _migrations (
            id SERIAL PRIMARY KEY,
            filename VARCHAR(255) UNIQUE NOT NULL,
            applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);

    const migrationsDir = join(__dirname, 'migrations');
    
    const files = await readdir(migrationsDir);
    const sqlFiles = files
        .filter((f) => f.endsWith('.sql'))
        .sort();

    const applied = await query<{ filename: string }>('SELECT filename FROM _migrations ORDER BY filename');
    const appliedSet = new Set(applied.rows.map((r) => r.filename));

    let migrationsRun = 0;

    for (const file of sqlFiles) {
        if (appliedSet.has(file)) {
            console.log(`⏭️  Skipping (already applied): ${file}`);
            continue;
        }

        console.log(`📄 Applying migration: ${file}`);

        const filePath = join(migrationsDir, file);
        const sql = await readFile(filePath, 'utf-8');

        try {
            await query('BEGIN');
            await query(sql);
            await query('INSERT INTO _migrations (filename) VALUES ($1)', [file]);
            await query('COMMIT');
            console.log(`✅ Applied: ${file}\n`);
            migrationsRun++;
        } catch (error) {
            await query('ROLLBACK');
            console.error(`❌ Failed to apply: ${file}`, error);
            process.exit(1);
        }
    }

    if (migrationsRun === 0) {
        console.log('\n✨ No new migrations to apply. Database is up to date.');
    } else {
        console.log(`\n✨ Successfully applied ${migrationsRun} migration(s).`);
    }

    await pool.end();
}

migrate().catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
});