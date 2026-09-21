-- ============================================================================
-- EVELYN OSWALD (Portfolio Template 8)
-- POSTGRESQL SCHEMA FOR TEMPLATE AUTHENTICATION & PROTECTED DATA
-- Target Template: /templates/portfolio/portfolio-8/
-- Table Name: portfolio_8_users
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS portfolio_8_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Corporate Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_portfolio_8_users_email ON portfolio_8_users (LOWER(email));

CREATE TABLE IF NOT EXISTS portfolio_8_consultation_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_8_users(id) ON DELETE CASCADE,
    client_name VARCHAR(150) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    selected_tier VARCHAR(100) NOT NULL,
    system_requirements TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ONBOARDING_SCHEDULED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_portfolio_8_bookings_user ON portfolio_8_consultation_bookings (user_id);

CREATE TABLE IF NOT EXISTS portfolio_8_saved_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_8_users(id) ON DELETE CASCADE,
    package_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_portfolio_8_saved_pkg UNIQUE (user_id, package_name)
);

CREATE INDEX IF NOT EXISTS idx_portfolio_8_saved_user ON portfolio_8_saved_packages (user_id);
