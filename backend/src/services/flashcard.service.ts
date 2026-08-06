import { supabase } from "../utils/supabase.js";

export const createFlashcardService = async (data: any) => {
  const dbData = {
    word: data.word,
    meaning: data.meaning,
    example: data.example,
    image: data.image,
    audio: data.audio,
    category: data.category,
    level: data.level,
    tags: data.tags,
    user_id: data.userId,
    deck_id: data.deckId,
    created_by: data.created_by,
    updated_by: data.updated_by
  };

  const { data: result, error } = await supabase
    .from("flashcards")
    .insert([dbData])
    .select();

  if (error) throw error;
  if (!result || !result[0]) return null;

  return {
    ...result[0],
    userId: result[0].user_id,
    deckId: result[0].deck_id
  };
};

export const getFlashcardsService = async () => {
  const { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map((item: any) => ({
    ...item,
    userId: item.user_id,
    deckId: item.deck_id
  }));
};

export const getFlashcardsByDeckIdService = async (deckId: string) => {
  const { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .eq("deck_id", deckId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map((item: any) => ({
    ...item,
    userId: item.user_id,
    deckId: item.deck_id
  }));
};

export const getFlashcardByIdService = async (id: string) => {
  const { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    ...data,
    userId: data.user_id,
    deckId: data.deck_id
  };
};

export const updateFlashcardService = async (id: string, data: any) => {
  const dbData: any = {};
  if (data.word !== undefined) dbData.word = data.word;
  if (data.meaning !== undefined) dbData.meaning = data.meaning;
  if (data.example !== undefined) dbData.example = data.example;
  if (data.image !== undefined) dbData.image = data.image;
  if (data.audio !== undefined) dbData.audio = data.audio;
  if (data.category !== undefined) dbData.category = data.category;
  if (data.level !== undefined) dbData.level = data.level;
  if (data.tags !== undefined) dbData.tags = data.tags;
  if (data.userId !== undefined) dbData.user_id = data.userId;
  if (data.deckId !== undefined) dbData.deck_id = data.deckId;
  if (data.created_by !== undefined) dbData.created_by = data.created_by;
  if (data.updated_by !== undefined) dbData.updated_by = data.updated_by;

  const { data: result, error } = await supabase
    .from("flashcards")
    .update(dbData)
    .eq("id", id)
    .select();

  if (error) throw error;
  if (!result || !result[0]) return null;

  return {
    ...result[0],
    userId: result[0].user_id,
    deckId: result[0].deck_id
  };
};

export const deleteFlashcardService = async (id: string) => {
  const { data, error } = await supabase
    .from("flashcards")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw error;
  if (!data || !data[0]) return false;
  return true;
};

export const getDueFlashcardsService = async () => {
  const { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .lte("next_review", new Date().toISOString())
    .order("next_review", { ascending: true });

  if (error) throw error;

  return data.map((item: any) => ({
    ...item,
    userId: item.user_id,
    deckId: item.deck_id
  }));
};

export const reviewFlashcardService = async (id: string, correct: boolean) => {
  const { data: currentCard, error: fetchError } = await supabase
    .from("flashcards")
    .select("box")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (!currentCard) return null;

  const currentBox = currentCard.box || 1;
  let newBox = 1;

  if (correct) {
    newBox = Math.min(currentBox + 1, 5);
  } else {
    newBox = 1;
  }

  const boxIntervals: { [key: number]: number } = {
    1: 1,
    2: 2,
    3: 5,
    4: 9,
    5: 14
  };

  const daysToAdd = boxIntervals[newBox] || 1;
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + daysToAdd);

  const { data: result, error: updateError } = await supabase
    .from("flashcards")
    .update({
      box: newBox,
      next_review: nextReviewDate.toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select();

  if (updateError) throw updateError;
  if (!result || !result[0]) return null;

  return {
    ...result[0],
    userId: result[0].user_id,
    deckId: result[0].deck_id
  };
};
