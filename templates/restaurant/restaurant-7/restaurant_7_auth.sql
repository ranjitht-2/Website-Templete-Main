-- ============================================================================
-- MASALA ATELIER (Restaurant Template 7) - POSTGRESQL AUTHENTICATION & DBEAVER SUITE
-- Target Template: /templates/restaurant/restaurant-7/
-- Table Name: restaurant_7_users
-- ============================================================================

-- Enable pgcrypto for password hashing and UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing restaurant-7 tables if needed (isolated strictly to restaurant_7_)
DROP TABLE IF EXISTS restaurant_7_catering_inquiries CASCADE;
DROP TABLE IF EXISTS restaurant_7_reservations CASCADE;
DROP TABLE IF EXISTS restaurant_7_orders CASCADE;
DROP TABLE IF EXISTS restaurant_7_users CASCADE;

-- 1. Dedicated Authentication Table
CREATE TABLE restaurant_7_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Atelier Patron',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_7_users_email ON restaurant_7_users (LOWER(email));

-- 2. Protected Orders Table
CREATE TABLE restaurant_7_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_7_users(id) ON DELETE CASCADE,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    order_type VARCHAR(20) NOT NULL DEFAULT 'delivery',
    delivery_address TEXT,
    payment_method VARCHAR(50) NOT NULL DEFAULT 'upi',
    total_amount NUMERIC(10, 2) NOT NULL,
    order_status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_7_orders_user ON restaurant_7_orders (user_id);

-- 3. Protected Reservations Table
CREATE TABLE restaurant_7_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_7_users(id) ON DELETE CASCADE,
    guest_name VARCHAR(150) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50) NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time VARCHAR(50) NOT NULL,
    guests_count VARCHAR(20) NOT NULL,
    seating_preference VARCHAR(50) DEFAULT 'chefs-counter',
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_7_res_user ON restaurant_7_reservations (user_id);

-- 4. Protected Catering Inquiries Table
CREATE TABLE restaurant_7_catering_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES restaurant_7_users(id) ON DELETE CASCADE,
    contact_name VARCHAR(150) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_details TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_REVIEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restaurant_7_catering_user ON restaurant_7_catering_inquiries (user_id);

-- 5. Automatic Timestamp Update Trigger
CREATE OR REPLACE FUNCTION update_restaurant_7_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_restaurant_7_users_updated
BEFORE UPDATE ON restaurant_7_users
FOR EACH ROW
EXECUTE FUNCTION update_restaurant_7_timestamp();

-- 6. Insert Pre-Seeded Demo Accounts (Hashed using Blowfish, never plaintext)
INSERT INTO restaurant_7_users (id, full_name, email, password_hash, salt, role)
VALUES 
(
    'a7b8c9d0-e1f2-3456-789a-bcde01234567',
    'Rohan Deshmukh',
    'rohan.deshmukh@atelier.example',
    crypt('Gastronomy@123', gen_salt('bf', 10)),
    '7a8b9c0d1e2f3a4b',
    'Executive Chef & Founder'
),
(
    'b8c9d0e1-f2a3-4567-89ab-cde012345678',
    'Sneha Reddy',
    'sneha.reddy@example.com',
    crypt('Atelier@123', gen_salt('bf', 10)),
    '2b3c4d5e6f7a8b9c',
    'Gourmet Club Patron'
),
(
    'c9d0e1f2-a3b4-5678-9abc-de0123456789',
    'Vikram Sethi',
    'vikram.sethi@example.com',
    crypt('Fusion@123', gen_salt('bf', 10)),
    '5e6f7a8b9c0d1e2f',
    'Tasting Flight Member'
);

-- ============================================================================
-- 7. DBEAVER & POSTGRESQL VERIFICATION TEST SUITE
-- ============================================================================

-- Test 1: Verify users table structure and no plain-text passwords
SELECT id, full_name, email, LEFT(password_hash, 12) || '...' AS password_hash_preview, role, created_at 
FROM restaurant_7_users;

-- Test 2: Verify valid authentication using crypt (Login Success)
SELECT id, full_name, email, role, 
       (password_hash = crypt('Gastronomy@123', password_hash)) AS is_authenticated
FROM restaurant_7_users
WHERE email = 'rohan.deshmukh@atelier.example';

-- Test 3: Verify invalid login attempt rejection (Wrong Password)
SELECT id, full_name, email, 
       (password_hash = crypt('WrongPassword999', password_hash)) AS is_authenticated
FROM restaurant_7_users
WHERE email = 'rohan.deshmukh@atelier.example';

-- Test 4: Verify duplicate email constraint enforcement (Should trigger unique constraint violation)
DO $$
BEGIN
    INSERT INTO restaurant_7_users (full_name, email, password_hash)
    VALUES ('Duplicate Sneha', 'sneha.reddy@example.com', crypt('Password@123', gen_salt('bf', 10)));
EXCEPTION WHEN unique_violation THEN
    RAISE NOTICE 'SUCCESS: Duplicate email blocked by constraint idx_restaurant_7_users_email';
END $$;

-- Test 5: Verify protected order insertion for authenticated user
INSERT INTO restaurant_7_orders (user_id, customer_name, customer_phone, order_type, delivery_address, payment_method, total_amount)
VALUES (
    'b8c9d0e1-f2a3-4567-89ab-cde012345678',
    'Sneha Reddy',
    '+91 98200 11223',
    'delivery',
    '14 Seabreeze Tower, Bandra West, Mumbai 400050',
    'upi',
    839.00
);

-- Test 6: Verify protected reservation insertion for authenticated user
INSERT INTO restaurant_7_reservations (user_id, guest_name, guest_email, guest_phone, reservation_date, reservation_time, guests_count, seating_preference)
VALUES (
    'a7b8c9d0-e1f2-3456-789a-bcde01234567',
    'Rohan Deshmukh',
    'rohan.deshmukh@atelier.example',
    '+91 98111 22334',
    CURRENT_DATE + INTERVAL '3 days',
    '8:30 PM',
    '4',
    'chefs-counter'
);

-- Test 7: Verify protected catering inquiry for authenticated user
INSERT INTO restaurant_7_catering_inquiries (user_id, contact_name, contact_email, contact_phone, event_type, event_details)
VALUES (
    'c9d0e1f2-a3b4-5678-9abc-de0123456789',
    'Vikram Sethi',
    'vikram.sethi@example.com',
    '+91 98333 44556',
    'diwali',
    'Private molecular gastronomy tasting dinner for 12 guests with wine pairings.'
);

-- Test 8: Query all joined protected activity per patron
SELECT u.full_name, u.email, u.role,
       COUNT(DISTINCT o.id) AS total_orders,
       COUNT(DISTINCT r.id) AS total_reservations,
       COUNT(DISTINCT c.id) AS total_catering_inquiries
FROM restaurant_7_users u
LEFT JOIN restaurant_7_orders o ON u.id = o.user_id
LEFT JOIN restaurant_7_reservations r ON u.id = r.user_id
LEFT JOIN restaurant_7_catering_inquiries c ON u.id = c.user_id
GROUP BY u.id, u.full_name, u.email, u.role;
