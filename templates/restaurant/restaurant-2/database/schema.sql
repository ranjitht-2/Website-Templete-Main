-- ============================================================================
-- EMBER & OLIVE (Restaurant Template 2) - DEDICATED POSTGRESQL AUTHENTICATION SCHEMA
-- Category: restaurant
-- Template: /templates/restaurant/restaurant-2/
-- Table Name: restaurant_2_users
-- ============================================================================

-- Enable pgcrypto extension for UUID generation and secure password hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing restaurant-2 tables if needed (isolated strictly to restaurant_2_)
DROP TABLE IF EXISTS restaurant_2_event_inquiries CASCADE;
DROP TABLE IF EXISTS restaurant_2_reservations CASCADE;
DROP TABLE IF EXISTS restaurant_2_users CASCADE;

-- ----------------------------------------------------------------------------
-- 1. Dedicated Authentication Table: restaurant_2_users
-- ----------------------------------------------------------------------------
CREATE TABLE restaurant_2_users (
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
CREATE INDEX idx_restaurant_2_users_email ON restaurant_2_users (LOWER(email));

-- ----------------------------------------------------------------------------
-- 2. Protected Action Table: Table Reservations (Linked to User)
-- ----------------------------------------------------------------------------
CREATE TABLE restaurant_2_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_2_users(id) ON DELETE CASCADE,
    guest_name VARCHAR(150) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50) NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time VARCHAR(20) NOT NULL,
    guests_count VARCHAR(50) NOT NULL,
    seating_preference VARCHAR(100) DEFAULT 'Main Dining Hearth',
    special_requests TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for user reservation history
CREATE INDEX idx_restaurant_2_res_user ON restaurant_2_reservations (user_id);

-- ----------------------------------------------------------------------------
-- 3. Protected Action Table: Private Dining & Event Inquiries (Linked to User)
-- ----------------------------------------------------------------------------
CREATE TABLE restaurant_2_event_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_2_users(id) ON DELETE CASCADE,
    contact_name VARCHAR(150) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    estimated_guests INT NOT NULL,
    desired_date DATE NOT NULL,
    venue_space VARCHAR(100) NOT NULL,
    details TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_REVIEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_2_inquiries_user ON restaurant_2_event_inquiries (user_id);

-- ----------------------------------------------------------------------------
-- 4. Trigger to automatically update 'updated_at' column
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_restaurant_2_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_restaurant_2_users_updated
BEFORE UPDATE ON restaurant_2_users
FOR EACH ROW
EXECUTE FUNCTION update_restaurant_2_timestamp();
