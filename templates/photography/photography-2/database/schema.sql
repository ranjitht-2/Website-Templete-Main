-- ============================================================================
-- L'OMBRE PHOTO STUDIO (Photography Template 2) - POSTGRESQL SCHEMA
-- Target Template: /templates/photography/photography-2/
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS photography_2_inquiries CASCADE;
DROP TABLE IF EXISTS photography_2_users CASCADE;

CREATE TABLE photography_2_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Editorial Patron',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_2_users_email ON photography_2_users (LOWER(email));

CREATE TABLE photography_2_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES photography_2_users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    project_genre VARCHAR(100) NOT NULL,
    project_concept TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_REVIEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_2_inquiries_user ON photography_2_inquiries (user_id);
