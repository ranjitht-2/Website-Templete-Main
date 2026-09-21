-- ============================================================================
-- EMBER HOUSE (Restaurant Template 4) - POSTGRESQL SCHEMA DEFINITION
-- Target Template: /templates/restaurant/restaurant-4/
-- Dedicated Table: restaurant_4_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Dedicated Users / Authentication Table
CREATE TABLE IF NOT EXISTS restaurant_4_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Botanical Table Member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_restaurant_4_users_email ON restaurant_4_users (LOWER(email));

-- Protected Table Reservations Table
CREATE TABLE IF NOT EXISTS restaurant_4_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_4_users(id) ON DELETE CASCADE,
    guest_name VARCHAR(150) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50) NULL,
    reservation_date DATE NOT NULL,
    reservation_time VARCHAR(50) NOT NULL,
    guests_count VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_restaurant_4_res_user ON restaurant_4_reservations (user_id);

-- Protected Tasting Experience Bookings Table
CREATE TABLE IF NOT EXISTS restaurant_4_experience_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_4_users(id) ON DELETE CASCADE,
    experience_type VARCHAR(100) NOT NULL,
    guest_count INT NOT NULL DEFAULT 2,
    special_notes TEXT,
    booking_status VARCHAR(50) NOT NULL DEFAULT 'PENDING_CONFIRMATION',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_restaurant_4_exp_user ON restaurant_4_experience_bookings (user_id);
