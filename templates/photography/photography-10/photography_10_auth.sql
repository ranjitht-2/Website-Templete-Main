-- ============================================================================
-- AETHER STUDIO (Photography Template 10) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/photography/photography-10/
-- Table Name: photography_10_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing photography-10 tables if needed (isolated strictly to photography_10_)
DROP TABLE IF EXISTS photography_10_inquiries CASCADE;
DROP TABLE IF EXISTS photography_10_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE photography_10_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Editorial Patron',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_10_users_email ON photography_10_users (LOWER(email));

-- 2. Protected Project Inquiries Table
CREATE TABLE photography_10_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES photography_10_users(id) ON DELETE CASCADE,
    contact_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    project_details TEXT NOT NULL,
    service_tier VARCHAR(100) DEFAULT 'Archival Fine Art',
    status VARCHAR(50) NOT NULL DEFAULT 'INQUIRY_RECEIVED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_10_inquiries_user ON photography_10_inquiries (user_id);

-- 3. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_photography_10_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_photography_10_users_updated
BEFORE UPDATE ON photography_10_users
FOR EACH ROW
EXECUTE FUNCTION update_photography_10_timestamp();

-- 4. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO photography_10_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a1010101-1111-2222-3333-444444444444',
    'Adeline Laurent',
    'adeline@laurent-estate.com',
    crypt('AetherPass123!', gen_salt('bf', 10)),
    'a10a10a10a10a10a',
    'Editorial Patron'
),
(
    'b1010101-2222-3333-4444-555555555555',
    'Arthur Sterling',
    'arthur@sterling-curated.com',
    crypt('AetherPass123!', gen_salt('bf', 10)),
    'b10b10b10b10b10b',
    'Private Curator'
),
(
    'c1010101-3333-4444-5555-666666666666',
    'Aether Master Studio',
    'director@aether.studio',
    crypt('MasterAether2026!', gen_salt('bf', 10)),
    'd10d10d10d10d10d',
    'Studio Principal'
);

-- 5. Seed Protected Celebration Inquiry
INSERT INTO photography_10_inquiries (user_id, contact_name, email, project_details, service_tier, status)
VALUES (
    'a1010101-1111-2222-3333-444444444444',
    'Adeline Laurent',
    'adeline@laurent-estate.com',
    'Full three-day destination wedding documentary across Florence and Tuscany with medium-format archival prints.',
    'Archival Fine Art',
    'CONFIRMED'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM photography_10_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM photography_10_users 
WHERE email = 'adeline@laurent-estate.com' AND password_hash = crypt('AetherPass123!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM photography_10_users 
WHERE email = 'adeline@laurent-estate.com' AND password_hash = crypt('WrongPassword!', password_hash);

-- Verify duplicate registration handling constraint:
-- Expected error: duplicate key value violates unique constraint "photography_10_users_email_key"
-- INSERT INTO photography_10_users (full_name, email, password_hash) 
-- VALUES ('Duplicate User', 'adeline@laurent-estate.com', 'test');

-- Verify protected project inquiries linked to users:
SELECT i.id, i.contact_name, i.email, i.service_tier, i.project_details, i.status, u.full_name, u.email as user_email
FROM photography_10_inquiries i
JOIN photography_10_users u ON i.user_id = u.id;
