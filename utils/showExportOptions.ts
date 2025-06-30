import { Alert } from 'react-native';

import { Deck } from '@/data/decks';
import { exportDeck } from './exportDeck';

export const showExportOptions = (deck: Deck, onDone?: () => void) => {
    Alert.alert(
        'Export Deck',
        'Choose export format:',
        [
            {
                text: 'Export as TXT',
                onPress: async () => {
                    await exportDeck(deck, 'txt');
                    onDone?.();
                },
            },
            {
                text: 'Export as JSON',
                onPress: async () => {
                    await exportDeck(deck, 'json');
                    onDone?.();
                },
            },
            {
                text: 'Cancel',
                style: 'destructive',
                onPress: () => {
                    onDone?.();
                },
            },
        ],
        { cancelable: true }
    );
};