-- ============================================================================
-- AETHELGARD / ALISTAIR THORNE (Portfolio Template 1)
-- POSTGRESQL SCHEMA FOR TEMPLATE AUTHENTICATION & PROTECTED DATA
-- Target Template: /templates/portfolio/portfolio-1/
-- Table Name: portfolio_1_users
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS portfolio_1_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Client Partner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_portfolio_1_users_email ON portfolio_1_users (LOWER(email));

CREATE TABLE IF NOT EXISTS portfolio_1_project_commissions (
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

CREATE INDEX IF NOT EXISTS idx_portfolio_1_commissions_user ON portfolio_1_project_commissions (user_id);

CREATE TABLE IF NOT EXISTS portfolio_1_saved_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES portfolio_1_users(id) ON DELETE CASCADE,
    project_id VARCHAR(50) NOT NULL,
    project_name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_portfolio_1_saved_project UNIQUE (user_id, project_id)
);

CREATE INDEX IF NOT EXISTS idx_portfolio_1_saved_user ON portfolio_1_saved_projects (user_id);
