export const getFlashcards = async () => {
    const url = `${process.env.REACT_APP_API_URL}/flashcards`;
    console.log("Đang gọi API tới địa chỉ:", url);
    const res = await fetch(url);
    return res.json();
}

export const getFlashcardById = async (id: string) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards/${id}`);
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
    return res.json();
}

export const deleteFlashcard = async (id: string) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards/${id}`, {
        method: "DELETE",
    });
    return res.json();
}

export const getFlashcardsByDeckId = async (deckID: string) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/flashcards?deckID=${deckID}`);
    return res.json();
}
