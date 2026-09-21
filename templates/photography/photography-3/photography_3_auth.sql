-- ============================================================================
-- LUMIÈRE STUDIOS (Photography Template 3) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/photography/photography-3/
-- Table Name: photography_3_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing photography-3 tables if needed (isolated strictly to photography_3_)
DROP TABLE IF EXISTS photography_3_bookings CASCADE;
DROP TABLE IF EXISTS photography_3_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE photography_3_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Fine Art Wedding Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_3_users_email ON photography_3_users (LOWER(email));

-- 2. Protected Booking & Commission Inquiries Table
CREATE TABLE photography_3_bookings (
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

CREATE INDEX idx_photography_3_bookings_user ON photography_3_bookings (user_id);

-- 3. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_photography_3_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_photography_3_users_updated
BEFORE UPDATE ON photography_3_users
FOR EACH ROW
EXECUTE FUNCTION update_photography_3_timestamp();

-- 4. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO photography_3_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a3333333-1111-2222-3333-444444444444',
    'Amara & David Johnson',
    'amara@lumierestudios.com',
    crypt('lumiere123', gen_salt('bf', 10)),
    'a3a3a3a3a3a3a3a3',
    'Fine Art Wedding Client'
),
(
    'b3333333-2222-3333-4444-555555555555',
    'Jonathan & Clara Bell',
    'clara@lumierestudios.com',
    crypt('lumiere123', gen_salt('bf', 10)),
    'b3b3b3b3b3b3b3b3',
    'Cinematography Client'
),
(
    'c3333333-3333-4444-5555-666666666666',
    'Lumière Creative Director',
    'director@lumierestudios.com',
    crypt('LumiereMaster2026!', gen_salt('bf', 10)),
    'd3d3d3d3d3d3d3d3',
    'Studio Principal'
);

-- 5. Seed Protected Wedding Booking Inquiry
INSERT INTO photography_3_bookings (user_id, client_name, email, event_date, event_location, celebration_details, status)
VALUES (
    'a3333333-1111-2222-3333-444444444444',
    'Amara & David Johnson',
    'amara@lumierestudios.com',
    '2026-09-18',
    'Soho Manor, NY',
    'Editorial garden wedding portraiture + 4K highlight cinema capture.',
    'CONFIRMED'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM photography_3_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM photography_3_users 
WHERE email = 'amara@lumierestudios.com' AND password_hash = crypt('lumiere123', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM photography_3_users 
WHERE email = 'amara@lumierestudios.com' AND password_hash = crypt('WrongPassword!', password_hash);

-- Verify duplicate registration handling constraint:
-- Expected error: duplicate key value violates unique constraint "photography_3_users_email_key"
-- INSERT INTO photography_3_users (full_name, email, password_hash) 
-- VALUES ('Duplicate Client', 'amara@lumierestudios.com', 'test');

-- Verify protected project bookings linked to users:
SELECT b.id, b.client_name, b.email, b.event_date, b.event_location, b.celebration_details, b.status, u.full_name
FROM photography_3_bookings b
JOIN photography_3_users u ON b.user_id = u.id;
