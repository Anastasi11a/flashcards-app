import { useEffect, useState, useCallback } from "react";
import { useDecks } from "@/context/DeckContext";

interface Props {
    deckId: string;
    cardId: string;
}

export function useEditCardState({ deckId, cardId }: Props) {
    const { decks, actions } = useDecks();
    const deck = decks.find(d => d.id === deckId);
    const card = deck?.cards.find(c => c.id === cardId);

    const [question, setQuestion] = useState(card?.question || '');
    const [answer, setAnswer] = useState(card?.answer || '');

    const resetState = useCallback(() => {
        setQuestion(card?.question || '');
        setAnswer(card?.answer || '');
    }, [card]);

    useEffect(() => {
        resetState();
    }, [resetState]);

    const save = () => {
        if (!cardId || !question.trim() || !answer.trim()) return;
        actions.editCard(cardId, question.trim(), answer.trim());
    };

    return {
        cardState: {
            question,
            answer,
            setQuestion,
            setAnswer,
        },
        save,
        reset: resetState,
    };
};