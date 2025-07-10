import { Alert } from 'react-native';
import uuid from 'uuid-random';

import { importDeck as pickDeckFile } from './importDeck'; 
import { Deck } from '@/data/decks';

export const handleImportDeck = async (importDeck: (deck: Deck) => Promise<void>) => {
    try {
        const deck = await pickDeckFile();
        if (!deck) return;

        const newDeckId = uuid();

        const cardsWithNewIds = (deck.cards || []).map((card: any) => ({
            ...card,
            id: uuid(),
        }));

        const deckToImport = {
            ...deck,
            id: newDeckId,
            cards: cardsWithNewIds,
        };

        await importDeck(deckToImport);
    } catch (err) {
        console.error('Failed to import deck:', err);
        Alert.alert(
            'Import Failed',
            'Could not import the deck. Make sure the file is valid.'
        );
    }
};