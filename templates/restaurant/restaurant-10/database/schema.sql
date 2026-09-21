-- ============================================================================
-- SOUTHERN EMBER (Restaurant Template 10) - DEDICATED POSTGRESQL AUTHENTICATION SCHEMA
-- Category: restaurant
-- Template: /templates/restaurant/restaurant-10/
-- Table Name: restaurant_10_users
-- ============================================================================

-- Enable pgcrypto extension for UUID generation and secure password hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing restaurant-10 tables if needed (isolated strictly to restaurant_10_)
DROP TABLE IF EXISTS restaurant_10_catering_inquiries CASCADE;
DROP TABLE IF EXISTS restaurant_10_reservations CASCADE;
DROP TABLE IF EXISTS restaurant_10_orders CASCADE;
DROP TABLE IF EXISTS restaurant_10_users CASCADE;

-- ----------------------------------------------------------------------------
-- 1. Dedicated Authentication Table: restaurant_10_users
-- ----------------------------------------------------------------------------
CREATE TABLE restaurant_10_users (
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
CREATE INDEX idx_restaurant_10_users_email ON restaurant_10_users (LOWER(email));

-- ----------------------------------------------------------------------------
-- 2. Protected Action Table: Online Orders (Delivery / Pickup)
-- ----------------------------------------------------------------------------
CREATE TABLE restaurant_10_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_10_users(id) ON DELETE CASCADE,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    order_type VARCHAR(20) NOT NULL DEFAULT 'delivery', -- 'delivery' or 'pickup'
    delivery_address TEXT,
    payment_method VARCHAR(50) NOT NULL DEFAULT 'upi', -- 'upi', 'card', 'netbanking', 'restaurant'
    total_amount NUMERIC(10, 2) NOT NULL,
    order_status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_10_orders_user ON restaurant_10_orders (user_id);

-- ----------------------------------------------------------------------------
-- 3. Protected Action Table: Table Reservations
-- ----------------------------------------------------------------------------
CREATE TABLE restaurant_10_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_10_users(id) ON DELETE CASCADE,
    guest_name VARCHAR(150) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50) NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time VARCHAR(20) NOT NULL,
    guests_count VARCHAR(20) NOT NULL,
    seating_preference VARCHAR(50) DEFAULT 'indoor',
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_10_res_user ON restaurant_10_reservations (user_id);

-- ----------------------------------------------------------------------------
-- 4. Protected Action Table: Festival & Event Catering Inquiries
-- ----------------------------------------------------------------------------
CREATE TABLE restaurant_10_catering_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_10_users(id) ON DELETE CASCADE,
    contact_name VARCHAR(150) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL, -- 'pongal', 'diwali', 'wedding', etc.
    event_details TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_REVIEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_10_catering_user ON restaurant_10_catering_inquiries (user_id);

-- ----------------------------------------------------------------------------
-- 5. Trigger to automatically update 'updated_at' column
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_restaurant_10_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_restaurant_10_users_updated
BEFORE UPDATE ON restaurant_10_users
FOR EACH ROW
EXECUTE FUNCTION update_restaurant_10_timestamp();
