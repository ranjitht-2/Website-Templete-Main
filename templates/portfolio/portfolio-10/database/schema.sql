-- ============================================================================
-- SASHA GREY (Portfolio Template 10) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/portfolio/portfolio-10/
-- Table Name: portfolio_10_users
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS portfolio_10_campaigns CASCADE;
DROP TABLE IF EXISTS portfolio_10_users CASCADE;

CREATE TABLE portfolio_10_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Editorial Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_10_users_email ON portfolio_10_users (LOWER(email));

CREATE TABLE portfolio_10_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_10_users(id) ON DELETE CASCADE,
    campaign_name VARCHAR(200) NOT NULL,
    design_parameters TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'CAMPAIGN_INITIALIZED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_10_campaigns_user ON portfolio_10_campaigns (user_id);

CREATE OR REPLACE FUNCTION update_portfolio_10_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_10_users_updated
BEFORE UPDATE ON portfolio_10_users
FOR EACH ROW
EXECUTE FUNCTION update_portfolio_10_timestamp();

INSERT INTO portfolio_10_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a1010101-1111-2222-3333-444444444444',
    'Elena Rostova',
    'elena@example.com',
    crypt('SashaGrey2026!', gen_salt('bf', 10)),
    's10s10s10s10s10s10',
    'Fashion Creative Director'
),
(
    'b1010101-2222-3333-4444-555555555555',
    'Dominic Vance',
    'dominic@luxurybrand.com',
    crypt('SashaGrey2026!', gen_salt('bf', 10)),
    'd10d10d10d10d10d10',
    'Brand Campaign Lead'
),
(
    'c1010101-3333-4444-5555-666666666666',
    'Sasha Grey',
    'studio@sashagrey.design',
    crypt('StudioPrincipal2026!', gen_salt('bf', 10)),
    'p10p10p10p10p10p10',
    'Principal Artist'
);

INSERT INTO portfolio_10_campaigns (user_id, campaign_name, design_parameters, status)
VALUES (
    'a1010101-1111-2222-3333-444444444444',
    'Autumn / Winter Haute Couture Visual Identity',
    'High-fashion print editorial catalogue, typographic identity refresh, and digital showcase campaign with custom minimalist layout art direction.',
    'ACTIVE_BRIEF'
);
