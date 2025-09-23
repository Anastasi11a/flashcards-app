import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert } from 'react-native';

import { useDecks } from '@/context/DeckContext';
import AddCards from '@/components/pages/AddCards';
import useCustomHeader from '@/hooks/useCustomHeader';

export default function AddDeckCards() {
    const router = useRouter();
    const { deckId } = useLocalSearchParams<{ deckId: string}>();
    const { activeDeckId, setActiveDeckId } = useDecks();

    useEffect(() => {
        if (deckId) {
            setActiveDeckId(deckId);
        }
    }, [deckId, setActiveDeckId]);

    const handleCreateDeck = () => {
        if (!activeDeckId) {
            Alert.alert('Add at least one card');
            return;
        }
        router.push('/(tabs)');
    };

    useCustomHeader({
        title: 'Create Deck',
        rightButton: {
            label: 'Done',
            onPress: handleCreateDeck,
        },
    });

    if (!activeDeckId) return null;

    return <AddCards />
};