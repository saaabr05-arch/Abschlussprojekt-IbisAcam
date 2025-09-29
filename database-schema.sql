-- Database schema for BMW Quiz App
-- This SQL should be run in your Supabase dashboard SQL editor

-- Create user_highlights table to store user's favorite BMW cars
CREATE TABLE IF NOT EXISTS user_highlights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    why TEXT NOT NULL,
    tags TEXT[] NOT NULL,
    image TEXT NOT NULL,
    score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS (Row Level Security) policies
ALTER TABLE user_highlights ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own highlights
CREATE POLICY "Users can view own highlights" ON user_highlights
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own highlights
CREATE POLICY "Users can insert own highlights" ON user_highlights
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own highlights
CREATE POLICY "Users can update own highlights" ON user_highlights
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own highlights
CREATE POLICY "Users can delete own highlights" ON user_highlights
    FOR DELETE USING (auth.uid() = user_id);

-- Create an index for better performance
CREATE INDEX IF NOT EXISTS user_highlights_user_id_idx ON user_highlights(user_id);
CREATE INDEX IF NOT EXISTS user_highlights_created_at_idx ON user_highlights(created_at DESC);

-- Optional: Create user_profiles table for basic user information
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();