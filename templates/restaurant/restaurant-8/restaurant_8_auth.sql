-- ============================================================================
-- RANG MAHAL (Restaurant Template 8) - POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/restaurant/restaurant-8/
-- Table Name: restaurant_8_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing restaurant-8 tables if needed (isolated strictly to restaurant_8_)
DROP TABLE IF EXISTS restaurant_8_catering_inquiries CASCADE;
DROP TABLE IF EXISTS restaurant_8_reservations CASCADE;
DROP TABLE IF EXISTS restaurant_8_orders CASCADE;
DROP TABLE IF EXISTS restaurant_8_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE restaurant_8_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Royal Patron',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_8_users_email ON restaurant_8_users (LOWER(email));

-- 2. Protected Orders Table
CREATE TABLE restaurant_8_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_8_users(id) ON DELETE CASCADE,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    order_type VARCHAR(20) NOT NULL DEFAULT 'delivery',
    delivery_address TEXT,
    payment_method VARCHAR(50) NOT NULL DEFAULT 'upi',
    total_amount NUMERIC(10, 2) NOT NULL,
    order_status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_8_orders_user ON restaurant_8_orders (user_id);

-- 3. Protected Reservations Table
CREATE TABLE restaurant_8_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_8_users(id) ON DELETE CASCADE,
    guest_name VARCHAR(150) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50) NOT NULL,
    reservation_date DATE NOT NULL,
    court_slot VARCHAR(50) NOT NULL,
    guests_count VARCHAR(20) NOT NULL,
    seating_preference VARCHAR(50) DEFAULT 'palace-court',
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_8_res_user ON restaurant_8_reservations (user_id);

-- 4. Protected Catering Inquiries Table
CREATE TABLE restaurant_8_catering_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_8_users(id) ON DELETE CASCADE,
    contact_name VARCHAR(150) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_details TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_REVIEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_8_catering_user ON restaurant_8_catering_inquiries (user_id);

-- 5. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_restaurant_8_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_restaurant_8_users_updated
BEFORE UPDATE ON restaurant_8_users
FOR EACH ROW
EXECUTE FUNCTION update_restaurant_8_timestamp();

-- 6. Insert Pre-Seeded Demo Accounts (Hashed using blowfish, never plaintext)
INSERT INTO restaurant_8_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Arjun Sharma',
    'arjun.sharma@example.com',
    crypt('Marwar@123', gen_salt('bf', 10)),
    '9a8b7c6d5e4f3a21',
    'Royal Marwar Patron'
),
(
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'Sneha Reddy',
    'sneha.reddy@example.com',
    crypt('Palace@123', gen_salt('bf', 10)),
    '1a2b3c4d5e6f7a8b',
    'Heritage Club Member'
),
(
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'Chef Bheem Singh',
    'chef.bheem@rangmahal.example',
    crypt('MasterChef@123', gen_salt('bf', 10)),
    '4f5e6d7c8b9a0f1e',
    'Executive Heritage Chef'
);

-- ============================================================================
-- DBEAVER VALIDATION & VERIFICATION QUERIES
-- ============================================================================

-- Query 1: Verify Table Structure and Columns
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'restaurant_8_users'
ORDER BY ordinal_position;

-- Query 2: Confirm Stored Passwords are Fully Hashed (Never Plaintext)
SELECT id, full_name, email, password_hash, role, created_at
FROM restaurant_8_users;

-- Query 3: Authenticate User with Password Verification via crypt()
SELECT id, full_name, email, role,
       (password_hash = crypt('Marwar@123', password_hash)) AS is_password_valid
FROM restaurant_8_users
WHERE LOWER(email) = LOWER('arjun.sharma@example.com');

-- Query 4: Negative Test - Invalid Password Authentication
SELECT id, full_name, email,
       (password_hash = crypt('WrongPassword!', password_hash)) AS is_password_valid
FROM restaurant_8_users
WHERE LOWER(email) = LOWER('arjun.sharma@example.com');

-- Query 5: Create a Protected Reservation record linked to Authenticated User
INSERT INTO restaurant_8_reservations (user_id, guest_name, guest_email, guest_phone, reservation_date, court_slot, guests_count, seating_preference)
VALUES (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Arjun Sharma',
    'arjun.sharma@example.com',
    '+91 95678 23410',
    '2026-10-15',
    'Imperial Dinner (7:30 PM)',
    '4 Guests',
    'palace-court'
);

-- Query 6: Verify User and Protected Reservation JOIN
SELECT u.full_name, u.email, u.role, r.reservation_date, r.court_slot, r.guests_count, r.status
FROM restaurant_8_users u
JOIN restaurant_8_reservations r ON u.id = r.user_id
WHERE u.email = 'arjun.sharma@example.com';
