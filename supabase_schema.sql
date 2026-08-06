-- Supabase PostgreSQL Schema for English Learning App (Flashcards)
-- Run this SQL in the Supabase SQL Editor to set up your tables.

-- Enable UUID generation extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create flashcards table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.flashcards (
    -- Primary Key: UUID auto-generated
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Flashcard content
    word TEXT NOT NULL,
    meaning TEXT NOT NULL,
    example TEXT,
    image TEXT,
    audio TEXT,
    
    -- Metadata
    category TEXT,
    level TEXT,
    tags TEXT[], -- Array of strings
    
    -- User & Deck references
    user_id TEXT,
    deck_id TEXT,
    
    -- Spaced repetition Leitner fields
    box INTEGER DEFAULT 1 NOT NULL CONSTRAINT chk_flashcards_box CHECK (box >= 1 AND box <= 5),
    next_review TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Audit fields
    created_by TEXT,
    updated_by TEXT
);

-- Safely add missing columns if the table already exists but lacks them
ALTER TABLE public.flashcards ADD COLUMN IF NOT EXISTS example TEXT;
ALTER TABLE public.flashcards ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE public.flashcards ADD COLUMN IF NOT EXISTS audio TEXT;
ALTER TABLE public.flashcards ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.flashcards ADD COLUMN IF NOT EXISTS level TEXT;
ALTER TABLE public.flashcards ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE public.flashcards ADD COLUMN IF NOT EXISTS user_id TEXT;
ALTER TABLE public.flashcards ADD COLUMN IF NOT EXISTS deck_id TEXT;
ALTER TABLE public.flashcards ADD COLUMN IF NOT EXISTS box INTEGER DEFAULT 1 NOT NULL;
ALTER TABLE public.flashcards ADD COLUMN IF NOT EXISTS next_review TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL;
ALTER TABLE public.flashcards ADD COLUMN IF NOT EXISTS created_by TEXT;
ALTER TABLE public.flashcards ADD COLUMN IF NOT EXISTS updated_by TEXT;

-- Safely add check constraint to box if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_constraint 
        WHERE conrelid = 'public.flashcards'::regclass 
          AND conname = 'chk_flashcards_box'
    ) THEN
        ALTER TABLE public.flashcards ADD CONSTRAINT chk_flashcards_box CHECK (box >= 1 AND box <= 5);
    END IF;
END $$;

-- Index for fast queries when filtering by deck_id (highly recommended)
CREATE INDEX IF NOT EXISTS idx_flashcards_deck_id ON public.flashcards(deck_id);

-- Index for fast queries when filtering by user_id
CREATE INDEX IF NOT EXISTS idx_flashcards_user_id ON public.flashcards(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;

-- Create default permissive RLS policies (allow all CRUD operations for everyone)
-- Note: Modify these rules when you set up user authentication.
CREATE POLICY "Allow public select" ON public.flashcards
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON public.flashcards
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON public.flashcards
    FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete" ON public.flashcards
    FOR DELETE USING (true);
