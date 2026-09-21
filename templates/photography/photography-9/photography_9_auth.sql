-- ============================================================================
-- BLUSH LENS (Photography Template 9) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/photography/photography-9/
-- Table Name: photography_9_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing photography-9 tables if needed (isolated strictly to photography_9_)
DROP TABLE IF EXISTS photography_9_inquiries CASCADE;
DROP TABLE IF EXISTS photography_9_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE photography_9_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Boutique Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_9_users_email ON photography_9_users (LOWER(email));

-- 2. Protected Session Inquiries Table
CREATE TABLE photography_9_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES photography_9_users(id) ON DELETE CASCADE,
    couple_names VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    celebration_details TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'INQUIRY_RECEIVED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_9_inquiries_user ON photography_9_inquiries (user_id);

-- 3. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_photography_9_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_photography_9_users_updated
BEFORE UPDATE ON photography_9_users
FOR EACH ROW
EXECUTE FUNCTION update_photography_9_timestamp();

-- 4. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO photography_9_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a9999999-1111-2222-3333-444444444444',
    'Sarah Jenkins',
    'sarah@example.com',
    crypt('BlushPass123!', gen_salt('bf', 10)),
    'b9b9b9b9b9b9b9b9',
    'Wedding Couple'
),
(
    'b9999999-2222-3333-4444-555555555555',
    'David Sterling',
    'david@example.com',
    crypt('BlushPass123!', gen_salt('bf', 10)),
    'd9d9d9d9d9d9d9d9',
    'Editorial Client'
),
(
    'c9999999-3333-4444-5555-666666666666',
    'Creative Director',
    'director@blushlens.luxury',
    crypt('BlushStudio2026!', gen_salt('bf', 10)),
    'c9c9c9c9c9c9c9c9',
    'Executive Director'
);

-- 5. Seed Protected Session Inquiry
INSERT INTO photography_9_inquiries (user_id, couple_names, email, celebration_details, status)
VALUES (
    'a9999999-1111-2222-3333-444444444444',
    'Sarah & David',
    'sarah@example.com',
    'Destination boutique wedding in Provence, France. Classic romance aesthetic with soft blush tones and 35mm film coverage.',
    'CONFIRMED'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM photography_9_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM photography_9_users 
WHERE email = 'sarah@example.com' AND password_hash = crypt('BlushPass123!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM photography_9_users 
WHERE email = 'sarah@example.com' AND password_hash = crypt('WrongPassword!', password_hash);

-- Verify duplicate registration handling constraint:
-- Expected error: duplicate key value violates unique constraint "photography_9_users_email_key"
-- INSERT INTO photography_9_users (full_name, email, password_hash) 
-- VALUES ('Duplicate User', 'sarah@example.com', 'test');

-- Verify protected session inquiries linked to users:
SELECT i.id, i.couple_names, i.email, i.celebration_details, i.status, u.full_name, u.email as user_email
FROM photography_9_inquiries i
JOIN photography_9_users u ON i.user_id = u.id;
