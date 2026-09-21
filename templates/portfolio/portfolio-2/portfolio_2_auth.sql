-- ============================================================================
-- AIDEN DRAKE (Portfolio Template 2) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/portfolio/portfolio-2/
-- Table Name: portfolio_2_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing portfolio-2 tables if needed (isolated strictly to portfolio_2_)
DROP TABLE IF EXISTS portfolio_2_project_inquiries CASCADE;
DROP TABLE IF EXISTS portfolio_2_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE portfolio_2_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Client Partner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_2_users_email ON portfolio_2_users (LOWER(email));

-- 2. Protected Project Inquiries Table
CREATE TABLE portfolio_2_project_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_2_users(id) ON DELETE CASCADE,
    client_name VARCHAR(150) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    project_scope TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'INQUIRY_RECEIVED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_2_inquiries_user ON portfolio_2_project_inquiries (user_id);

-- 3. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_portfolio_2_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_2_users_updated
BEFORE UPDATE ON portfolio_2_users
FOR EACH ROW
EXECUTE FUNCTION update_portfolio_2_timestamp();

-- 4. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO portfolio_2_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a2020202-1111-2222-3333-444444444444',
    'Marcus Vance',
    'marcus@vancedesign.com',
    crypt('AidenDrake2026!', gen_salt('bf', 10)),
    'a2a2a2a2a2a2a2a2',
    'Senior Product Lead'
),
(
    'b2020202-2222-3333-4444-555555555555',
    'Sarah Lin',
    'sarah.lin@fintechinnovate.io',
    crypt('AidenDrake2026!', gen_salt('bf', 10)),
    's2s2s2s2s2s2s2s2',
    'Design Systems Director'
),
(
    'c2020202-3333-4444-5555-666666666666',
    'Aiden Drake',
    'aiden@aidendrake.design',
    crypt('AidenDrakePrincipal2026!', gen_salt('bf', 10)),
    'p2p2p2p2p2p2p2p2',
    'Principal Architect'
);

-- 5. Seed Protected Project Inquiry
INSERT INTO portfolio_2_project_inquiries (user_id, client_name, client_email, project_scope, status)
VALUES (
    'a2020202-1111-2222-3333-444444444444',
    'Marcus Vance',
    'marcus@vancedesign.com',
    'Next-Gen FinTech Mobile Design System & React Architecture with high-performance dark mode animations.',
    'INQUIRY_RECEIVED'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM portfolio_2_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM portfolio_2_users 
WHERE email = 'marcus@vancedesign.com' AND password_hash = crypt('AidenDrake2026!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM portfolio_2_users 
WHERE email = 'marcus@vancedesign.com' AND password_hash = crypt('WrongPassword!', password_hash);

-- Verify duplicate registration handling constraint:
-- Expected error: duplicate key value violates unique constraint "portfolio_2_users_email_key"
-- INSERT INTO portfolio_2_users (full_name, email, password_hash) 
-- VALUES ('Duplicate User', 'marcus@vancedesign.com', 'test');

-- Verify protected project inquiries linked to users:
SELECT b.id, b.client_name, b.client_email, b.project_scope, b.status, u.full_name, u.email
FROM portfolio_2_project_inquiries b
JOIN portfolio_2_users u ON b.user_id = u.id;
