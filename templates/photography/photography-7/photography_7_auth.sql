-- ============================================================================
-- LUME STUDIO (Photography Template 7) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/photography/photography-7/
-- Table Name: photography_7_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing photography-7 tables if needed (isolated strictly to photography_7_)
DROP TABLE IF EXISTS photography_7_inquiries CASCADE;
DROP TABLE IF EXISTS photography_7_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE photography_7_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Editorial Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_7_users_email ON photography_7_users (LOWER(email));

-- 2. Protected Project & Booking Inquiries Table
CREATE TABLE photography_7_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES photography_7_users(id) ON DELETE CASCADE,
    contact_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    project_details TEXT NOT NULL,
    service_type VARCHAR(100) DEFAULT 'Editorial & Fashion',
    status VARCHAR(50) NOT NULL DEFAULT 'INQUIRY_RECEIVED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_7_inquiries_user ON photography_7_inquiries (user_id);

-- 3. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_photography_7_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_photography_7_users_updated
BEFORE UPDATE ON photography_7_users
FOR EACH ROW
EXECUTE FUNCTION update_photography_7_timestamp();

-- 4. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO photography_7_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a7777777-1111-2222-3333-444444444444',
    'Sarah Jenkins',
    'sarah@velour.com',
    crypt('LumePass123!', gen_salt('bf', 10)),
    'l7l7l7l7l7l7l7l7',
    'Creative Director'
),
(
    'b7777777-2222-3333-4444-555555555555',
    'Marcus Aurelius',
    'marcus@zenith.com',
    crypt('LumePass123!', gen_salt('bf', 10)),
    'm7m7m7m7m7m7m7m7',
    'Brand Producer'
),
(
    'c7777777-3333-4444-5555-666666666666',
    'Lume Studio Lead',
    'director@lume-studio.com',
    crypt('MasterLume2026!', gen_salt('bf', 10)),
    'd7d7d7d7d7d7d7d7',
    'Lead Photographer'
);

-- 5. Seed Protected Project Inquiry
INSERT INTO photography_7_inquiries (user_id, contact_name, email, project_details, service_type, status)
VALUES (
    'a7777777-1111-2222-3333-444444444444',
    'Sarah Jenkins',
    'sarah@velour.com',
    'Editorial cover shoot and 8-page spring haute couture fashion spread on location in Manhattan.',
    'Editorial & Fashion',
    'CONFIRMED'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM photography_7_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM photography_7_users 
WHERE email = 'sarah@velour.com' AND password_hash = crypt('LumePass123!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM photography_7_users 
WHERE email = 'sarah@velour.com' AND password_hash = crypt('WrongPassword!', password_hash);

-- Verify duplicate registration handling constraint:
-- Expected error: duplicate key value violates unique constraint "photography_7_users_email_key"
-- INSERT INTO photography_7_users (full_name, email, password_hash) 
-- VALUES ('Duplicate User', 'sarah@velour.com', 'test');

-- Verify protected project inquiries linked to users:
SELECT i.id, i.contact_name, i.email, i.service_type, i.project_details, i.status, u.full_name, u.email as user_email
FROM photography_7_inquiries i
JOIN photography_7_users u ON i.user_id = u.id;
