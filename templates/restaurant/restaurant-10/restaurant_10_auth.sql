-- ============================================================================
-- SOUTHERN EMBER (Restaurant Template 10) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/restaurant/restaurant-10/
-- Table Name: restaurant_10_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing restaurant-10 tables if needed (isolated strictly to restaurant_10_)
DROP TABLE IF EXISTS restaurant_10_catering_inquiries CASCADE;
DROP TABLE IF EXISTS restaurant_10_reservations CASCADE;
DROP TABLE IF EXISTS restaurant_10_orders CASCADE;
DROP TABLE IF EXISTS restaurant_10_users CASCADE;

-- 1. Dedicated Authentication Table
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

CREATE INDEX idx_restaurant_10_users_email ON restaurant_10_users (LOWER(email));

-- 2. Protected Orders Table
CREATE TABLE restaurant_10_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_10_users(id) ON DELETE CASCADE,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    order_type VARCHAR(20) NOT NULL DEFAULT 'delivery',
    delivery_address TEXT,
    payment_method VARCHAR(50) NOT NULL DEFAULT 'upi',
    total_amount NUMERIC(10, 2) NOT NULL,
    order_status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_10_orders_user ON restaurant_10_orders (user_id);

-- 3. Protected Reservations Table
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

-- 4. Protected Catering Inquiries Table
CREATE TABLE restaurant_10_catering_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_10_users(id) ON DELETE CASCADE,
    contact_name VARCHAR(150) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_details TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_REVIEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_10_catering_user ON restaurant_10_catering_inquiries (user_id);

-- 5. Automatic Timestamp Update Trigger
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

-- 6. Insert Pre-Seeded Demo Accounts (Hashed using blowfish, never plaintext)
INSERT INTO restaurant_10_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a0123456-789a-bcde-f012-3456789abcde',
    'Priya Nair',
    'priya@example.com',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '7a91b2c3d4e5f601',
    'VIP Member'
),
(
    'b9876543-21ba-dcfe-0987-654321fedcba',
    'Ananya Iyer',
    'ananya@example.com',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '1f2e3d4c5b6a7089',
    'Foodie Club'
),
(
    'c1d2e3f4-5678-90ab-cdef-1234567890ab',
    'Chef Meenakshi Iyer',
    'chef.meenakshi@southernember.example',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '5d6e7f8a9b0c1d2e',
    'Executive Chef'
);

-- 7. Seed Orders & Reservations
INSERT INTO restaurant_10_orders (user_id, customer_name, customer_phone, order_type, delivery_address, payment_method, total_amount, order_status)
VALUES (
    'a0123456-789a-bcde-f012-3456789abcde',
    'Priya Nair',
    '+91 98765 43210',
    'delivery',
    'Flat 402, Coral Palms, Adyar, Chennai',
    'upi',
    820.00,
    'CONFIRMED'
);

INSERT INTO restaurant_10_reservations (user_id, guest_name, guest_email, guest_phone, reservation_date, reservation_time, guests_count, seating_preference, status)
VALUES (
    'b9876543-21ba-dcfe-0987-654321fedcba',
    'Ananya Iyer',
    'ananya@example.com',
    '+91 98765 43211',
    CURRENT_DATE + INTERVAL '1 day',
    '7:00 PM',
    '4 Guests',
    'indoor',
    'CONFIRMED'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is cryptographically hashed:
SELECT id, full_name, email, role, password_hash, created_at FROM restaurant_10_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM restaurant_10_users 
WHERE email = 'priya@example.com' AND password_hash = crypt('EmberPass123!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM restaurant_10_users 
WHERE email = 'priya@example.com' AND password_hash = crypt('WrongPassword!', password_hash);
