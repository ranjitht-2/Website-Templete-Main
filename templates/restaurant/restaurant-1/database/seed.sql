-- ============================================================================
-- EMBER HOUSE (Restaurant Template 1) - SEED DATA & DBEAVER VERIFICATION SUITE
-- Category: restaurant
-- Template: /templates/restaurant/restaurant-1/
-- Table Name: restaurant_1_users
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Insert Pre-Seeded Users with Cryptographically Hashed Passwords (NO plaintext)
-- Using PostgreSQL pgcrypto crypt() with blowfish/bf salt (bcrypt standard)
-- ----------------------------------------------------------------------------

-- Seed User 1: Kavita Swaminathan (Editorial VIP) -> Password: EmberPass123!
INSERT INTO restaurant_1_users (id, full_name, email, password_hash, salt, role)
VALUES (
    'd0123456-789a-bcde-f012-3456789abcde',
    'Kavita Swaminathan',
    'kavita@example.com',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '5e6f7a8b9c0d1e2f',
    'Editorial VIP'
) ON CONFLICT (email) DO NOTHING;

-- Seed User 2: Rohan Roy (Patron Member) -> Password: EmberPass123!
INSERT INTO restaurant_1_users (id, full_name, email, password_hash, salt, role)
VALUES (
    'c9876543-21ba-dcfe-0987-654321fedcba',
    'Rohan Roy',
    'rohan@example.com',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '2a3b4c5d6e7f8a9b',
    'Patron Member'
) ON CONFLICT (email) DO NOTHING;

-- Seed User 3: Chef Arjun Rao (Executive Chef & Founder) -> Password: EmberPass123!
INSERT INTO restaurant_1_users (id, full_name, email, password_hash, salt, role)
VALUES (
    'e1f2a3b4-5678-90cd-ef12-34567890abcd',
    'Chef Arjun Rao',
    'chef.arjun@emberhouse.example',
    crypt('EmberPass123!', gen_salt('bf', 10)),
    '9f8e7d6c5b4a3021',
    'Executive Chef'
) ON CONFLICT (email) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 2. Insert Seed Table Reservation
-- ----------------------------------------------------------------------------
INSERT INTO restaurant_1_reservations (user_id, guests_count, reservation_day, reservation_time, status)
VALUES (
    'd0123456-789a-bcde-f012-3456789abcde',
    '4 GUESTS',
    'FRIDAY',
    '08:30 PM',
    'CONFIRMED'
);

-- ----------------------------------------------------------------------------
-- 3. Insert Seed Chef Table Experience Booking
-- ----------------------------------------------------------------------------
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

-- ============================================================================
-- 4. DBEAVER VERIFICATION QUERIES
-- ============================================================================

-- VERIFICATION 1: Verify Table Structure & Check for Hashed Passwords
SELECT 
    id, 
    full_name, 
    email, 
    role, 
    password_hash,
    (password_hash NOT LIKE 'EmberPass123!' AND LENGTH(password_hash) > 20) AS is_securely_hashed,
    created_at
FROM restaurant_1_users;

-- VERIFICATION 2: Simulate Valid Login Authentication (Returns 1 row when password is correct)
SELECT 
    id, 
    full_name, 
    email, 
    role
FROM restaurant_1_users 
WHERE email = 'kavita@example.com' 
  AND password_hash = crypt('EmberPass123!', password_hash);

-- VERIFICATION 3: Simulate Invalid Password Attempt (Should return 0 rows)
SELECT 
    id, 
    full_name, 
    email, 
    role 
FROM restaurant_1_users 
WHERE email = 'kavita@example.com' 
  AND password_hash = crypt('WrongPassword!', password_hash);

-- VERIFICATION 4: Verify Duplicate Email Constraint Prevention
-- Running the following statement will throw a unique_violation error:
-- INSERT INTO restaurant_1_users (full_name, email, password_hash) VALUES ('Duplicate User', 'kavita@example.com', 'hash123');

-- VERIFICATION 5: Verify User Reservations Joined Data
SELECT 
    u.full_name, 
    u.email, 
    u.role,
    r.guests_count, 
    r.reservation_day, 
    r.reservation_time, 
    r.status
FROM restaurant_1_reservations r
JOIN restaurant_1_users u ON r.user_id = u.id;
