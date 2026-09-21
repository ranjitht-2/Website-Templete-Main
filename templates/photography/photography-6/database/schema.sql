-- ============================================================================
-- KAIRO 3D FASHION PORTFOLIO (Photography Template 6) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/photography/photography-6/
-- Table Name: photography_6_users
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS photography_6_inquiries CASCADE;
DROP TABLE IF EXISTS photography_6_users CASCADE;

CREATE TABLE photography_6_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Editorial Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_6_users_email ON photography_6_users (LOWER(email));

CREATE TABLE photography_6_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES photography_6_users(id) ON DELETE CASCADE,
    contact_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    project_details TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'INQUIRY_RECEIVED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_6_inquiries_user ON photography_6_inquiries (user_id);

CREATE OR REPLACE FUNCTION update_photography_6_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_photography_6_users_updated
BEFORE UPDATE ON photography_6_users
FOR EACH ROW
EXECUTE FUNCTION update_photography_6_timestamp();

INSERT INTO photography_6_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a6666666-1111-2222-3333-444444444444',
    'Elena Rostova',
    'elena@example.com',
    crypt('KairoPass123!', gen_salt('bf', 10)),
    'k6k6k6k6k6k6k6k6',
    'Couture Director'
),
(
    'b6666666-2222-3333-4444-555555555555',
    'Marcus Vance',
    'marcus@example.com',
    crypt('KairoPass123!', gen_salt('bf', 10)),
    'm6m6m6m6m6m6m6m6',
    'Agency Curator'
),
(
    'c6666666-3333-4444-5555-666666666666',
    'Studio Lead',
    'director@kairo.studio',
    crypt('MasterStudio2026!', gen_salt('bf', 10)),
    'd6d6d6d6d6d6d6d6',
    'Creative Director'
);

INSERT INTO photography_6_inquiries (user_id, contact_name, email, project_details, status)
VALUES (
    'a6666666-1111-2222-3333-444444444444',
    'Elena Rostova',
    'elena@example.com',
    'High-fashion autumn lookbook campaign shot in Milan. High-contrast geometric shadows and 3D camera digital capture.',
    'CONFIRMED'
);
