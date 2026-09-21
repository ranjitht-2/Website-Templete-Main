-- ============================================================================
-- EDEN ROSE (Photography Template 4) - PostgreSQL Schema Definition
-- Target Template: /templates/photography/photography-4/
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS photography_4_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Couture Wedding Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_photography_4_users_email ON photography_4_users (LOWER(email));

CREATE TABLE IF NOT EXISTS photography_4_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES photography_4_users(id) ON DELETE CASCADE,
    client_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    event_details TEXT NOT NULL,
    destination VARCHAR(150) NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'INQUIRY_RECEIVED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_photography_4_inquiries_user ON photography_4_inquiries (user_id);
