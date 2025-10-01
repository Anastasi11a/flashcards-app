import { useState, useMemo } from "react";
import uuid from "uuid-random";

import { Card } from "@/data/decks";
import { useDecks } from "@/context/DeckContext";

export function useAddCardState(deckId: string) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const { decks, actions } = useDecks();

    const deck = useMemo(
        () => decks.find((d) => d.id === deckId),
        [decks, deckId]
    );

    const cards = deck?.cards ?? [];

    const save = () => {
        const trimmedQ = question.trim();
        const trimmedA = answer.trim();
        if (!trimmedQ || !trimmedA) return;

        const newCard: Card = {
            id: uuid(),
            question: trimmedQ,
            answer: trimmedA,
        };

        actions.addCard(newCard, deckId);
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