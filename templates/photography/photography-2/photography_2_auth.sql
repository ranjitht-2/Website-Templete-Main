-- ============================================================================
-- L'OMBRE PHOTO STUDIO (Photography Template 2) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/photography/photography-2/
-- Table Name: photography_2_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing photography-2 tables if needed (isolated strictly to photography_2_)
DROP TABLE IF EXISTS photography_2_inquiries CASCADE;
DROP TABLE IF EXISTS photography_2_users CASCADE;

-- 1. Dedicated Authentication Table
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

-- 2. Protected Project Inquiries Table
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

-- 3. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_photography_2_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_photography_2_users_updated
BEFORE UPDATE ON photography_2_users
FOR EACH ROW
EXECUTE FUNCTION update_photography_2_timestamp();

-- 4. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO photography_2_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a2222222-3333-4444-5555-666666666666',
    'Clara Delacroix',
    'clara@example.com',
    crypt('LOmbrePass123!', gen_salt('bf', 10)),
    'c1c2c3c4c5c6c7c8',
    'Fine Art Collector'
),
(
    'b3333333-4444-5555-6666-777777777777',
    'Julian Laurent',
    'julian@example.com',
    crypt('LOmbrePass123!', gen_salt('bf', 10)),
    'j1j2j3j4j5j6j7j8',
    'Editorial Curator'
),
(
    'c4444444-5555-6666-7777-888888888888',
    'Studio Director',
    'director@photostudio.luxury',
    crypt('MasterLens2026!', gen_salt('bf', 10)),
    's1s2s3s4s5s6s7s8',
    'Executive Art Director'
);

-- 5. Seed Protected Project Inquiry
INSERT INTO photography_2_inquiries (user_id, first_name, last_name, email, project_genre, project_concept, status)
VALUES (
    'a2222222-3333-4444-5555-666666666666',
    'Clara',
    'Delacroix',
    'clara@example.com',
    'Editorial Campaign',
    'Minimalist French couture collection shoot utilizing high-contrast chiaroscuro lighting and natural stone architectures.',
    'CONFIRMED'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM photography_2_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM photography_2_users 
WHERE email = 'clara@example.com' AND password_hash = crypt('LOmbrePass123!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM photography_2_users 
WHERE email = 'clara@example.com' AND password_hash = crypt('WrongPassword!', password_hash);

-- Verify duplicate registration handling constraint:
-- Expected error: duplicate key value violates unique constraint "photography_2_users_email_key"
-- INSERT INTO photography_2_users (full_name, email, password_hash) 
-- VALUES ('Duplicate User', 'clara@example.com', 'test');

-- Verify protected project inquiries linked to users:
SELECT i.id, i.first_name, i.last_name, i.project_genre, i.project_concept, i.status, u.email as user_email
FROM photography_2_inquiries i
JOIN photography_2_users u ON i.user_id = u.id;
