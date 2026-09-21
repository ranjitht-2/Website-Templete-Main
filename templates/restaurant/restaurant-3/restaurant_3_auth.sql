-- ============================================================================
-- LUMIÈRE COASTAL DINING (Restaurant 3) - DBeaver & PostgreSQL Test Suite
-- Run these queries directly in DBeaver or psql to verify the database
-- ============================================================================

-- STEP 1: Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- STEP 2: Create the dedicated users table
CREATE TABLE IF NOT EXISTS restaurant_3_users (
    id VARCHAR(64) PRIMARY KEY DEFAULT 'lumiere_usr_' || substr(md5(random()::text || clock_timestamp()::text), 1, 16),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Gourmet Patron',
    phone VARCHAR(30),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- STEP 3: Create the protected table reservations table
CREATE TABLE IF NOT EXISTS restaurant_3_reservations (
    id VARCHAR(64) PRIMARY KEY DEFAULT 'lumiere_res_' || substr(md5(random()::text || clock_timestamp()::text), 1, 16),
    user_id VARCHAR(64) NOT NULL REFERENCES restaurant_3_users(id) ON DELETE CASCADE,
    reservation_date DATE NOT NULL,
    reservation_time VARCHAR(20) NOT NULL,
    guests INTEGER NOT NULL CHECK (guests >= 1 AND guests <= 20),
    seating_area VARCHAR(50) DEFAULT 'Ocean View Terrace',
    special_notes TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'seated', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- STEP 4: Insert Seed Patrons with bcrypt/Blowfish encrypted passwords (never plaintext)
INSERT INTO restaurant_3_users (id, name, email, password_hash, role, phone)
VALUES 
    (
        'lumiere_usr_001',
        'Antoine Dupont',
        'antoine@lumierechennai.com',
        crypt('SlowSummers#2026', gen_salt('bf', 10)),
        'Chef & Founder',
        '+91 44 8765 4321'
    ),
    (
        'lumiere_usr_002',
        'Maya Sundaram',
        'maya.sundaram@coastalharvest.in',
        crypt('SeabassTasting#2026', gen_salt('bf', 10)),
        'Gourmet Patron',
        '+91 98401 23456'
    ),
    (
        'lumiere_usr_003',
        'Julian Vance',
        'julian.vance@sommelierguild.org',
        crypt('CellarVintage#2026', gen_salt('bf', 10)),
        'Sommelier Patron',
        '+91 97910 87654'
    )
ON CONFLICT (email) DO UPDATE SET 
    name = EXCLUDED.name,
    password_hash = EXCLUDED.password_hash,
    role = EXCLUDED.role,
    phone = EXCLUDED.phone,
    updated_at = CURRENT_TIMESTAMP;

-- STEP 5: Insert Sample Protected Table Reservation
INSERT INTO restaurant_3_reservations (id, user_id, reservation_date, reservation_time, guests, seating_area, special_notes)
VALUES 
    (
        'lumiere_res_001',
        'lumiere_usr_002',
        CURRENT_DATE + INTERVAL '2 days',
        '8:30 PM',
        2,
        'Terrace Coastal Window',
        'Anniversary celebration. Requesting Chef Antoine tasting pairing.'
    )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- DBEAVER VERIFICATION QUERIES
-- ============================================================================

-- [TEST 1]: Verify all users are stored with secure hashed passwords (never plaintext)
SELECT 
    id, 
    name, 
    email, 
    role, 
    phone, 
    password_hash, 
    created_at 
FROM restaurant_3_users
ORDER BY created_at ASC;

-- [TEST 2]: Authenticate Antoine Dupont with valid credentials
SELECT 
    id, 
    name, 
    email, 
    role, 
    phone,
    CASE 
        WHEN password_hash = crypt('SlowSummers#2026', password_hash) THEN 'LOGIN_SUCCESS' 
        ELSE 'LOGIN_FAILED' 
    END AS auth_status
FROM restaurant_3_users
WHERE email = 'antoine@lumierechennai.com';

-- [TEST 3]: Negative Authentication Test (Wrong password test)
SELECT 
    id, 
    name, 
    email,
    CASE 
        WHEN password_hash = crypt('WrongPassword123!', password_hash) THEN 'LOGIN_SUCCESS' 
        ELSE 'INVALID_CREDENTIALS_REJECTED' 
    END AS auth_status
FROM restaurant_3_users
WHERE email = 'maya.sundaram@coastalharvest.in';

-- [TEST 4]: Test Duplicate Email Constraint (Should raise 23505 unique_violation error)
-- INSERT INTO restaurant_3_users (name, email, password_hash, role)
-- VALUES ('Duplicate Patron', 'antoine@lumierechennai.com', 'dummy_hash', 'Gourmet Patron');

-- [TEST 5]: Verify Relational Table Reservations for Patrons
SELECT 
    r.id AS reservation_id,
    u.name AS patron_name,
    u.email AS patron_email,
    u.role AS patron_tier,
    r.reservation_date,
    r.reservation_time,
    r.guests,
    r.seating_area,
    r.status
FROM restaurant_3_reservations r
JOIN restaurant_3_users u ON r.user_id = u.id;
