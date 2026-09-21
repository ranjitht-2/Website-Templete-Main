-- ============================================================================
-- EVELYN VANCE (Portfolio Template 5) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/portfolio/portfolio-5/
-- Table Name: portfolio_5_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing portfolio-5 tables if needed (isolated strictly to portfolio_5_)
DROP TABLE IF EXISTS portfolio_5_consultation_inquiries CASCADE;
DROP TABLE IF EXISTS portfolio_5_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE portfolio_5_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Design & Engineering Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_5_users_email ON portfolio_5_users (LOWER(email));

-- 2. Dedicated Consultation Inquiries & Project Briefs Table
CREATE TABLE portfolio_5_consultation_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_5_users(id) ON DELETE CASCADE,
    client_name VARCHAR(150) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    package_selected VARCHAR(100) DEFAULT 'Custom Consultation',
    message_brief TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_REVIEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_5_inquiries_user ON portfolio_5_consultation_inquiries (user_id);

-- 3. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_portfolio_5_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_5_users_updated
BEFORE UPDATE ON portfolio_5_users
FOR EACH ROW
EXECUTE FUNCTION update_portfolio_5_timestamp();

-- 4. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO portfolio_5_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a5050505-1111-2222-3333-444444444444',
    'Marcus Thorne',
    'marcus@venturecapital.io',
    crypt('EvelynVance2026!', gen_salt('bf', 10)),
    'v5v5v5v5v5v5v5v5',
    'FinTech Product Director'
),
(
    'b5050505-2222-3333-4444-555555555555',
    'Aria Sterling',
    'aria@luxuryai.design',
    crypt('EvelynVance2026!', gen_salt('bf', 10)),
    'a5a5a5a5a5a5a5a5',
    'Design Operations VP'
),
(
    'c5050505-3333-4444-5555-666666666666',
    'Evelyn Vance',
    'evelyn@vance.design',
    crypt('StudioPrincipal2026!', gen_salt('bf', 10)),
    'e5e5e5e5e5e5e5e5',
    'Principal Software Architect'
);

-- 5. Seed Protected Consultation Inquiry Record
INSERT INTO portfolio_5_consultation_inquiries (user_id, client_name, client_email, package_selected, message_brief, status)
VALUES (
    'a5050505-1111-2222-3333-444444444444',
    'Marcus Thorne',
    'marcus@venturecapital.io',
    'Full Scale Engineering',
    'Full-stack real-time analytics dashboard with reactive micro-frontend architecture and high-contrast dark mode design system.',
    'ACCEPTED'
);

-- ----------------------------------------------------------------------------
-- DBEAVER & SQL VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Verify all users and ensure passwords are encrypted hashes, not plaintext:
SELECT id, full_name, email, role, password_hash, created_at FROM portfolio_5_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM portfolio_5_users 
WHERE email = 'marcus@venturecapital.io' AND password_hash = crypt('EvelynVance2026!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM portfolio_5_users 
WHERE email = 'marcus@venturecapital.io' AND password_hash = crypt('IncorrectPassword!', password_hash);

-- Verify duplicate email prevention constraint (Uncomment to test):
-- INSERT INTO portfolio_5_users (full_name, email, password_hash) 
-- VALUES ('Duplicate User', 'marcus@venturecapital.io', 'some_hash');

-- Verify linked consultation inquiries:
SELECT ci.id, ci.client_name, ci.client_email, ci.package_selected, ci.status, u.full_name, u.email
FROM portfolio_5_consultation_inquiries ci
JOIN portfolio_5_users u ON ci.user_id = u.id;
