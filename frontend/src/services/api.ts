export const getFlashcards = async () => {
    const url = `${process.env.REACT_APP_API_URL}/flashcards`;
    const res = await fetch(url);
    if(!res.ok) {
        throw new Error("Failed to fetch flashcards");
    }
    return res.json();
}

export const getFlashcardById = async (id: string) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards/${id}`);
    if(!res.ok) {
        throw new Error("Failed to fetch flashcard");
    }
    return res.json();
}

export const createFlashcard = async (data: any) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if(!res.ok) {
        throw new Error("Failed to create flashcard");
    }
    return res.json();
}

export const updateFlashcard = async (id: string, data: any) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if(!res.ok) {
        throw new Error("Failed to update flashcard");
    }
    return res.json();
}

export const deleteFlashcard = async (id: string) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards/${id}`, {
        method: "DELETE",
    });
    if(!res.ok) {
        throw new Error("Failed to delete flashcard");
    }
    return res.json();
}

export const getFlashcardsByDeckId = async (deckID: string) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards?deckID=${deckID}`);
    if(!res.ok) {
        throw new Error("Failed to fetch flashcards");
    }
    return res.json();
}
