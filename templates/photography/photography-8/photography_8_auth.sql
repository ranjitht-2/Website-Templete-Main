-- ============================================================================
-- SAGE & SHUTTER (Photography Template 8) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/photography/photography-8/
-- Table Name: photography_8_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing photography-8 tables if needed (isolated strictly to photography_8_)
DROP TABLE IF EXISTS photography_8_commissions CASCADE;
DROP TABLE IF EXISTS photography_8_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE photography_8_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Commission Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_8_users_email ON photography_8_users (LOWER(email));

-- 2. Protected Commission Reservations Table
CREATE TABLE photography_8_commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES photography_8_users(id) ON DELETE CASCADE,
    celebration_date VARCHAR(150) NOT NULL,
    venue_location VARCHAR(255) NOT NULL,
    styling_details TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'RESERVED_PENDING_BRIEF',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_8_commissions_user ON photography_8_commissions (user_id);

-- 3. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_photography_8_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_photography_8_users_updated
BEFORE UPDATE ON photography_8_users
FOR EACH ROW
EXECUTE FUNCTION update_photography_8_timestamp();

-- 4. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO photography_8_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a8888888-1111-2222-3333-444444444444',
    'Amara Johnson',
    'amara@example.com',
    crypt('SagePass123!', gen_salt('bf', 10)),
    's8s8s8s8s8s8s8s8',
    'Wedding Couple'
),
(
    'b8888888-2222-3333-4444-555555555555',
    'Marcus Sterling',
    'marcus@example.com',
    crypt('SagePass123!', gen_salt('bf', 10)),
    'm8m8m8m8m8m8m8m8',
    'Destination Client'
),
(
    'c8888888-3333-4444-5555-666666666666',
    'Principal Curator',
    'curator@sageandwillow.com',
    crypt('MasterArchival2026!', gen_salt('bf', 10)),
    'p8p8p8p8p8p8p8p8',
    'Studio Lead'
);

-- 5. Seed Protected Commission Reservation
INSERT INTO photography_8_commissions (user_id, celebration_date, venue_location, styling_details, status)
VALUES (
    'a8888888-1111-2222-3333-444444444444',
    'June 12th, 2027',
    'Villa Del Balbianello, Lake Como, Italy',
    'Intimate 40-guest editorial ceremony, warm linen florals, sunset boat session, 35mm film archival capture.',
    'CONFIRMED_DATE'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM photography_8_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM photography_8_users 
WHERE email = 'amara@example.com' AND password_hash = crypt('SagePass123!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM photography_8_users 
WHERE email = 'amara@example.com' AND password_hash = crypt('WrongPassword!', password_hash);

-- Verify duplicate registration handling constraint:
-- Expected error: duplicate key value violates unique constraint "photography_8_users_email_key"
-- INSERT INTO photography_8_users (full_name, email, password_hash) 
-- VALUES ('Duplicate User', 'amara@example.com', 'test');

-- Verify protected commission reservations linked to users:
SELECT c.id, c.celebration_date, c.venue_location, c.styling_details, c.status, u.full_name, u.email
FROM photography_8_commissions c
JOIN photography_8_users u ON c.user_id = u.id;
