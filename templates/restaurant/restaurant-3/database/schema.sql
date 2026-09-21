-- ============================================================================
-- LUMIÈRE COASTAL DINING (Restaurant 3) - PostgreSQL Database Schema
-- Dedicated Table Definitions for Authentication & Protected Guest Actions
-- ============================================================================

-- Ensure uuid-ossp or pgcrypto extension is available for UUID and secure hashing
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. Table: restaurant_3_users
-- Dedicated authentication and patron registry table for Restaurant 3
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS restaurant_3_users (
    id VARCHAR(64) PRIMARY KEY DEFAULT 'lumiere_usr_' || substr(md5(random()::text || clock_timestamp()::text), 1, 16),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Securely hashed password (bcrypt / Blowfish / Argon2 / SHA-256)
    role VARCHAR(50) NOT NULL DEFAULT 'Gourmet Patron',
    phone VARCHAR(30),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Index on email for rapid lookup during authentication
CREATE INDEX IF NOT EXISTS idx_restaurant_3_users_email ON restaurant_3_users(email);

-- ----------------------------------------------------------------------------
-- 2. Table: restaurant_3_reservations
-- Protected table reservations placed by authenticated Lumière patrons
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS restaurant_3_reservations (
    id VARCHAR(64) PRIMARY KEY DEFAULT 'lumiere_res_' || substr(md5(random()::text || clock_timestamp()::text), 1, 16),
    user_id VARCHAR(64) NOT NULL REFERENCES restaurant_3_users(id) ON DELETE CASCADE,
    reservation_date DATE NOT NULL,
    reservation_time VARCHAR(20) NOT NULL,
    guests INTEGER NOT NULL CHECK (guests >= 1 AND guests <= 20),
    seating_area VARCHAR(50) DEFAULT 'Ocean View Terrace',
    special_notes TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'seated', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_restaurant_3_reservations_user ON restaurant_3_reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_restaurant_3_reservations_date ON restaurant_3_reservations(reservation_date);

-- ----------------------------------------------------------------------------
-- 3. Automatic Updated-At Trigger
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_restaurant_3_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_restaurant_3_users ON restaurant_3_users;
CREATE TRIGGER trg_update_restaurant_3_users
BEFORE UPDATE ON restaurant_3_users
FOR EACH ROW
EXECUTE FUNCTION update_restaurant_3_timestamp();

DROP TRIGGER IF EXISTS trg_update_restaurant_3_reservations ON restaurant_3_reservations;
CREATE TRIGGER trg_update_restaurant_3_reservations
BEFORE UPDATE ON restaurant_3_reservations
FOR EACH ROW
EXECUTE FUNCTION update_restaurant_3_timestamp();
