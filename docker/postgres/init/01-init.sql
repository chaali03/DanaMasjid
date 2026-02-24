-- Docker init script - minimal setup
-- Full schema is managed through migrations (api/src/db/migrations/)
-- This script only ensures the database and extensions exist

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
