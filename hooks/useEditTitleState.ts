import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";

import { useDecks } from "@/context/DeckContext";
import { SaveHandler } from "./useSaveModal";

export function useEditTitleState({ deckId }: { deckId?: string }) {
    const { decks, actions } = useDecks();
    const deck = decks.find((d) => d.id === deckId);

    const [title, setTitle] = useState(deck?.title ?? '');

    useEffect(() => {
        if (deck?.title !== undefined) {
            setTitle(deck.title);
        }
    }, [deck?.title, deckId]);

    const save: SaveHandler = useCallback(async () => {
        if (!deckId) return false;

        const trimmed = title.trim();
        if (!trimmed) return false;

        const isDuplicate = decks.some(
            (d) => d.title.toLowerCase() === trimmed.toLowerCase() && d.id !== deckId
        );

        if (isDuplicate) {
            Alert.alert(
                'Duplicate Title',
                'A deck with this title already exists. Please choose another name'
            );
            return false;
        }

        await actions.editDeck(deckId, trimmed);
        return true;
    }, [deckId, title, actions, decks]);

    return { title, setTitle, save };
};