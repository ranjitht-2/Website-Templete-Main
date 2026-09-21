-- ============================================================================
-- LUMIÈRE STUDIOS (Photography Template 3) - PostgreSQL Schema Definition
-- Target Template: /templates/photography/photography-3/
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS photography_3_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Fine Art Wedding Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_photography_3_users_email ON photography_3_users (LOWER(email));

CREATE TABLE IF NOT EXISTS photography_3_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES photography_3_users(id) ON DELETE CASCADE,
    client_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    event_date DATE NULL,
    event_location VARCHAR(200) NOT NULL,
    celebration_details TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'INQUIRY_RECEIVED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_photography_3_bookings_user ON photography_3_bookings (user_id);
