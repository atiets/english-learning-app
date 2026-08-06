-- Migration: Add spaced repetition columns (box and next_review) to flashcards
-- Purpose: Support Leitner-based review intervals and scheduling.

BEGIN;

-- 1. Fail clearly if public.flashcards does not exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name = 'flashcards'
    ) THEN
        RAISE EXCEPTION 'Table public.flashcards does not exist. Cannot apply spaced repetition columns migration.';
    END IF;
END $$;

-- 2. Add missing box and next_review columns (nullable initially to allow safe migration of existing rows)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'flashcards'
          AND column_name = 'box'
    ) THEN
        ALTER TABLE public.flashcards ADD COLUMN box INTEGER;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'flashcards'
          AND column_name = 'next_review'
    ) THEN
        ALTER TABLE public.flashcards ADD COLUMN next_review TIMESTAMPTZ;
    END IF;
END $$;

-- 3. Backfill null values
UPDATE public.flashcards
SET
    box = COALESCE(box, 1),
    next_review = COALESCE(next_review, CURRENT_TIMESTAMP)
WHERE box IS NULL OR next_review IS NULL;

-- 4. Detect box < 1 OR box > 5 and raise a descriptive exception
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM public.flashcards
        WHERE box < 1 OR box > 5
    ) THEN
        RAISE EXCEPTION 'Validation failed: public.flashcards contains box values outside the allowed range (1-5).';
    END IF;
END $$;

-- 5. Set box default to 1 and next_review default to CURRENT_TIMESTAMP
ALTER TABLE public.flashcards ALTER COLUMN box SET DEFAULT 1;
ALTER TABLE public.flashcards ALTER COLUMN next_review SET DEFAULT CURRENT_TIMESTAMP;

-- 6. Set both columns NOT NULL
ALTER TABLE public.flashcards ALTER COLUMN box SET NOT NULL;
ALTER TABLE public.flashcards ALTER COLUMN next_review SET NOT NULL;

-- 7. Add chk_flashcards_box only when it is absent specifically from public.flashcards
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conrelid = 'public.flashcards'::regclass
          AND conname = 'chk_flashcards_box'
    ) THEN
        ALTER TABLE public.flashcards
        ADD CONSTRAINT chk_flashcards_box CHECK (box >= 1 AND box <= 5);
    END IF;
END $$;

COMMIT;
