import { useEffect, useState, useCallback } from "react";
import { useDecks } from "@/context/DeckContext";

interface Props {
    deckId: string;
    cardId: string;
}

export function useEditCardState({ deckId, cardId }: Props) {
    const { decks, editCard } = useDecks();
    const deck = decks.find(d => d.id === deckId);
    const card = deck?.cards.find(c => c.id === cardId);

    const [question, setQuestion] = useState(card?.question || "");
    const [answer, setAnswer] = useState(card?.answer || "");

    const resetState = useCallback(() => {
        setQuestion(card?.question || "");
        setAnswer(card?.answer || "");
    }, [card]);

    useEffect(() => {
        resetState();
    }, [resetState]);

    const save = () => {
        if (!deckId || !cardId || !question.trim() || !answer.trim()) return;
        editCard(deckId, cardId, question.trim(), answer.trim());
    };

    return {
        question, answer,
        setQuestion, setAnswer,
        save, reset: resetState,
    };
};