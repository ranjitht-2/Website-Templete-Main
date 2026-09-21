-- ============================================================================
-- NOIRÉ® (Restaurant Template 5) - POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/restaurant/restaurant-5/
-- Dedicated Table: restaurant_5_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing restaurant-5 tables if needed (strictly isolated to restaurant_5_)
DROP TABLE IF EXISTS restaurant_5_event_rsvps CASCADE;
DROP TABLE IF EXISTS restaurant_5_table_reservations CASCADE;
DROP TABLE IF EXISTS restaurant_5_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE restaurant_5_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Black Card Patron',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_5_users_email ON restaurant_5_users (LOWER(email));

-- 2. Protected Table Reservations Table
CREATE TABLE restaurant_5_table_reservations (
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

CREATE INDEX idx_restaurant_5_res_user ON restaurant_5_table_reservations (user_id);

-- 3. Protected Event RSVP & Session Bookings Table
CREATE TABLE restaurant_5_event_rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_5_users(id) ON DELETE CASCADE,
    event_title VARCHAR(150) NOT NULL,
    event_date VARCHAR(50) NOT NULL,
    party_size INT NOT NULL DEFAULT 2,
    status VARCHAR(50) NOT NULL DEFAULT 'RSVP_CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_5_rsvp_user ON restaurant_5_event_rsvps (user_id);

-- 4. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_restaurant_5_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_restaurant_5_users_updated
BEFORE UPDATE ON restaurant_5_users
FOR EACH ROW
EXECUTE FUNCTION update_restaurant_5_timestamp();

-- 5. Insert Pre-Seeded Demo Accounts (Hashed using Blowfish, never plaintext)
INSERT INTO restaurant_5_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'n5a1b2c3-d4e5-6789-0123-abcdef456789',
    'Chef Arjun Rao',
    'arjun.rao@noire.example',
    crypt('Noire@123', gen_salt('bf', 10)),
    '8f9e0a1b2c3d4e5f',
    'Founder & Head Chef'
),
(
    'n5b2c3d4-e5f6-7890-1234-bcdefa567890',
    'Maya Krishnan',
    'maya.patron@example.com',
    crypt('Supper@123', gen_salt('bf', 10)),
    '3b4c5d6e7f8a9b0c',
    'Black Card Patron'
),
(
    'n5c3d4e5-f6a7-8901-2345-cdefab678901',
    'Kabir Mehta',
    'kabir.blackcard@example.com',
    crypt('Charcoal@123', gen_salt('bf', 10)),
    '1a2b3c4d5e6f7a8b',
    'VIP Nocturnal Member'
);

-- ============================================================================
-- 6. DBEAVER & POSTGRESQL VERIFICATION TEST SUITE
-- ============================================================================

-- Test 1: Verify users table structure and no plain-text passwords
SELECT id, full_name, email, LEFT(password_hash, 12) || '...' AS password_hash_preview, role, created_at 
FROM restaurant_5_users;

-- Test 2: Verify valid authentication using crypt (Login Success)
SELECT id, full_name, email, role, 
       (password_hash = crypt('Noire@123', password_hash)) AS is_authenticated
FROM restaurant_5_users
WHERE email = 'arjun.rao@noire.example';

-- Test 3: Verify invalid login attempt rejection (Wrong Password)
SELECT id, full_name, email, 
       (password_hash = crypt('WrongPassword999', password_hash)) AS is_authenticated
FROM restaurant_5_users
WHERE email = 'arjun.rao@noire.example';

-- Test 4: Verify duplicate email constraint enforcement (Should trigger unique constraint violation)
DO $$
BEGIN
    INSERT INTO restaurant_5_users (full_name, email, password_hash)
    VALUES ('Duplicate Arjun', 'arjun.rao@noire.example', crypt('Password@123', gen_salt('bf', 10)));
EXCEPTION WHEN unique_violation THEN
    RAISE NOTICE 'SUCCESS: Duplicate email blocked by constraint idx_restaurant_5_users_email';
END $$;

-- Test 5: Verify protected table reservation insertion for authenticated user
INSERT INTO restaurant_5_table_reservations (user_id, guest_name, guest_email, guest_phone, reservation_date, reservation_time, guests_count)
VALUES (
    'n5a1b2c3-d4e5-6789-0123-abcdef456789',
    'Chef Arjun Rao',
    'arjun.rao@noire.example',
    '+91 98401 23456',
    CURRENT_DATE + INTERVAL '1 day',
    '20:00',
    '2 GUESTS'
);

-- Test 6: Verify protected event RSVP insertion for authenticated user
INSERT INTO restaurant_5_event_rsvps (user_id, event_title, event_date, party_size)
VALUES (
    'n5b2c3d4-e5f6-7890-1234-bcdefa567890',
    'LIVE JAZZ & WOODFIRE TASTING',
    'EVERY THURSDAY',
    2
);

-- Summary of verification state
SELECT 'restaurant_5_users' AS table_name, COUNT(*) AS total_records FROM restaurant_5_users
UNION ALL
SELECT 'restaurant_5_table_reservations', COUNT(*) FROM restaurant_5_table_reservations
UNION ALL
SELECT 'restaurant_5_event_rsvps', COUNT(*) FROM restaurant_5_event_rsvps;
