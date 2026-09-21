-- ============================================================================
-- AURA STUDIO (Photography Template 5) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/photography/photography-5/
-- Table Name: photography_5_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing photography-5 tables if needed (isolated strictly to photography_5_)
DROP TABLE IF EXISTS photography_5_inquiries CASCADE;
DROP TABLE IF EXISTS photography_5_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE photography_5_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Fine Art Patron',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_5_users_email ON photography_5_users (LOWER(email));

-- 2. Protected Studio & Print Acquisition Inquiries Table
CREATE TABLE photography_5_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES photography_5_users(id) ON DELETE CASCADE,
    contact_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    series_title VARCHAR(150) NOT NULL,
    inquiry_details TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'INQUIRY_RECEIVED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_5_inquiries_user ON photography_5_inquiries (user_id);

-- 3. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_photography_5_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_photography_5_users_updated
BEFORE UPDATE ON photography_5_users
FOR EACH ROW
EXECUTE FUNCTION update_photography_5_timestamp();

-- 4. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO photography_5_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a5555555-1111-2222-3333-444444444444',
    'Henrik Vanger',
    'henrik@vanger-gallery.com',
    crypt('AuraPass123!', gen_salt('bf', 10)),
    'a5a5a5a5a5a5a5a5',
    'Gallery Curator'
),
(
    'b5555555-2222-3333-4444-555555555555',
    'Astrid Lindholm',
    'astrid@lindholm-art.se',
    crypt('AuraPass123!', gen_salt('bf', 10)),
    'b5b5b5b5b5b5b5b5',
    'Fine Art Collector'
),
(
    'c5555555-3333-4444-5555-666666666666',
    'Aura Studio Director',
    'director@aura-studio.com',
    crypt('MasterAura2026!', gen_salt('bf', 10)),
    'd5d5d5d5d5d5d5d5',
    'Studio Principal'
);

-- 5. Seed Protected Print Acquisition Inquiry
INSERT INTO photography_5_inquiries (user_id, contact_name, email, series_title, inquiry_details, status)
VALUES (
    'a5555555-1111-2222-3333-444444444444',
    'Henrik Vanger',
    'henrik@vanger-gallery.com',
    'The Architecture of Solitude',
    'Inquiring about limited edition 40x60 archival pigment prints for upcoming winter exhibition in Stockholm.',
    'CONFIRMED'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM photography_5_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM photography_5_users 
WHERE email = 'henrik@vanger-gallery.com' AND password_hash = crypt('AuraPass123!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM photography_5_users 
WHERE email = 'henrik@vanger-gallery.com' AND password_hash = crypt('WrongPassword!', password_hash);

-- Verify duplicate registration handling constraint:
-- Expected error: duplicate key value violates unique constraint "photography_5_users_email_key"
-- INSERT INTO photography_5_users (full_name, email, password_hash) 
-- VALUES ('Duplicate Patron', 'henrik@vanger-gallery.com', 'test');

-- Verify protected project inquiries linked to users:
SELECT i.id, i.contact_name, i.email, i.series_title, i.inquiry_details, i.status, u.full_name, u.email as user_email
FROM photography_5_inquiries i
JOIN photography_5_users u ON i.user_id = u.id;
