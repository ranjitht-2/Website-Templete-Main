-- ============================================================================
-- KONKAN COAST (Restaurant Template 6) - POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/restaurant/restaurant-6/
-- Table Name: restaurant_6_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing restaurant-6 tables if needed (isolated strictly to restaurant_6_)
DROP TABLE IF EXISTS restaurant_6_catering_inquiries CASCADE;
DROP TABLE IF EXISTS restaurant_6_reservations CASCADE;
DROP TABLE IF EXISTS restaurant_6_orders CASCADE;
DROP TABLE IF EXISTS restaurant_6_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE restaurant_6_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Deck Patron Member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_6_users_email ON restaurant_6_users (LOWER(email));

-- 2. Protected Orders Table
CREATE TABLE restaurant_6_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_6_users(id) ON DELETE CASCADE,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    order_type VARCHAR(20) NOT NULL DEFAULT 'pickup',
    delivery_address TEXT,
    payment_method VARCHAR(50) NOT NULL DEFAULT 'upi',
    total_amount NUMERIC(10, 2) NOT NULL,
    order_status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_6_orders_user ON restaurant_6_orders (user_id);

-- 3. Protected Reservations Table
CREATE TABLE restaurant_6_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_6_users(id) ON DELETE CASCADE,
    guest_name VARCHAR(150) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50) NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time VARCHAR(50) NOT NULL,
    guests_count VARCHAR(20) NOT NULL,
    seating_preference VARCHAR(50) DEFAULT 'pier-deck',
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_6_res_user ON restaurant_6_reservations (user_id);

-- 4. Protected Catering Inquiries Table
CREATE TABLE restaurant_6_catering_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_6_users(id) ON DELETE CASCADE,
    contact_name VARCHAR(150) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_details TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_REVIEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_6_catering_user ON restaurant_6_catering_inquiries (user_id);

-- 5. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_restaurant_6_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_restaurant_6_users_updated
BEFORE UPDATE ON restaurant_6_users
FOR EACH ROW
EXECUTE FUNCTION update_restaurant_6_timestamp();

-- 6. Insert Pre-Seeded Demo Accounts (Hashed using Blowfish, never plaintext)
INSERT INTO restaurant_6_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'k6a1b2c3-d4e5-6789-0123-abcdef456789',
    'Ananya Iyer',
    'ananya.iyer@konkancoast.example',
    crypt('Coast@123', gen_salt('bf', 10)),
    '8c9d0e1f2a3b4c5d',
    'Head Patron & Deck Member'
),
(
    'k6b2c3d4-e5f6-7890-1234-bcdefa567890',
    'Karthik Menon',
    'karthik.menon@example.com',
    crypt('Harbour@123', gen_salt('bf', 10)),
    '3d4e5f6a7b8c9d0e',
    'Coastal Club Patron'
),
(
    'k6c3d4e5-f6a7-8901-2345-cdefab678901',
    'Priya Nair',
    'priya.nair@example.com',
    crypt('Seafood@123', gen_salt('bf', 10)),
    '6a7b8c9d0e1f2a3b',
    'Deck VIP Member'
);

-- ============================================================================
-- 7. DBEAVER & POSTGRESQL VERIFICATION TEST SUITE
-- ============================================================================

-- Test 1: Verify users table structure and no plain-text passwords
SELECT id, full_name, email, LEFT(password_hash, 12) || '...' AS password_hash_preview, role, created_at 
FROM restaurant_6_users;

-- Test 2: Verify valid authentication using crypt (Login Success)
SELECT id, full_name, email, role, 
       (password_hash = crypt('Coast@123', password_hash)) AS is_authenticated
FROM restaurant_6_users
WHERE email = 'ananya.iyer@konkancoast.example';

-- Test 3: Verify invalid login attempt rejection (Wrong Password)
SELECT id, full_name, email, 
       (password_hash = crypt('WrongPassword999', password_hash)) AS is_authenticated
FROM restaurant_6_users
WHERE email = 'ananya.iyer@konkancoast.example';

-- Test 4: Verify duplicate email constraint enforcement (Should trigger unique constraint violation)
DO $$
BEGIN
    INSERT INTO restaurant_6_users (full_name, email, password_hash)
    VALUES ('Duplicate Ananya', 'ananya.iyer@konkancoast.example', crypt('Password@123', gen_salt('bf', 10)));
EXCEPTION WHEN unique_violation THEN
    RAISE NOTICE 'SUCCESS: Duplicate email blocked by constraint idx_restaurant_6_users_email';
END $$;

-- Test 5: Verify protected order insertion for authenticated user
INSERT INTO restaurant_6_orders (user_id, customer_name, customer_phone, order_type, delivery_address, payment_method, total_amount)
VALUES (
    'k6a1b2c3-d4e5-6789-0123-abcdef456789',
    'Ananya Iyer',
    '+91 93456 78120',
    'delivery',
    '14 Marine Drive Pier Residences, Kochi',
    'upi',
    960.00
);

-- Test 6: Verify protected reservation insertion for authenticated user
INSERT INTO restaurant_6_reservations (user_id, guest_name, guest_email, guest_phone, reservation_date, reservation_time, guests_count, seating_preference)
VALUES (
    'k6b2c3d4-e5f6-7890-1234-bcdefa567890',
    'Karthik Menon',
    'karthik.menon@example.com',
    '+91 98765 43210',
    CURRENT_DATE + INTERVAL '2 days',
    '7:00 PM',
    '4',
    'pier-deck'
);

-- Test 7: Verify protected catering inquiry insertion for authenticated user
INSERT INTO restaurant_6_catering_inquiries (user_id, contact_name, contact_email, contact_phone, event_type, event_details)
VALUES (
    'k6c3d4e5-f6a7-8901-2345-cdefab678901',
    'Priya Nair',
    'priya.nair@example.com',
    '+91 91234 56789',
    'onam',
    'Traditional Onam Sadya beach banquet feast for 120 guests'
);

-- Summary of verification state
SELECT 'restaurant_6_users' AS table_name, COUNT(*) AS total_records FROM restaurant_6_users
UNION ALL
SELECT 'restaurant_6_orders', COUNT(*) FROM restaurant_6_orders
UNION ALL
SELECT 'restaurant_6_reservations', COUNT(*) FROM restaurant_6_reservations
UNION ALL
SELECT 'restaurant_6_catering_inquiries', COUNT(*) FROM restaurant_6_catering_inquiries;
