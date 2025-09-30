import { useState, useEffect, useCallback } from "react";
import { useDecks } from "@/context/DeckContext";

export function useEditTitleState({ deckId }: { deckId?: string }) {
    const { decks, actions } = useDecks();
    const deck = decks.find((d) => d.id === deckId);

    const [title, setTitle] = useState(deck?.title ?? '');

    useEffect(() => {
        if (deck?.title !== undefined) {
            setTitle(deck.title);
        }
    }, [deck?.title, deckId]);

    const save = useCallback(() => {
        if (!deckId) return;

        const trimmed = title.trim();
        if (!trimmed) return;

        actions.editDeck(deckId, trimmed);
    }, [deckId, title, actions]);

    return { title, setTitle, save };
};