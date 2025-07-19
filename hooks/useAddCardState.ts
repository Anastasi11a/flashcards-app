import { useState } from "react";
import uuid from "uuid-random";

import { Card } from "@/data/decks";
import { useDecks } from "@/context/DeckContext";

interface Props {
    deckId: string;
    focusInput?: () => void;
}

export function useAddCardState({ deckId, focusInput }: Props) {
    const { addCard } = useDecks();

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

        addCard(deckId, newCard);
        focusInput?.();
        reset();
    };

    const reset = () => {
        setQuestion('');
        setAnswer('');
    };

    return {
        question, answer,
        setQuestion, setAnswer,
        save, reset,
    };
};