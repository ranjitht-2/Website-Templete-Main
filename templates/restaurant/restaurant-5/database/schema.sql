-- ============================================================================
-- NOIRÉ® (Restaurant Template 5) - DATABASE SCHEMA
-- Path: templates/restaurant/restaurant-5/database/schema.sql
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS restaurant_5_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Black Card Patron',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_restaurant_5_users_email ON restaurant_5_users (LOWER(email));

CREATE TABLE IF NOT EXISTS restaurant_5_table_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_5_users(id) ON DELETE CASCADE,
    guest_name VARCHAR(150) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50) NULL,
    reservation_date DATE NOT NULL,
    reservation_time VARCHAR(50) NOT NULL,
    guests_count VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_restaurant_5_res_user ON restaurant_5_table_reservations (user_id);

CREATE TABLE IF NOT EXISTS restaurant_5_event_rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_5_users(id) ON DELETE CASCADE,
    event_title VARCHAR(150) NOT NULL,
    event_date VARCHAR(50) NOT NULL,
    party_size INT NOT NULL DEFAULT 2,
    status VARCHAR(50) NOT NULL DEFAULT 'RSVP_CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_restaurant_5_rsvp_user ON restaurant_5_event_rsvps (user_id);
