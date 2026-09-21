-- ============================================================================
-- AIDEN DRAKE (Portfolio Template 2) - DATABASE SCHEMA
-- Target Template: /templates/portfolio/portfolio-2/
-- Table Name: portfolio_2_users
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS portfolio_2_project_inquiries CASCADE;
DROP TABLE IF EXISTS portfolio_2_users CASCADE;

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

INSERT INTO portfolio_2_project_inquiries (user_id, client_name, client_email, project_scope, status)
VALUES (
    'a2020202-1111-2222-3333-444444444444',
    'Marcus Vance',
    'marcus@vancedesign.com',
    'Next-Gen FinTech Mobile Design System & React Architecture with high-performance dark mode animations.',
    'INQUIRY_RECEIVED'
);
