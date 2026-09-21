-- ============================================================================
-- SOUTHERN EMBER (Restaurant Template 10) - SEED DATA & DBEAVER VERIFICATION SUITE
-- Category: restaurant
-- Template: /templates/restaurant/restaurant-10/
-- Table Name: restaurant_10_users
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Insert Pre-Seeded Users with Cryptographically Hashed Passwords (NO plaintext)
-- Using PostgreSQL pgcrypto crypt() with blowfish/bf salt (bcrypt standard)
-- ----------------------------------------------------------------------------

-- Seed User 1: Priya Nair (VIP Member) -> Password: EmberPass123!
INSERT INTO restaurant_10_users (id, full_name, email, password_hash, salt, role)
VALUES (
    'a0123456-789a-bcde-f012-3456789abcde',
    'Priya Nair',
    'priya@example.com',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '7a91b2c3d4e5f601',
    'VIP Member'
) ON CONFLICT (email) DO NOTHING;

-- Seed User 2: Ananya Iyer (Foodie Club) -> Password: EmberPass123!
INSERT INTO restaurant_10_users (id, full_name, email, password_hash, salt, role)
VALUES (
    'b9876543-21ba-dcfe-0987-654321fedcba',
    'Ananya Iyer',
    'ananya@example.com',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '1f2e3d4c5b6a7089',
    'Foodie Club'
) ON CONFLICT (email) DO NOTHING;

-- Seed User 3: Chef Meenakshi Iyer (Executive Chef) -> Password: EmberPass123!
INSERT INTO restaurant_10_users (id, full_name, email, password_hash, salt, role)
VALUES (
    'c1d2e3f4-5678-90ab-cdef-1234567890ab',
    'Chef Meenakshi Iyer',
    'chef.meenakshi@southernember.example',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '5d6e7f8a9b0c1d2e',
    'Executive Chef'
) ON CONFLICT (email) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 2. Insert Seed Orders for Authenticated Users
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 3. Insert Seed Table Reservation
-- ----------------------------------------------------------------------------
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
-- 4. Insert Seed Catering Inquiry
-- ----------------------------------------------------------------------------
INSERT INTO restaurant_10_catering_inquiries (user_id, contact_name, contact_email, contact_phone, event_type, event_details, status)
VALUES (
    'a0123456-789a-bcde-f012-3456789abcde',
    'Priya Nair',
    'priya@example.com',
    '+91 98765 43210',
    'pongal',
    'Traditional banana leaf Pongal festive lunch for 45 corporate employees.',
    'CONFIRMED'
);

-- ============================================================================
-- 5. DBEAVER VERIFICATION QUERIES
-- ============================================================================

-- VERIFICATION 1: Verify Table Structure & Ensure Passwords are NOT stored in plain text
SELECT 
    id, 
    full_name, 
    email, 
    role, 
    password_hash,
    (password_hash NOT LIKE 'EmberPass123!' AND LENGTH(password_hash) > 20) AS is_securely_hashed,
    created_at
FROM restaurant_10_users;

-- VERIFICATION 2: Simulate Valid Login Authentication (Returns 1 row when credentials match)
SELECT 
    id, 
    full_name, 
    email, 
    role
FROM restaurant_10_users 
WHERE email = 'priya@example.com' 
  AND password_hash = crypt('EmberPass123!', password_hash);

-- VERIFICATION 3: Simulate Invalid Password Attempt (Returns 0 rows)
SELECT 
    id, 
    full_name, 
    email, 
    role 
FROM restaurant_10_users 
WHERE email = 'priya@example.com' 
  AND password_hash = crypt('WrongPassword!', password_hash);

-- VERIFICATION 4: Verify Duplicate Email Prevention
-- Executing the statement below will fail with a unique violation constraint error:
-- INSERT INTO restaurant_10_users (full_name, email, password_hash) VALUES ('Duplicate', 'priya@example.com', 'hash_test');

-- VERIFICATION 5: Verify User Orders & Reservations Joined Data
SELECT 
    u.full_name, 
    u.email, 
    o.order_type,
    o.total_amount,
    o.payment_method,
    o.order_status,
    o.created_at
FROM restaurant_10_orders o
JOIN restaurant_10_users u ON o.user_id = u.id;
