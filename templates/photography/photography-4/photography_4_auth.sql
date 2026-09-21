-- ============================================================================
-- EDEN ROSE (Photography Template 4) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/photography/photography-4/
-- Table Name: photography_4_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing photography-4 tables if needed (isolated strictly to photography_4_)
DROP TABLE IF EXISTS photography_4_inquiries CASCADE;
DROP TABLE IF EXISTS photography_4_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE photography_4_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Couture Wedding Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_4_users_email ON photography_4_users (LOWER(email));

-- 2. Protected Couture Wedding Inquiries Table
CREATE TABLE photography_4_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES photography_4_users(id) ON DELETE CASCADE,
    client_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    event_details TEXT NOT NULL,
    destination VARCHAR(150) NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'INQUIRY_RECEIVED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_4_inquiries_user ON photography_4_inquiries (user_id);

-- 3. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_photography_4_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_photography_4_users_updated
BEFORE UPDATE ON photography_4_users
FOR EACH ROW
EXECUTE FUNCTION update_photography_4_timestamp();

-- 4. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO photography_4_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a4444444-1111-2222-3333-444444444444',
    'Clara & Julian Vane',
    'clara@edenrose.com',
    crypt('couture123', gen_salt('bf', 10)),
    'a4a4a4a4a4a4a4a4',
    'Couture Wedding Client'
),
(
    'b4444444-2222-3333-4444-555555555555',
    'Alexander Wright',
    'alexander@edenrose.com',
    crypt('couture123', gen_salt('bf', 10)),
    'b4b4b4b4b4b4b4b4',
    'Destination VIP Client'
),
(
    'c4444444-3333-4444-5555-666666666666',
    'Eden Rose Studio Director',
    'concierge@edenrose.com',
    crypt('EdenRose2026!', gen_salt('bf', 10)),
    'd4d4d4d4d4d4d4d4',
    'Principal Photographer'
);

-- 5. Seed Protected Couture Wedding Inquiry
INSERT INTO photography_4_inquiries (user_id, client_name, email, event_details, destination, status)
VALUES (
    'a4444444-1111-2222-3333-444444444444',
    'Clara & Julian Vane',
    'clara@edenrose.com',
    'Villa Cora 3-day wedding celebration in Florence with 35mm archival film coverage.',
    'Florence, Italy',
    'CONFIRMED'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM photography_4_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM photography_4_users 
WHERE email = 'clara@edenrose.com' AND password_hash = crypt('couture123', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM photography_4_users 
WHERE email = 'clara@edenrose.com' AND password_hash = crypt('WrongPass!', password_hash);

-- Verify duplicate registration handling constraint:
-- Expected error: duplicate key value violates unique constraint "photography_4_users_email_key"
-- INSERT INTO photography_4_users (full_name, email, password_hash) 
-- VALUES ('Duplicate Client', 'clara@edenrose.com', 'test');

-- Verify protected project inquiries linked to users:
SELECT i.id, i.client_name, i.email, i.event_details, i.destination, i.status, u.full_name, u.email as user_email
FROM photography_4_inquiries i
JOIN photography_4_users u ON i.user_id = u.id;
