# Supabase Database Schema Setup

Follow these steps to set up your database schema in Supabase:

## 1. Access Supabase SQL Editor

1. Go to https://gfjoklhnsgfdtwzuroer.supabase.co
2. Navigate to the SQL Editor section

## 2. Create the user_profiles table

Run this SQL query to create the table for storing user registration data:

```sql
-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  gender TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  profession TEXT NOT NULL,
  college_name TEXT,
  company_name TEXT,
  country TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Service role can insert profiles (for registration)
CREATE POLICY "Service role can insert profiles"
  ON user_profiles FOR INSERT
  WITH CHECK (true);
```

## 3. Configure Email Templates (Optional)

You can customize the email verification template:

1. Go to Authentication → Email Templates
2. Customize "Confirm signup" template
3. Include your branding and messaging

## 4. Enable Email Confirmations

In Authentication → Settings:

- Ensure "Enable email confirmations" is checked
- Set the "Site URL" to your frontend URL (e.g., http://localhost:5173)

## Next Steps

After running these SQL commands, proceed with testing the registration and login flow.
