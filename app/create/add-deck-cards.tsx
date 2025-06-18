import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import AddCardsScreen from '@/components/screens/AddCardsScreen';
import { useDecks } from '@/context/DeckContext';
import { Card } from '@/data/decks';
import useCustomHeader from '@/hooks/useCustomHeader';

export default function AddDeckCards() {
    const router = useRouter();
    const { title } = useLocalSearchParams<{ title: string }>();
    const { addDeck } = useDecks();

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [cards, setCards] = useState<Card[]>([]);
    const [editingCardId, setEditingCardId] = useState<string | null>(null);

    const addCard = () => {
        if (!question || !answer) {
            Alert.alert('Please enter both question and answer');
            return;
        }

        if (editingCardId) {
            setCards(prev =>
                prev.map(card => card.id === editingCardId
                    ? { ...card, question, answer }
                    : card
                )
            );
            setEditingCardId(null);
        } else {
            setCards([...cards, { id: Date.now().toString(), question, answer }]);
        }
        setQuestion('');
        setAnswer('');
    };

    const handleCreateDeck = () => {
        if (cards.length === 0) {
            Alert.alert('Add at least one card');
            return;
        }

        addDeck(title, cards);
        router.push('/(tabs)');
    };

    
    const handleDeleteCard = (cardId: string) => {
        setCards(prev => prev.filter(card => card.id !== cardId));
    };

    const handleEditCard = (cardId: string) => {
        const card = cards.find(c => c.id === cardId);

        if (card) {
            setEditingCardId(cardId);
            setQuestion(card.question);
            setAnswer(card.answer);
        }
    };

    useCustomHeader({
        title: 'Cards list',
        rightButton: {
            label: 'Save',
            onPress: handleCreateDeck,
        },
    });

    return (
        <AddCardsScreen 
            cards={cards}
            question={question}  
            answer={answer} 
            setQuestion={setQuestion} 
            setAnswer={setAnswer} 
            onAddCard={addCard} 
            onDeleteCard={handleDeleteCard}
            onEditCard={handleEditCard}
        />
    );
};