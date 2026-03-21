import { data } from "react-router-dom";
import { supabase } from "../utils/supabase.js";

export const createFlashcardService = async(data: any) => {
  const {data: result, error} = await supabase
    .from("flashcards")
    .insert([data])
    .select()

  if(error) throw error;
  return result[0];
}

export const getFlashcardsService = async() => {
  const {data, error} = await supabase
    .from("flashcards")
    .select("*")
    .order("created_at", { ascending: false });

  if(error) throw error;
  return data;
}

export const getFlashcardsByDeckIdService = async(deckId: string) => {
  const {data, error} = await supabase
    .from("flashcards")
    .select("*")
    .eq("deckId", deckId)
    .order("created_at", { ascending: false });

  if(error) throw error;
  return data;
}

export const getFlashcardByIdService = async(id: string) => {
  const {data, error} = await supabase
    .from("flashcards")
    .select("*")
    .eq("id", id)
    .single();

  if(error) throw error;
  return data;
}

export const updateFlashcardService = async(id: string, data: any) => {
  const {data: result, error} = await supabase
    .from("flashcards")
    .update(data)
    .eq("id", id)
    .select();

  if(error) throw error;
  return result[0];
}

export const deleteFlashcardService = async(id: string) => {
  const {error} = await supabase
    .from("flashcards")
    .delete()
    .eq("id", id);

  if(error) throw error;
  return true;
}