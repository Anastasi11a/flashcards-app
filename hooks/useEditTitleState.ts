import { useEffect, useState } from "react";

import { useDecks } from "@/context/DeckContext";

interface Props {
    deckId: string;
}

export function useEditTitleState({ deckId }: Props) {
    const { decks, editDeck } = useDecks();
    const deck = decks.find((d) => d.id === deckId);

    const [title, setTitle] = useState(deck?.title || '');

    useEffect(() => {
        setTitle(deck?.title || '');
    }, [deckId, deck?.title]);

    const save = () => {
        const trimmed = title.trim();
        if (!trimmed || !deckId) return;

        editDeck(deckId, trimmed);
    };

    return { title, setTitle, save };
};