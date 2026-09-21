-- ============================================================================
-- EMBER & OLIVE (Restaurant Template 2) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/restaurant/restaurant-2/
-- Table Name: restaurant_2_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing restaurant-2 tables if needed (isolated strictly to restaurant_2_)
DROP TABLE IF EXISTS restaurant_2_event_inquiries CASCADE;
DROP TABLE IF EXISTS restaurant_2_reservations CASCADE;
DROP TABLE IF EXISTS restaurant_2_users CASCADE;

-- 1. Dedicated Authentication Table
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

CREATE INDEX idx_restaurant_2_users_email ON restaurant_2_users (LOWER(email));

-- 2. Protected Reservations Table
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

CREATE INDEX idx_restaurant_2_res_user ON restaurant_2_reservations (user_id);

-- 3. Protected Event Inquiries Table
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

-- 4. Automatic Timestamp Update Trigger
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

-- 5. Seed Users (Hashed with blowfish salt, never plaintext)
INSERT INTO restaurant_2_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'e0123456-789a-bcde-f012-3456789abcde',
    'Siddharth Rao',
    'siddharth@example.com',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '8f92a10b4c7d6e5f',
    'VIP Member'
),
(
    'f9876543-21ba-dcfe-0987-654321fedcba',
    'Ananya Sharma',
    'ananya@example.com',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '3d5e7f9a1b2c4e6d',
    'Patron'
),
(
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Chef Arjun Mehta',
    'chef.arjun@emberandolive.com',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '7c8d9e0f1a2b3c4d',
    'Chef Patron'
);

-- 6. Seed Reservations
INSERT INTO restaurant_2_reservations (user_id, guest_name, guest_email, guest_phone, reservation_date, reservation_time, guests_count, seating_preference, status)
VALUES (
    'e0123456-789a-bcde-f012-3456789abcde',
    'Siddharth Rao',
    'siddharth@example.com',
    '+91 98765 43210',
    CURRENT_DATE + INTERVAL '2 days',
    '8:00 PM',
    '4 Guests (Standard Table)',
    'Hearthside Chef View',
    'CONFIRMED'
);

-- 7. Seed Event Inquiries
INSERT INTO restaurant_2_event_inquiries (user_id, contact_name, contact_email, contact_phone, event_type, estimated_guests, desired_date, venue_space, details, status)
VALUES (
    'f9876543-21ba-dcfe-0987-654321fedcba',
    'Ananya Sharma',
    'ananya@example.com',
    '+91 98765 43211',
    'Anniversary Celebration',
    18,
    CURRENT_DATE + INTERVAL '14 days',
    'The Olive Cellar Suite (10-24 guests)',
    '10th wedding anniversary 5-course bespoke wine pairing dinner.',
    'CONFIRMED'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM restaurant_2_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM restaurant_2_users 
WHERE email = 'siddharth@example.com' AND password_hash = crypt('EmberPass123!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM restaurant_2_users 
WHERE email = 'siddharth@example.com' AND password_hash = crypt('IncorrectPassword!', password_hash);
