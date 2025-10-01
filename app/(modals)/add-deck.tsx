import { useMemo } from "react";
import { useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';

import { useDecks } from '@/context/DeckContext';
import AddCards from '@/components/pages/AddCards';
import useCustomHeader from '@/hooks/useCustomHeader';
import { navigateToDecks } from "@/utils/navigation/navigation";

export default function AddDeckCards() {
    const { deckId } = useLocalSearchParams<{ deckId: string}>();
    const { decks } = useDecks();

    const activeDeck = useMemo(
        () => decks.find((d) => d.id === deckId),
        [decks, deckId]
    );

    const handleCreateDeck = () => {
        if (!activeDeck || activeDeck.cards.length === 0) {
            Alert.alert('Add at least one card');
            return;
        }
        navigateToDecks();
    };

    useCustomHeader({
        title: 'Create Deck',
        rightButton: {
            label: 'Done',
            onPress: handleCreateDeck,
        },
    });

    if (!activeDeck) return null;

    return <AddCards />
};