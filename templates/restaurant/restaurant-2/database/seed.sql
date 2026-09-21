-- ============================================================================
-- EMBER & OLIVE (Restaurant Template 2) - SEED DATA & DBEAVER VERIFICATION SUITE
-- Category: restaurant
-- Template: /templates/restaurant/restaurant-2/
-- Table Name: restaurant_2_users
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Insert Pre-Seeded Users with Cryptographically Hashed Passwords (NO plaintext)
-- Using PostgreSQL pgcrypto crypt() with blowfish/bf salt (compatible with industry standard bcrypt)
-- ----------------------------------------------------------------------------

-- Seed User 1: Siddharth Rao (VIP Member) -> Password: EmberPass123!
INSERT INTO restaurant_2_users (id, full_name, email, password_hash, salt, role)
VALUES (
    'e0123456-789a-bcde-f012-3456789abcde',
    'Siddharth Rao',
    'siddharth@example.com',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '8f92a10b4c7d6e5f',
    'VIP Member'
) ON CONFLICT (email) DO NOTHING;

-- Seed User 2: Ananya Sharma (Patron) -> Password: EmberPass123!
INSERT INTO restaurant_2_users (id, full_name, email, password_hash, salt, role)
VALUES (
    'f9876543-21ba-dcfe-0987-654321fedcba',
    'Ananya Sharma',
    'ananya@example.com',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '3d5e7f9a1b2c4e6d',
    'Patron'
) ON CONFLICT (email) DO NOTHING;

-- Seed User 3: Arjun Mehta (Chef Patron) -> Password: EmberPass123!
INSERT INTO restaurant_2_users (id, full_name, email, password_hash, salt, role)
VALUES (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Chef Arjun Mehta',
    'chef.arjun@emberandolive.com',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '7c8d9e0f1a2b3c4d',
    'Chef Patron'
) ON CONFLICT (email) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 2. Insert Seed Reservations for Authenticated Users
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 3. Insert Seed Event Inquiry
-- ----------------------------------------------------------------------------
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

-- ============================================================================
-- 4. DBEAVER VERIFICATION QUERIES
-- ============================================================================

-- VERIFICATION 1: Verify Table Structure & Check for Plain-Text Passwords (Should be FALSE for plain text)
SELECT 
    id, 
    full_name, 
    email, 
    role, 
    password_hash,
    (password_hash NOT LIKE 'EmberPass123!' AND LENGTH(password_hash) > 20) AS is_securely_hashed,
    created_at
FROM restaurant_2_users;

-- VERIFICATION 2: Simulate Valid Login Authentication (Returns 1 row when password is correct)
SELECT 
    id, 
    full_name, 
    email, 
    role
FROM restaurant_2_users 
WHERE email = 'siddharth@example.com' 
  AND password_hash = crypt('EmberPass123!', password_hash);

-- VERIFICATION 3: Simulate Invalid Password Attempt (Should return 0 rows)
SELECT 
    id, 
    full_name, 
    email, 
    role 
FROM restaurant_2_users 
WHERE email = 'siddharth@example.com' 
  AND password_hash = crypt('WrongPassword!', password_hash);

-- VERIFICATION 4: Verify Duplicate Email Prevention (Constraint enforcement)
-- Running the following statement will throw a unique_violation error:
-- INSERT INTO restaurant_2_users (full_name, email, password_hash) VALUES ('Duplicate User', 'siddharth@example.com', 'hash123');

-- VERIFICATION 5: Verify User Reservations Joined Data
SELECT 
    u.full_name, 
    u.email, 
    u.role,
    r.reservation_date, 
    r.reservation_time, 
    r.guests_count, 
    r.seating_preference, 
    r.status
FROM restaurant_2_reservations r
JOIN restaurant_2_users u ON r.user_id = u.id;
