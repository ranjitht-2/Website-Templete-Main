-- ============================================================================
-- SYNTHETIX (Portfolio Template 6) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/portfolio/portfolio-6/
-- Table Name: portfolio_6_users
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS portfolio_6_inquiries CASCADE;
DROP TABLE IF EXISTS portfolio_6_users CASCADE;

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

CREATE TABLE portfolio_6_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_6_users(id) ON DELETE CASCADE,
    project_name VARCHAR(200) NOT NULL,
    system_parameters TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'NODE_INITIALIZED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_6_inquiries_user ON portfolio_6_inquiries (user_id);

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

INSERT INTO portfolio_6_inquiries (user_id, project_name, system_parameters, status)
VALUES (
    'a6666666-1111-2222-3333-444444444444',
    'Hyper-Scale Kubernetes Cluster Mesh',
    'Multi-region deployment across AWS eu-west-1 and us-east-1 with low latency gRPC routing and real-time observability telemetry.',
    'NODE_ACTIVE'
);
