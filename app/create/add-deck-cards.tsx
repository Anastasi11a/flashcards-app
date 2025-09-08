import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert } from 'react-native';

import AddCardsScreen from '@/components/screens/AddCardsScreen';
import { useDecks } from '@/context/DeckContext';
import useCustomHeader from '@/hooks/useCustomHeader';

export default function AddDeckCards() {
    const router = useRouter();
    const { title, deckId: paramDeckId } = useLocalSearchParams<{ 
        title: string; 
        deckId?: string 
    }>();
    const { actions } = useDecks();
    const [deckId, setDeckId] = useState<string | null>(paramDeckId ?? null);

    useEffect(() => {
        const createDeckIfNeeded = async () => {
            if (!deckId && title) {
                const newDeckId = await actions.addDeck(title);
                if (!newDeckId) {
                    Alert.alert("Failed to create deck");
                    return;
                }
                setDeckId(newDeckId);
            }
        };
        createDeckIfNeeded();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deckId, title]);

    const handleCreateDeck = () => {
        if (!deckId) {
            Alert.alert('Add at least one card');
            return;
        }
        router.push('/(tabs)');
    };

    useCustomHeader({
        title: 'Create list',
        rightButton: {
            label: 'Save',
            onPress: handleCreateDeck,
        },
    });

    if (!deckId) return null;

    return <AddCardsScreen deckId={deckId} />
};