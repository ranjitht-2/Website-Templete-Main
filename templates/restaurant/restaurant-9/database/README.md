# PostgreSQL & DBeaver Authentication Guide - Restaurant Template 9 (The Royal Tandoor)

## Overview
This database schema provides dedicated, isolated user authentication and protected records (orders, reservations, banquet inquiries) for **The Royal Tandoor** (`/templates/restaurant/restaurant-9/`).

## PostgreSQL Tables Created
1. **`restaurant_9_users`**:
   - `id` (UUID, Primary Key)
   - `full_name` (VARCHAR)
   - `email` (VARCHAR, Unique)
   - `password_hash` (VARCHAR, Blowfish Cryptographic Hash via `pgcrypto`)
   - `salt` (VARCHAR)
   - `role` (VARCHAR: 'VIP Royal Patron', 'Royal Club Member', 'Executive Chef & Tandoor Master')
   - `created_at` (TIMESTAMP WITH TIME ZONE)
   - `updated_at` (TIMESTAMP WITH TIME ZONE)

2. **`restaurant_9_orders`**:
   - `id` (UUID, Primary Key)
   - `user_id` (UUID, Foreign Key -> `restaurant_9_users.id`)
   - `customer_name`, `customer_phone`, `order_type`, `delivery_address`, `payment_method`, `total_amount`, `order_status`

3. **`restaurant_9_reservations`**:
   - `id` (UUID, Primary Key)
   - `user_id` (UUID, Foreign Key -> `restaurant_9_users.id`)
   - `guest_name`, `guest_email`, `guest_phone`, `reservation_date`, `reservation_time`, `guests_count`, `seating_preference`, `status`

4. **`restaurant_9_catering_inquiries`**:
   - `id` (UUID, Primary Key)
   - `user_id` (UUID, Foreign Key -> `restaurant_9_users.id`)
   - `contact_name`, `contact_email`, `contact_phone`, `event_type`, `event_details`, `status`

## DBeaver Verification Steps
1. Open **DBeaver** and connect to your PostgreSQL instance.
2. Open the SQL Editor and execute [`restaurant_9_auth.sql`](../restaurant_9_auth.sql).
3. Run verification queries to inspect hashed credentials and constraints.
