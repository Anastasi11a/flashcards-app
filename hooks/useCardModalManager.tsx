import { useState } from "react";
import uuid from "uuid-random";

import { Card } from "@/data/decks";

interface CustomEditorProps {
    deckId: string;
    initialCards: Card[];
    onAdd: (deckId: string, card: Card) => void;
    onEdit: (deckId: string, cardId: string, q: string, a: string) => void;
}

export function useCardModalManager({
    deckId, initialCards, onAdd, onEdit,
}: CustomEditorProps) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [editingCardId, setEditingCardId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const startAdding = () => {
        reset();
        setIsAdding(true);
    };

    const startEditing = (cardId: string) => {
        const card = initialCards.find((c) => c.id === cardId);
        if (!card) return;
        setEditingCardId(cardId);
        setQuestion(card.question);
        setAnswer(card.answer);
        setIsAdding(false);
    };

    const save = () => {
        const trimmedQ = question.trim();
        const trimmedA = answer.trim();
        if (!trimmedQ || !trimmedA) return;

        if (editingCardId) {
            onEdit(deckId, editingCardId, trimmedQ, trimmedA);
        } else {
            onAdd(deckId, {
                id: uuid(),
                question: trimmedQ,
                answer: trimmedA,
            });
        }

        reset();
    };

    const reset = () => {
        setEditingCardId(null);
        setQuestion('');
        setAnswer('');
        setIsAdding(false);
    };

    return {
        question, answer, setQuestion, setAnswer,
        isModalVisible: isAdding || editingCardId !== null,
        isEditing: editingCardId !== null,
        startAdding, startEditing, save, reset,
    };
};