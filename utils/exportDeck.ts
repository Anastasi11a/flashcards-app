import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

import { Deck } from '@/data/decks';

export const exportDeck = async (deck: Deck, format: 'json' | 'txt') => {
    try {
        const fileName = `${deck.title.replace(/\s+/g, '_')}.${format}`;
        const fileUri = FileSystem.documentDirectory + fileName;

        const content =
            format === 'json'
                ? JSON.stringify(deck, null, 2)
                : [
                    deck.title,
                    '',
                    ...deck.cards.map(
                        (card, i) =>
                            `${i + 1}.\t${card.question}\n\t${card.answer}\n`
                    ),
                  ].join('\n');

        await FileSystem.writeAsStringAsync(fileUri, content, {
            encoding: FileSystem.EncodingType.UTF8,
        });

        await Sharing.shareAsync(fileUri);
    } catch (error) {
        console.error('Export failed:', error);
        Alert.alert('Export Failed', 'Could not export deck to file.');
    }
};