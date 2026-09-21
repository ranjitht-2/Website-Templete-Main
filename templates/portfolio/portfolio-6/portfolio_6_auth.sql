-- ============================================================================
-- SYNTHETIX (Portfolio Template 6) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/portfolio/portfolio-6/
-- Table Name: portfolio_6_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing portfolio-6 tables if needed (isolated strictly to portfolio_6_)
DROP TABLE IF EXISTS portfolio_6_inquiries CASCADE;
DROP TABLE IF EXISTS portfolio_6_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE portfolio_6_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Client Engineer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_6_users_email ON portfolio_6_users (LOWER(email));

-- 2. Protected Project Node Inquiries Table
CREATE TABLE portfolio_6_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_6_users(id) ON DELETE CASCADE,
    project_name VARCHAR(200) NOT NULL,
    system_parameters TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'NODE_INITIALIZED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_6_inquiries_user ON portfolio_6_inquiries (user_id);

-- 3. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_portfolio_6_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_6_users_updated
BEFORE UPDATE ON portfolio_6_users
FOR EACH ROW
EXECUTE FUNCTION update_portfolio_6_timestamp();

-- 4. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO portfolio_6_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a6666666-1111-2222-3333-444444444444',
    'Alex Mercer',
    'alex@example.com',
    crypt('Synthetix2026!', gen_salt('bf', 10)),
    's6s6s6s6s6s6s6s6',
    'Enterprise Client'
),
(
    'b6666666-2222-3333-4444-555555555555',
    'Jordan Vance',
    'jordan@enterprise.com',
    crypt('Synthetix2026!', gen_salt('bf', 10)),
    'j6j6j6j6j6j6j6j6',
    'Platform Architect'
),
(
    'c6666666-3333-4444-5555-666666666666',
    'Evelyn Oswald',
    'evelyn@synthetix.dev',
    crypt('NodeArchitect2026!', gen_salt('bf', 10)),
    'e6e6e6e6e6e6e6e6',
    'Principal DevOps'
);

-- 5. Seed Protected Project Node Inquiry
INSERT INTO portfolio_6_inquiries (user_id, project_name, system_parameters, status)
VALUES (
    'a6666666-1111-2222-3333-444444444444',
    'Hyper-Scale Kubernetes Cluster Mesh',
    'Multi-region deployment across AWS eu-west-1 and us-east-1 with low latency gRPC routing and real-time observability telemetry.',
    'NODE_ACTIVE'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM portfolio_6_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM portfolio_6_users 
WHERE email = 'alex@example.com' AND password_hash = crypt('Synthetix2026!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM portfolio_6_users 
WHERE email = 'alex@example.com' AND password_hash = crypt('WrongPassword!', password_hash);

-- Verify duplicate registration handling constraint:
-- Expected error: duplicate key value violates unique constraint "portfolio_6_users_email_key"
-- INSERT INTO portfolio_6_users (full_name, email, password_hash) 
-- VALUES ('Duplicate User', 'alex@example.com', 'test');

-- Verify protected project inquiries linked to users:
SELECT i.id, i.project_name, i.system_parameters, i.status, u.full_name, u.email
FROM portfolio_6_inquiries i
JOIN portfolio_6_users u ON i.user_id = u.id;
