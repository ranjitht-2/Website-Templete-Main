-- ============================================================================
-- EMBER HOUSE (Restaurant Template 1) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/restaurant/restaurant-1/
-- Table Name: restaurant_1_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing restaurant-1 tables if needed (isolated strictly to restaurant_1_)
DROP TABLE IF EXISTS restaurant_1_event_bookings CASCADE;
DROP TABLE IF EXISTS restaurant_1_reservations CASCADE;
DROP TABLE IF EXISTS restaurant_1_users CASCADE;

-- 1. Dedicated Authentication Table
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

CREATE INDEX idx_restaurant_1_users_email ON restaurant_1_users (LOWER(email));

-- 2. Protected Table Reservations
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

-- 3. Protected Chef's Table & Event Bookings
CREATE TABLE restaurant_1_event_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_1_users(id) ON DELETE CASCADE,
    experience_name VARCHAR(150) NOT NULL,
    contact_name VARCHAR(150) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    booking_date DATE NOT NULL,
    special_requests TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_1_events_user ON restaurant_1_event_bookings (user_id);

-- 4. Automatic Timestamp Update Trigger
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

-- 5. Insert Pre-Seeded Users (Hashed with blowfish salt, never plaintext)
INSERT INTO restaurant_1_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'd0123456-789a-bcde-f012-3456789abcde',
    'Kavita Swaminathan',
    'kavita@example.com',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '5e6f7a8b9c0d1e2f',
    'Editorial VIP'
),
(
    'c9876543-21ba-dcfe-0987-654321fedcba',
    'Rohan Roy',
    'rohan@example.com',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '2a3b4c5d6e7f8a9b',
    'Patron Member'
),
(
    'e1f2a3b4-5678-90cd-ef12-34567890abcd',
    'Chef Arjun Rao',
    'chef.arjun@emberhouse.example',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '9f8e7d6c5b4a3021',
    'Executive Chef'
);

-- 6. Seed Reservations
INSERT INTO restaurant_1_reservations (user_id, guests_count, reservation_day, reservation_time, status)
VALUES (
    'd0123456-789a-bcde-f012-3456789abcde',
    '4 GUESTS',
    'FRIDAY',
    '08:30 PM',
    'CONFIRMED'
);

-- 7. Seed Event Bookings
INSERT INTO restaurant_1_event_bookings (user_id, experience_name, contact_name, contact_email, contact_phone, booking_date, special_requests, status)
VALUES (
    'c9876543-21ba-dcfe-0987-654321fedcba',
    'Chef’s Live Hearth Table',
    'Rohan Roy',
    'rohan@example.com',
    '+91 98765 43210',
    CURRENT_DATE + INTERVAL '7 days',
    'Special anniversary pairing menu with wine sommelier introduction.',
    'CONFIRMED'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is not plain-text:
SELECT id, full_name, email, role, password_hash, created_at FROM restaurant_1_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM restaurant_1_users 
WHERE email = 'kavita@example.com' AND password_hash = crypt('EmberPass123!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM restaurant_1_users 
WHERE email = 'kavita@example.com' AND password_hash = crypt('IncorrectPassword!', password_hash);
