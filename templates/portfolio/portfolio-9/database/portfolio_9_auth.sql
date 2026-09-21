-- ============================================================================
-- SASHA GREY (Portfolio Template 9) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/portfolio/portfolio-9/
-- Table Name: portfolio_9_users
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS portfolio_9_campaign_bookings CASCADE;
DROP TABLE IF EXISTS portfolio_9_users CASCADE;

CREATE TABLE portfolio_9_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Editorial Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_9_users_email ON portfolio_9_users (LOWER(email));

CREATE TABLE portfolio_9_campaign_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_9_users(id) ON DELETE CASCADE,
    client_name VARCHAR(150) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    session_type VARCHAR(100) DEFAULT 'Editorial Spread',
    project_parameters TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_CONFIRMATION',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_portfolio_9_bookings_user ON portfolio_9_campaign_bookings (user_id);

CREATE OR REPLACE FUNCTION update_portfolio_9_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_9_users_updated
BEFORE UPDATE ON portfolio_9_users
FOR EACH ROW
EXECUTE FUNCTION update_portfolio_9_timestamp();

INSERT INTO portfolio_9_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a9090909-1111-2222-3333-444444444444',
    'Elena Rostova',
    'elena@monochromemag.com',
    crypt('SashaGrey2026!', gen_salt('bf', 10)),
    's9s9s9s9s9s9s9s9',
    'Fashion Editorial Director'
),
(
    'b9090909-2222-3333-4444-555555555555',
    'Lucas Laurent',
    'lucas@editorialstudio.fr',
    crypt('SashaGrey2026!', gen_salt('bf', 10)),
    'l9l9l9l9l9l9l9l9',
    'Campaign Creative Lead'
),
(
    'c9090909-3333-4444-5555-666666666666',
    'Sasha Grey',
    'studio@sashagrey.co',
    crypt('StudioPrincipal2026!', gen_salt('bf', 10)),
    'p9p9p9p9p9p9p9p9',
    'Principal Artist & Photographer'
);

INSERT INTO portfolio_9_campaign_bookings (user_id, client_name, client_email, session_type, project_parameters, status)
VALUES (
    'a9090909-1111-2222-3333-444444444444',
    'Elena Rostova',
    'elena@monochromemag.com',
    'Editorial Spread',
    'Autumn / Winter monochrome cover story and 12-plate editorial fashion spread shot on medium format analog monochrome backdrops.',
    'CONFIRMED'
);
