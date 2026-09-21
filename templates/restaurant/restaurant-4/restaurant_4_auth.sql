-- ============================================================================
-- EMBER HOUSE (Restaurant Template 4) - POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/restaurant/restaurant-4/
-- Table Name: restaurant_4_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing restaurant-4 tables if needed (isolated strictly to restaurant_4_)
DROP TABLE IF EXISTS restaurant_4_experience_bookings CASCADE;
DROP TABLE IF EXISTS restaurant_4_reservations CASCADE;
DROP TABLE IF EXISTS restaurant_4_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE restaurant_4_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Botanical Table Member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_4_users_email ON restaurant_4_users (LOWER(email));

-- 2. Protected Table Reservations Table
CREATE TABLE restaurant_4_reservations (
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

CREATE INDEX idx_restaurant_4_res_user ON restaurant_4_reservations (user_id);

-- 3. Protected Tasting Experience Bookings Table
CREATE TABLE restaurant_4_experience_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_4_users(id) ON DELETE CASCADE,
    experience_type VARCHAR(100) NOT NULL,
    guest_count INT NOT NULL DEFAULT 2,
    special_notes TEXT,
    booking_status VARCHAR(50) NOT NULL DEFAULT 'PENDING_CONFIRMATION',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_4_exp_user ON restaurant_4_experience_bookings (user_id);

-- 4. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_restaurant_4_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_restaurant_4_users_updated
BEFORE UPDATE ON restaurant_4_users
FOR EACH ROW
EXECUTE FUNCTION update_restaurant_4_timestamp();

-- 5. Insert Pre-Seeded Demo Accounts (Hashed using Blowfish, never plaintext)
INSERT INTO restaurant_4_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'e4a1b2c3-d4e5-6789-0123-abcdef456789',
    'Maya Krishnan',
    'maya.krishnan@emberhouse.example',
    crypt('Ember@123', gen_salt('bf', 10)),
    '9a8b7c6d5e4f3a2b',
    'Executive Chef & Founder'
),
(
    'e4b2c3d4-e5f6-7890-1234-bcdefa567890',
    'Arjun Raghavan',
    'arjun.raghavan@example.com',
    crypt('Garden@123', gen_salt('bf', 10)),
    '4e5f6a7b8c9d0e1f',
    'Botanical Club Patron'
),
(
    'e4c3d4e5-f6a7-8901-2345-cdefab678901',
    'Divya Balaji',
    'divya.balaji@example.com',
    crypt('Botanical@123', gen_salt('bf', 10)),
    '7b8c9d0e1f2a3b4c',
    'Conservatory Table Member'
);

-- ============================================================================
-- 6. DBEAVER & POSTGRESQL VERIFICATION TEST SUITE
-- ============================================================================

-- Test 1: Verify users table structure and no plain-text passwords
SELECT id, full_name, email, LEFT(password_hash, 12) || '...' AS password_hash_preview, role, created_at 
FROM restaurant_4_users;

-- Test 2: Verify valid authentication using crypt (Login Success)
SELECT id, full_name, email, role, 
       (password_hash = crypt('Ember@123', password_hash)) AS is_authenticated
FROM restaurant_4_users
WHERE email = 'maya.krishnan@emberhouse.example';

-- Test 3: Verify invalid login attempt rejection (Wrong Password)
SELECT id, full_name, email, 
       (password_hash = crypt('WrongPassword999', password_hash)) AS is_authenticated
FROM restaurant_4_users
WHERE email = 'maya.krishnan@emberhouse.example';

-- Test 4: Verify duplicate email constraint enforcement (Should trigger unique constraint violation)
DO $$
BEGIN
    INSERT INTO restaurant_4_users (full_name, email, password_hash)
    VALUES ('Duplicate Maya', 'maya.krishnan@emberhouse.example', crypt('Password@123', gen_salt('bf', 10)));
EXCEPTION WHEN unique_violation THEN
    RAISE NOTICE 'SUCCESS: Duplicate email blocked by constraint idx_restaurant_4_users_email';
END $$;

-- Test 5: Verify protected reservation insertion for authenticated user
INSERT INTO restaurant_4_reservations (user_id, guest_name, guest_email, reservation_date, reservation_time, guests_count)
VALUES (
    'e4a1b2c3-d4e5-6789-0123-abcdef456789',
    'Maya Krishnan',
    'maya.krishnan@emberhouse.example',
    CURRENT_DATE + INTERVAL '1 day',
    '19:30',
    '2'
);

-- Test 6: Verify protected tasting experience booking insertion for authenticated user
INSERT INTO restaurant_4_experience_bookings (user_id, experience_type, guest_count, special_notes)
VALUES (
    'e4b2c3d4-e5f6-7890-1234-bcdefa567890',
    'Private Supper Tasting Flight',
    4,
    'Botanical mocktail pairings for conservatory dining'
);

-- Summary of verification state
SELECT 'restaurant_4_users' AS table_name, COUNT(*) AS total_records FROM restaurant_4_users
UNION ALL
SELECT 'restaurant_4_reservations', COUNT(*) FROM restaurant_4_reservations
UNION ALL
SELECT 'restaurant_4_experience_bookings', COUNT(*) FROM restaurant_4_experience_bookings;
