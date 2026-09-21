-- ============================================================================
-- SNAPFOLIO (Photography Template 1) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/photography/photography-1/
-- Table Name: photography_1_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing photography-1 tables if needed (isolated strictly to photography_1_)
DROP TABLE IF EXISTS photography_1_bookings CASCADE;
DROP TABLE IF EXISTS photography_1_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE photography_1_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Client Member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_1_users_email ON photography_1_users (LOWER(email));

-- 2. Protected Photography Booking Inquiries Table
CREATE TABLE photography_1_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES photography_1_users(id) ON DELETE CASCADE,
    client_name VARCHAR(150) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    package_type VARCHAR(100) NOT NULL,
    project_details TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_REVIEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_1_bookings_user ON photography_1_bookings (user_id);

-- 3. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_photography_1_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_photography_1_users_updated
BEFORE UPDATE ON photography_1_users
FOR EACH ROW
EXECUTE FUNCTION update_photography_1_timestamp();

-- 4. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO photography_1_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a1111111-2222-3333-4444-555555555555',
    'Elena Rostova',
    'elena@example.com',
    crypt('SnapFolio123!', gen_salt('bf', 10)),
    'e1e2e3e4e5e6e7e8',
    'Editorial Collector'
),
(
    'b2222222-3333-4444-5555-666666666666',
    'Marcus Vance',
    'marcus@example.com',
    crypt('SnapFolio123!', gen_salt('bf', 10)),
    'm1m2m3m4m5m6m7m8',
    'Client Patron'
),
(
    'c3333333-4444-5555-6666-777777777777',
    'Alex Rivers',
    'alex@snapfolio.example',
    crypt('MasterLens123!', gen_salt('bf', 10)),
    'a1a2a3a4a5a6a7a8',
    'Lead Visual Storyteller'
);

-- 5. Seed Protected Booking Inquiry
INSERT INTO photography_1_bookings (user_id, client_name, client_email, package_type, project_details, status)
VALUES (
    'a1111111-2222-3333-4444-555555555555',
    'Elena Rostova',
    'elena@example.com',
    'Portrait Shoot Session ($250)',
    'High fashion studio shoot with dramatic high-contrast lighting for magazine editorial cover.',
    'CONFIRMED'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM photography_1_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM photography_1_users 
WHERE email = 'elena@example.com' AND password_hash = crypt('SnapFolio123!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM photography_1_users 
WHERE email = 'elena@example.com' AND password_hash = crypt('WrongPassword123', password_hash);

-- Verify duplicate registration handling constraint:
-- Expected error: duplicate key value violates unique constraint "photography_1_users_email_key"
-- INSERT INTO photography_1_users (full_name, email, password_hash) 
-- VALUES ('Duplicate User', 'elena@example.com', 'test');

-- Verify protected booking inquiries linked to users:
SELECT b.id, b.client_name, b.package_type, b.project_details, b.status, u.email as user_email
FROM photography_1_bookings b
JOIN photography_1_users u ON b.user_id = u.id;
