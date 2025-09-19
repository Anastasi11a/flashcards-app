import { useState, useMemo } from "react";
import uuid from "uuid-random";

import { Card } from "@/data/decks";
import { useDecks } from "@/context/DeckContext";

export function useAddCardState() {
    const { decks, actions, activeDeckId } = useDecks();

    if (!activeDeckId) {
        throw new Error('useAddCardState requires an activeDeckId in context');
    }

    const deck = useMemo(
        () => decks.find((d) => d.id === activeDeckId),
        [decks, activeDeckId]
    );
    const cards = deck?.cards ?? [];

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const save = () => {
        const trimmedQ = question.trim();
        const trimmedA = answer.trim();
        if (!trimmedQ || !trimmedA) return;

        const newCard: Card = {
            id: uuid(),
            question: trimmedQ,
            answer: trimmedA,
        };

        actions.addCard(activeDeckId, newCard);
        setQuestion('');
        setAnswer('');
    };

    const deleteCard = (cardId: string) => actions.deleteCard(cardId);

    return {
        cardState: {
            question,
            answer,
            setQuestion,
            setAnswer,
        },
        cards,
        save,
        deleteCard,
    };
};