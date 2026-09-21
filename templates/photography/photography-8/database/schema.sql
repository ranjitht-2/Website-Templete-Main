-- ============================================================================
-- SAGE & SHUTTER (Photography Template 8) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/photography/photography-8/
-- Table Name: photography_8_users
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS photography_8_commissions CASCADE;
DROP TABLE IF EXISTS photography_8_users CASCADE;

CREATE TABLE photography_8_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Commission Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_8_users_email ON photography_8_users (LOWER(email));

CREATE TABLE photography_8_commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES photography_8_users(id) ON DELETE CASCADE,
    celebration_date VARCHAR(150) NOT NULL,
    venue_location VARCHAR(255) NOT NULL,
    styling_details TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'RESERVED_PENDING_BRIEF',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photography_8_commissions_user ON photography_8_commissions (user_id);

CREATE OR REPLACE FUNCTION update_photography_8_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_photography_8_users_updated
BEFORE UPDATE ON photography_8_users
FOR EACH ROW
EXECUTE FUNCTION update_photography_8_timestamp();

INSERT INTO photography_8_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a8888888-1111-2222-3333-444444444444',
    'Amara Johnson',
    'amara@example.com',
    crypt('SagePass123!', gen_salt('bf', 10)),
    's8s8s8s8s8s8s8s8',
    'Wedding Couple'
),
(
    'b8888888-2222-3333-4444-555555555555',
    'Marcus Sterling',
    'marcus@example.com',
    crypt('SagePass123!', gen_salt('bf', 10)),
    'm8m8m8m8m8m8m8m8',
    'Destination Client'
),
(
    'c8888888-3333-4444-5555-666666666666',
    'Principal Curator',
    'curator@sageandwillow.com',
    crypt('MasterArchival2026!', gen_salt('bf', 10)),
    'p8p8p8p8p8p8p8p8',
    'Studio Lead'
);

INSERT INTO photography_8_commissions (user_id, celebration_date, venue_location, styling_details, status)
VALUES (
    'a8888888-1111-2222-3333-444444444444',
    'June 12th, 2027',
    'Villa Del Balbianello, Lake Como, Italy',
    'Intimate 40-guest editorial ceremony, warm linen florals, sunset boat session, 35mm film archival capture.',
    'CONFIRMED_DATE'
);
