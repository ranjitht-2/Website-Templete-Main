-- ============================================================================
-- SASHA GREY (Portfolio Template 3) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/portfolio/portfolio-3/
-- Table Name: portfolio_3_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing portfolio-3 tables if needed (isolated strictly to portfolio_3_)
DROP TABLE IF EXISTS portfolio_3_project_briefs CASCADE;
DROP TABLE IF EXISTS portfolio_3_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE portfolio_3_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Editorial Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_3_users_email ON portfolio_3_users (LOWER(email));

-- 2. Protected Project Briefs / Design Inquiries Table
CREATE TABLE portfolio_3_project_briefs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_3_users(id) ON DELETE CASCADE,
    client_name VARCHAR(150) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    design_parameters TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'BRIEF_SUBMITTED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_3_briefs_user ON portfolio_3_project_briefs (user_id);

-- 3. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_portfolio_3_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_3_users_updated
BEFORE UPDATE ON portfolio_3_users
FOR EACH ROW
EXECUTE FUNCTION update_portfolio_3_timestamp();

-- 4. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO portfolio_3_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a3030303-1111-2222-3333-444444444444',
    'Elena Rostova',
    'elena@example.com',
    crypt('SashaGrey2026!', gen_salt('bf', 10)),
    's3s3s3s3s3s3s3s3',
    'Fashion Creative Director'
),
(
    'b3030303-2222-3333-4444-555555555555',
    'Dominic Vance',
    'dominic@luxurybrand.com',
    crypt('SashaGrey2026!', gen_salt('bf', 10)),
    'd3d3d3d3d3d3d3d3',
    'Brand Campaign Lead'
),
(
    'c3030303-3333-4444-5555-666666666666',
    'Sasha Grey',
    'studio@sashagrey.design',
    crypt('StudioPrincipal2026!', gen_salt('bf', 10)),
    'p3p3p3p3p3p3p3p3',
    'Principal Artist'
);

-- 5. Seed Protected Design Project Brief
INSERT INTO portfolio_3_project_briefs (user_id, client_name, client_email, design_parameters, status)
VALUES (
    'a3030303-1111-2222-3333-444444444444',
    'Elena Rostova',
    'elena@example.com',
    'Autumn / Winter Haute Couture Brand Identity, high-contrast monochrome catalogue design, and structural geometric grid layout.',
    'ACTIVE_BRIEF'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM portfolio_3_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM portfolio_3_users 
WHERE email = 'elena@example.com' AND password_hash = crypt('SashaGrey2026!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM portfolio_3_users 
WHERE email = 'elena@example.com' AND password_hash = crypt('WrongPassword!', password_hash);

-- Verify duplicate registration handling constraint:
-- Expected error: duplicate key value violates unique constraint "portfolio_3_users_email_key"
-- INSERT INTO portfolio_3_users (full_name, email, password_hash) 
-- VALUES ('Duplicate User', 'elena@example.com', 'test');

-- Verify protected project briefs linked to users:
SELECT b.id, b.client_name, b.client_email, b.design_parameters, b.status, u.full_name, u.email
FROM portfolio_3_project_briefs b
JOIN portfolio_3_users u ON b.user_id = u.id;
