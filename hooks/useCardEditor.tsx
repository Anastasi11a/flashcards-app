import { useState } from "react";
import { Card } from "@/data/decks";

interface CustomEditorProps {
    initialCards: Card[];
    onUpdateCards: (updatedCards: Card[]) => void;
}

const useCardEditor = (props: CustomEditorProps) => {
    const [isAddingNewCard, setIsAddingNewCard] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

    const [editingCardId, setEditingCardId] = useState<string | null>(null);
    const [editQuestion, setEditQuestion] = useState('');
    const [editAnswer, setEditAnswer] = useState('');

    const startAdding = () => {
        setIsAddingNewCard(true);
        setNewQuestion('');
        setNewAnswer('');
    };

    const saveNewCard = () => {
        const trimmedQ = newQuestion.trim();
        const trimmedA = newAnswer.trim();
        if (!trimmedQ || !trimmedA) return;

        const newCard: Card = {
            id: Date.now().toString(),
            question: trimmedQ,
            answer: trimmedA,
        };

        const updated = [newCard, ...props.initialCards];
        props.onUpdateCards(updated);
        resetNewCard();
    };

    const resetNewCard = () => {
        setIsAddingNewCard(false);
        setNewQuestion('');
        setNewAnswer('');
    };

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
        isAddingNewCard, newQuestion, newAnswer, 
        setNewQuestion, setNewAnswer, startAdding, saveNewCard, resetNewCard, 
        editingCardId, editQuestion, editAnswer, 
        setEditQuestion, setEditAnswer, startEditing, saveEdit, resetEditor,
    };
};

export default useCardEditor;