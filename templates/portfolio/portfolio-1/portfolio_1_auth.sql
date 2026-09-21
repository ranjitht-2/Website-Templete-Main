-- ============================================================================
-- AETHELGARD / ALISTAIR THORNE (Portfolio Template 1)
-- POSTGRESQL AUTHENTICATION & DBEAVER VERIFICATION SUITE
-- Target Template: /templates/portfolio/portfolio-1/
-- Dedicated Table: portfolio_1_users
-- ============================================================================

-- Enable pgcrypto for secure cryptographic hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing portfolio-1 isolated tables if needed
DROP TABLE IF EXISTS portfolio_1_saved_projects CASCADE;
DROP TABLE IF EXISTS portfolio_1_project_commissions CASCADE;
DROP TABLE IF EXISTS portfolio_1_users CASCADE;

-- 1. Dedicated Portfolio 1 Authentication Table
CREATE TABLE portfolio_1_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Client Partner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_1_users_email ON portfolio_1_users (LOWER(email));

-- 2. Protected Architectural Project Commissions Table
CREATE TABLE portfolio_1_project_commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_1_users(id) ON DELETE CASCADE,
    client_name VARCHAR(150) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    project_title VARCHAR(200) NOT NULL,
    project_category VARCHAR(100) NOT NULL,
    location VARCHAR(150) NOT NULL,
    estimated_budget VARCHAR(100) NOT NULL,
    brief_description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'BLUEPRINT_REVIEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_1_commissions_user ON portfolio_1_project_commissions (user_id);

-- 3. Protected Architectural Spec Bookmarks / Saved Projects Table
CREATE TABLE portfolio_1_saved_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_1_users(id) ON DELETE CASCADE,
    project_id VARCHAR(50) NOT NULL,
    project_name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_portfolio_1_saved_project UNIQUE (user_id, project_id)
);

CREATE INDEX idx_portfolio_1_saved_user ON portfolio_1_saved_projects (user_id);

-- 4. Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_portfolio_1_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_1_users_updated
BEFORE UPDATE ON portfolio_1_users
FOR EACH ROW
EXECUTE FUNCTION update_portfolio_1_timestamp();

-- 5. Seed Initial Test Accounts (Hashed passwords, never plaintext)
-- Test Passwords:
-- elena.rostova@bauhaus-institute.de     -> Aethelgard2026!
-- marcus@sterling-developments.co.uk    -> Aethelgard2026!
-- alistair@aethelgard.studio            -> AethelgardPrincipal2026!

INSERT INTO portfolio_1_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a1010101-1111-2222-3333-444444444444',
    'Elena Rostova',
    'elena.rostova@bauhaus-institute.de',
    crypt('Aethelgard2026!', gen_salt('bf', 10)),
    'e1e1e1e1e1e1e1e1',
    'Lead Urban Planner'
),
(
    'b1010101-2222-3333-4444-555555555555',
    'Marcus Sterling',
    'marcus@sterling-developments.co.uk',
    crypt('Aethelgard2026!', gen_salt('bf', 10)),
    'm1m1m1m1m1m1m1m1',
    'Managing Partner'
),
(
    'c1010101-3333-4444-5555-666666666666',
    'Alistair Thorne',
    'alistair@aethelgard.studio',
    crypt('AethelgardPrincipal2026!', gen_salt('bf', 10)),
    'p1p1p1p1p1p1p1p1',
    'Principal Architect'
);

-- 6. Seed Protected Commission & Saved Project
INSERT INTO portfolio_1_project_commissions (
    user_id,
    client_name,
    client_email,
    project_title,
    project_category,
    location,
    estimated_budget,
    brief_description,
    status
) VALUES (
    'b1010101-2222-3333-4444-555555555555',
    'Marcus Sterling',
    'marcus@sterling-developments.co.uk',
    'The Alpine Cantilever Residence',
    'Residential',
    'Zermatt, Switzerland',
    '$4,500,000 - $6,000,000',
    'High-altitude cantilevered monolithic concrete residence integrating passive thermal insulation and panoramic triple-glazed curtain walls.',
    'BLUEPRINT_REVIEW'
);

INSERT INTO portfolio_1_saved_projects (user_id, project_id, project_name)
VALUES 
('b1010101-2222-3333-4444-555555555555', 'res-1', 'The Cantilever House'),
('b1010101-2222-3333-4444-555555555555', 'comm-1', 'Aethelgard Highline Tower');

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM portfolio_1_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role, created_at 
FROM portfolio_1_users 
WHERE LOWER(email) = LOWER('elena.rostova@bauhaus-institute.de') 
  AND password_hash = crypt('Aethelgard2026!', password_hash);

-- Verify rejection of invalid password:
SELECT id, full_name, email 
FROM portfolio_1_users 
WHERE LOWER(email) = LOWER('elena.rostova@bauhaus-institute.de') 
  AND password_hash = crypt('WrongPassword123!', password_hash);

-- Verify duplicate email constraint rejection:
-- (This statement will fail with 23505 unique_violation error)
-- INSERT INTO portfolio_1_users (full_name, email, password_hash)
-- VALUES ('Duplicate Elena', 'elena.rostova@bauhaus-institute.de', crypt('AnyPass123!', gen_salt('bf', 10)));

-- Check protected project commissions:
SELECT c.id, u.full_name as client, c.project_title, c.project_category, c.estimated_budget, c.status
FROM portfolio_1_project_commissions c
JOIN portfolio_1_users u ON c.user_id = u.id;

-- Check protected saved blueprints:
SELECT s.id, u.full_name as client, s.project_id, s.project_name, s.created_at
FROM portfolio_1_saved_projects s
JOIN portfolio_1_users u ON s.user_id = u.id;
