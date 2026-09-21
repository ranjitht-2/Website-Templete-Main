-- ============================================================================
-- JARED VANCE (Portfolio Template 7) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/portfolio/portfolio-7/
-- Table Name: portfolio_7_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing portfolio-7 tables if needed (isolated strictly to portfolio_7_)
DROP TABLE IF EXISTS portfolio_7_design_inquiries CASCADE;
DROP TABLE IF EXISTS portfolio_7_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE portfolio_7_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Brand Partner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_7_users_email ON portfolio_7_users (LOWER(email));

-- 2. Protected Design Inquiries / Parameter Specification Table
CREATE TABLE portfolio_7_design_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_7_users(id) ON DELETE CASCADE,
    client_name VARCHAR(150) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    design_specification TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'CONNECTION_PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_7_inquiries_user ON portfolio_7_design_inquiries (user_id);

-- 3. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_portfolio_7_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_7_users_updated
BEFORE UPDATE ON portfolio_7_users
FOR EACH ROW
EXECUTE FUNCTION update_portfolio_7_timestamp();

-- 4. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO portfolio_7_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a7070707-1111-2222-3333-444444444444',
    'Charlotte Sterling',
    'charlotte@apexcreative.com',
    crypt('JaredVance2026!', gen_salt('bf', 10)),
    'c7c7c7c7c7c7c7c7',
    'Senior Brand Strategist'
),
(
    'b7070707-2222-3333-4444-555555555555',
    'Julian Thorne',
    'julian.thorne@vesperlabs.com',
    crypt('JaredVance2026!', gen_salt('bf', 10)),
    'j7j7j7j7j7j7j7j7',
    'Design Director'
),
(
    'c7070707-3333-4444-5555-666666666666',
    'Jared Vance',
    'jared@vance.agency',
    crypt('JaredVancePrincipal2026!', gen_salt('bf', 10)),
    'p7p7p7p7p7p7p7p7',
    'Creative Director & Principal'
);

-- 5. Seed Protected Design Inquiry
INSERT INTO portfolio_7_design_inquiries (user_id, client_name, client_email, design_specification, status)
VALUES (
    'b7070707-2222-3333-4444-555555555555',
    'Julian Thorne',
    'julian.thorne@vesperlabs.com',
    'Comprehensive corporate design guidelines and extreme typography alignments for Vesper 2035 next-gen smart product packaging.',
    'CONNECTION_PENDING'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM portfolio_7_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM portfolio_7_users 
WHERE email = 'charlotte@apexcreative.com' AND password_hash = crypt('JaredVance2026!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM portfolio_7_users 
WHERE email = 'charlotte@apexcreative.com' AND password_hash = crypt('WrongPassword!', password_hash);

-- Verify duplicate registration handling constraint:
-- Expected error: duplicate key value violates unique constraint "portfolio_7_users_email_key"
-- INSERT INTO portfolio_7_users (full_name, email, password_hash) 
-- VALUES ('Duplicate User', 'charlotte@apexcreative.com', 'test');

-- Verify protected design inquiries linked to users:
SELECT i.id, i.client_name, i.client_email, i.design_specification, i.status, u.full_name, u.email
FROM portfolio_7_design_inquiries i
JOIN portfolio_7_users u ON i.user_id = u.id;
