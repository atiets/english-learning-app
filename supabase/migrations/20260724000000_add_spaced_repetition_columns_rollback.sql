-- Rollback: Remove spaced repetition columns (box and next_review) from flashcards
-- WARNING: Running this script will permanently delete all spaced-repetition progress (Leitner boxes and review history).
-- DO NOT RUN CASUALLY!

-- 1. Remove constraint
ALTER TABLE public.flashcards DROP CONSTRAINT IF EXISTS chk_flashcards_box;

-- 2. Drop columns
ALTER TABLE public.flashcards DROP COLUMN IF EXISTS box;
ALTER TABLE public.flashcards DROP COLUMN IF EXISTS next_review;
