-- ============================================================================
-- EVELYN OSWALD (Portfolio Template 8)
-- POSTGRESQL AUTHENTICATION & DBEAVER VERIFICATION SUITE
-- Target Template: /templates/portfolio/portfolio-8/
-- Dedicated Table: portfolio_8_users
-- ============================================================================

-- Enable pgcrypto for secure cryptographic hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing portfolio-8 isolated tables if needed
DROP TABLE IF EXISTS portfolio_8_saved_packages CASCADE;
DROP TABLE IF EXISTS portfolio_8_consultation_bookings CASCADE;
DROP TABLE IF EXISTS portfolio_8_users CASCADE;

-- 1. Dedicated Portfolio 8 Authentication Table
CREATE TABLE portfolio_8_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Corporate Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_8_users_email ON portfolio_8_users (LOWER(email));

-- 2. Protected Consultation & Operations Booking Table
CREATE TABLE portfolio_8_consultation_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_8_users(id) ON DELETE CASCADE,
    client_name VARCHAR(150) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    selected_tier VARCHAR(100) NOT NULL,
    system_requirements TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ONBOARDING_SCHEDULED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_8_bookings_user ON portfolio_8_consultation_bookings (user_id);

-- 3. Protected Saved Service Packages Table
CREATE TABLE portfolio_8_saved_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_8_users(id) ON DELETE CASCADE,
    package_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_portfolio_8_saved_pkg UNIQUE (user_id, package_name)
);

CREATE INDEX idx_portfolio_8_saved_user ON portfolio_8_saved_packages (user_id);

-- 4. Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_portfolio_8_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_8_users_updated
BEFORE UPDATE ON portfolio_8_users
FOR EACH ROW
EXECUTE FUNCTION update_portfolio_8_timestamp();

-- 5. Seed Initial Test Accounts (Hashed passwords, never plaintext)
-- Test Passwords:
-- sophia@vesperlabs.com          -> EvelynOswald2026!
-- harrison@sterlingcap.com       -> EvelynOswald2026!
-- evelyn@oswald.support          -> EvelynExecutive2026!

INSERT INTO portfolio_8_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a8080808-1111-2222-3333-444444444444',
    'Sophia Vance',
    'sophia@vesperlabs.com',
    crypt('EvelynOswald2026!', gen_salt('bf', 10)),
    's8s8s8s8s8s8s8s8',
    'VP of Operations'
),
(
    'b8080808-2222-3333-4444-555555555555',
    'Harrison Sterling',
    'harrison@sterlingcap.com',
    crypt('EvelynOswald2026!', gen_salt('bf', 10)),
    'h8h8h8h8h8h8h8h8',
    'Managing Director'
),
(
    'c8080808-3333-4444-5555-666666666666',
    'Evelyn Oswald',
    'evelyn@oswald.support',
    crypt('EvelynExecutive2026!', gen_salt('bf', 10)),
    'e8e8e8e8e8e8e8e8',
    'Executive Operations Lead'
);

-- 6. Seed Protected Consultation Booking & Saved Packages
INSERT INTO portfolio_8_consultation_bookings (
    user_id,
    client_name,
    client_email,
    selected_tier,
    system_requirements,
    status
) VALUES (
    'a8080808-1111-2222-3333-444444444444',
    'Sophia Vance',
    'sophia@vesperlabs.com',
    'Executive Partner ($2,800/mo)',
    'Full restructuring of executive calendar channels, inbox telemetry, and C-level contractor invoicing pipeline for Q3 onboarding.',
    'ONBOARDING_SCHEDULED'
);

INSERT INTO portfolio_8_saved_packages (user_id, package_name)
VALUES 
('a8080808-1111-2222-3333-444444444444', 'Executive Partner'),
('a8080808-1111-2222-3333-444444444444', 'Corporate Anchor');

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM portfolio_8_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role, created_at 
FROM portfolio_8_users 
WHERE LOWER(email) = LOWER('sophia@vesperlabs.com') 
  AND password_hash = crypt('EvelynOswald2026!', password_hash);

-- Verify rejection of invalid password:
SELECT id, full_name, email 
FROM portfolio_8_users 
WHERE LOWER(email) = LOWER('sophia@vesperlabs.com') 
  AND password_hash = crypt('InvalidSecret999!', password_hash);

-- Check protected consultation bookings:
SELECT b.id, u.full_name as client, b.selected_tier, b.status, b.created_at
FROM portfolio_8_consultation_bookings b
JOIN portfolio_8_users u ON b.user_id = u.id;

-- Check protected saved packages:
SELECT s.id, u.full_name as client, s.package_name, s.created_at
FROM portfolio_8_saved_packages s
JOIN portfolio_8_users u ON s.user_id = u.id;
