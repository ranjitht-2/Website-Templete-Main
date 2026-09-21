-- ============================================================================
-- EMBER HOUSE (Restaurant Template 1) - DEDICATED POSTGRESQL AUTHENTICATION SCHEMA
-- Category: restaurant
-- Template: /templates/restaurant/restaurant-1/
-- Table Name: restaurant_1_users
-- ============================================================================

-- Enable pgcrypto extension for UUID generation and secure password hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing restaurant-1 tables if needed (isolated strictly to restaurant_1_)
DROP TABLE IF EXISTS restaurant_1_event_bookings CASCADE;
DROP TABLE IF EXISTS restaurant_1_reservations CASCADE;
DROP TABLE IF EXISTS restaurant_1_users CASCADE;

-- ----------------------------------------------------------------------------
-- 1. Dedicated Authentication Table: restaurant_1_users
-- ----------------------------------------------------------------------------
CREATE TABLE restaurant_1_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Guest Member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for rapid lookup during login
CREATE INDEX idx_restaurant_1_users_email ON restaurant_1_users (LOWER(email));

-- ----------------------------------------------------------------------------
-- 2. Protected Action Table: Table Reservations (Linked to User)
-- ----------------------------------------------------------------------------
CREATE TABLE restaurant_1_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_1_users(id) ON DELETE CASCADE,
    guests_count VARCHAR(20) NOT NULL,
    reservation_day VARCHAR(50) NOT NULL,
    reservation_time VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_1_res_user ON restaurant_1_reservations (user_id);

-- ----------------------------------------------------------------------------
-- 3. Protected Action Table: Chef's Table & Private Event Bookings
-- ----------------------------------------------------------------------------
CREATE TABLE restaurant_1_event_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_1_users(id) ON DELETE CASCADE,
    experience_name VARCHAR(150) NOT NULL, -- "Chef's Live Hearth Table", "The Mezzanine Private Room"
    contact_name VARCHAR(150) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    booking_date DATE NOT NULL,
    special_requests TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_1_events_user ON restaurant_1_event_bookings (user_id);

-- ----------------------------------------------------------------------------
-- 4. Trigger to automatically update 'updated_at' column
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_restaurant_1_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_restaurant_1_users_updated
BEFORE UPDATE ON restaurant_1_users
FOR EACH ROW
EXECUTE FUNCTION update_restaurant_1_timestamp();
