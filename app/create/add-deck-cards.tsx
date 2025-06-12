import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useDecks } from '@/context/DeckContext';
import useCustomHeader from '@/hooks/useCustomHeader';
import { Card } from '@/data/decks';

export default function AddDeckCards() {
    const router = useRouter();
    const { title } = useLocalSearchParams<{ title: string }>();
    const { addDeck } = useDecks();

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [cards, setCards] = useState<Card[]>([]);

    const addCard = () => {
        if (!question || !answer) {
            Alert.alert('Please enter both question and answer');
            return;
        }

        setCards([...cards, { id: Date.now().toString(), question, answer }]);
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

    useCustomHeader({
        title: 'Add Cards',
        rightButton: {
            label: 'Save',
            onPress: handleCreateDeck,
        },
    });

    return (
        <View style={{ padding: 16 }}>
            <TextInput
                placeholder="Question"
                value={question}
                onChangeText={setQuestion}
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Answer"
                value={answer}
                onChangeText={setAnswer}
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <Button title="Add Card" onPress={addCard} />
        </View>
    );
}