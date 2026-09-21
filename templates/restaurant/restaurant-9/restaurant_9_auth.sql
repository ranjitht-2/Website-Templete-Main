-- ============================================================================
-- THE ROYAL TANDOOR (Restaurant Template 9) - COMPLETE POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/restaurant/restaurant-9/
-- Table Name: restaurant_9_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing restaurant-9 tables if needed (isolated strictly to restaurant_9_)
DROP TABLE IF EXISTS restaurant_9_catering_inquiries CASCADE;
DROP TABLE IF EXISTS restaurant_9_reservations CASCADE;
DROP TABLE IF EXISTS restaurant_9_orders CASCADE;
DROP TABLE IF EXISTS restaurant_9_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE restaurant_9_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Royal Patron',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_9_users_email ON restaurant_9_users (LOWER(email));

-- 2. Protected Orders Table
CREATE TABLE restaurant_9_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_9_users(id) ON DELETE CASCADE,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    order_type VARCHAR(20) NOT NULL DEFAULT 'delivery',
    delivery_address TEXT,
    payment_method VARCHAR(50) NOT NULL DEFAULT 'upi',
    total_amount NUMERIC(10, 2) NOT NULL,
    order_status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_9_orders_user ON restaurant_9_orders (user_id);

-- 3. Protected Reservations Table
CREATE TABLE restaurant_9_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_9_users(id) ON DELETE CASCADE,
    guest_name VARCHAR(150) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50) NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time VARCHAR(20) NOT NULL,
    guests_count VARCHAR(20) NOT NULL,
    seating_preference VARCHAR(50) DEFAULT 'royal-court',
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_9_res_user ON restaurant_9_reservations (user_id);

-- 4. Protected Catering Inquiries Table
CREATE TABLE restaurant_9_catering_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_9_users(id) ON DELETE CASCADE,
    contact_name VARCHAR(150) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_details TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_REVIEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_9_catering_user ON restaurant_9_catering_inquiries (user_id);

-- 5. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_restaurant_9_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_restaurant_9_users_updated
BEFORE UPDATE ON restaurant_9_users
FOR EACH ROW
EXECUTE FUNCTION update_restaurant_9_timestamp();

-- 6. Insert Pre-Seeded Demo Accounts (Hashed using blowfish, never plaintext)
INSERT INTO restaurant_9_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Rohit Sharma',
    'rohit.sharma@example.com',
    crypt('RoyalPass123!', gen_salt('bf', 10)),
    '9a8b7c6d5e4f3a21',
    'VIP Royal Patron'
),
(
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'Ananya Kapoor',
    'ananya.kapoor@example.com',
    crypt('RoyalPass123!', gen_salt('bf', 10)),
    '1a2b3c4d5e6f7a8b',
    'Royal Club Member'
),
(
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'Chef Arjun Mehta',
    'arjun@royaltandoor.example',
    crypt('RoyalPass123!', gen_salt('bf', 10)),
    '4f5e6d7c8b9a0f1e',
    'Executive Chef & Tandoor Master'
);

-- 7. Seed Orders & Reservations
INSERT INTO restaurant_9_orders (user_id, customer_name, customer_phone, order_type, delivery_address, payment_method, total_amount, order_status)
VALUES (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Rohit Sharma',
    '+91 91234 56789',
    'delivery',
    'Villa 12, Indiranagar, Bengaluru, Karnataka 560038',
    'upi',
    1250.00,
    'CONFIRMED'
);

INSERT INTO restaurant_9_reservations (user_id, guest_name, guest_email, guest_phone, reservation_date, reservation_time, guests_count, seating_preference, status)
VALUES (
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'Ananya Kapoor',
    'ananya.kapoor@example.com',
    '+91 98765 12345',
    CURRENT_DATE + INTERVAL '2 days',
    '8:00 PM',
    '4 Guests',
    'royal-court',
    'CONFIRMED'
);

-- ----------------------------------------------------------------------------
-- DBEAVER VERIFICATION QUERIES:
-- ----------------------------------------------------------------------------

-- Check all user records and verify password_hash is cryptographically hashed:
SELECT id, full_name, email, role, password_hash, created_at FROM restaurant_9_users;

-- Verify successful login authentication:
SELECT id, full_name, email, role FROM restaurant_9_users 
WHERE email = 'rohit.sharma@example.com' AND password_hash = crypt('RoyalPass123!', password_hash);

-- Verify invalid password failure:
SELECT id, full_name, email, role FROM restaurant_9_users 
WHERE email = 'rohit.sharma@example.com' AND password_hash = crypt('WrongPassword!', password_hash);
