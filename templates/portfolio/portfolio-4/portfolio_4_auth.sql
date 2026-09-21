-- ============================================================================
-- CLARA OSWALD (Portfolio Template 4) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/portfolio/portfolio-4/
-- Table Name: portfolio_4_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing portfolio-4 tables if needed (isolated strictly to portfolio_4_)
DROP TABLE IF EXISTS portfolio_4_inquiries CASCADE;
DROP TABLE IF EXISTS portfolio_4_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE portfolio_4_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Design Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_4_users_email ON portfolio_4_users (LOWER(email));

-- 2. Protected Studio Inquiries & Project Briefs Table
CREATE TABLE portfolio_4_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_4_users(id) ON DELETE CASCADE,
    client_name VARCHAR(150) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) DEFAULT 'Digital Product Design Inquiry',
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'SUBMITTED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_4_inquiries_user ON portfolio_4_inquiries (user_id);

-- 3. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_portfolio_4_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_4_users_updated
BEFORE UPDATE ON portfolio_4_users
FOR EACH ROW
EXECUTE FUNCTION update_portfolio_4_timestamp();

-- 4. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO portfolio_4_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a4040404-1111-2222-3333-444444444444',
    'Sophia Laurent',
    'sophia@atelierdesign.com',
    crypt('ClaraOswald2026!', gen_salt('bf', 10)),
    'c4c4c4c4c4c4c4c4',
    'Executive Producer'
),
(
    'b4040404-2222-3333-4444-555555555555',
    'Marcus Vance',
    'marcus.vance@nordicminimal.com',
    crypt('ClaraOswald2026!', gen_salt('bf', 10)),
    'm4m4m4m4m4m4m4m4',
    'Head of Product'
),
(
    'c4040404-3333-4444-5555-666666666666',
    'Clara Oswald',
    'clara@oswald.design',
    crypt('ClaraStudioPrincipal2026!', gen_salt('bf', 10)),
    'p4p4p4p4p4p4p4p4',
    'Studio Principal & Lead Designer'
);

-- 5. Seed Protected Design Project Inquiry
INSERT INTO portfolio_4_inquiries (user_id, client_name, client_email, subject, message, status)
VALUES (
    'a4040404-1111-2222-3333-444444444444',
    'Sophia Laurent',
    'sophia@atelierdesign.com',
    'Editorial UI/UX Design System for Luxury App Launch',
    'We require a bespoke editorial layout system and dynamic product interaction architecture for our Q4 London showcase.',
    'UNDER_REVIEW'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM portfolio_4_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM portfolio_4_users 
WHERE email = 'sophia@atelierdesign.com' AND password_hash = crypt('ClaraOswald2026!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM portfolio_4_users 
WHERE email = 'sophia@atelierdesign.com' AND password_hash = crypt('WrongPassword!', password_hash);

-- Verify duplicate registration handling constraint:
-- Expected error: duplicate key value violates unique constraint "portfolio_4_users_email_key"
-- INSERT INTO portfolio_4_users (full_name, email, password_hash) 
-- VALUES ('Duplicate User', 'sophia@atelierdesign.com', 'test');

-- Verify protected inquiries linked to users:
SELECT i.id, i.client_name, i.client_email, i.subject, i.message, i.status, u.full_name, u.email
FROM portfolio_4_inquiries i
JOIN portfolio_4_users u ON i.user_id = u.id;
