import { useState } from "react";
import { Card } from "@/data/decks";

interface CustomEditorProps {
    initialCards: Card[];
    onUpdateCards: (updatedCards: Card[]) => void;
}

const useCardEditor = (props: CustomEditorProps) => {
    const [editingCardId, setEditingCardId] = useState<string | null>(null);
    const [editQuestion, setEditQuestion] = useState('');
    const [editAnswer, setEditAnswer] = useState('');

    const startEditing = (cardId: string) => {
        const card = props.initialCards.find(c => c.id === cardId);

        if (card) {
            setEditingCardId(cardId);
            setEditQuestion(card.question);
            setEditAnswer(card.answer);
        }
    };

    const saveEdit = () => {
        if (!editingCardId) return;

        const updated = props.initialCards.map(card => 
            card.id === editingCardId ? { ...card, question: editQuestion, answer: editAnswer } : card
        );
        
        props.onUpdateCards(updated);
        resetEditor();
    };

    const resetEditor = () => {
        setEditingCardId(null);
        setEditQuestion('');
        setEditAnswer('');
    };

    return {
        editingCardId,
        editQuestion,
        editAnswer,
        setEditQuestion,
        setEditAnswer,
        startEditing,
        saveEdit,
        resetEditor,
    };
};

export default useCardEditor;