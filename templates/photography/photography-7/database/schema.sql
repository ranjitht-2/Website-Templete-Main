-- Dedicated PostgreSQL schema for Photography Template 7 (Lume Studio)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS photography_7_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Editorial Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_photography_7_users_email ON photography_7_users (LOWER(email));

CREATE TABLE IF NOT EXISTS photography_7_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES photography_7_users(id) ON DELETE CASCADE,
    contact_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    project_details TEXT NOT NULL,
    service_type VARCHAR(100) DEFAULT 'Editorial & Fashion',
    status VARCHAR(50) NOT NULL DEFAULT 'INQUIRY_RECEIVED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_photography_7_inquiries_user ON photography_7_inquiries (user_id);
