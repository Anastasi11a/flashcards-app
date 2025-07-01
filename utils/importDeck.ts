import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

import { Deck } from '@/data/decks';

export const importDeck = async (): Promise<Deck | null> => {
    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/json',
            copyToCacheDirectory: true,
            multiple: false,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const fileUri = result.assets[0].uri;
            const content = await FileSystem.readAsStringAsync(fileUri);
            const parsed: Deck = JSON.parse(content);

            if (!parsed.title || !Array.isArray(parsed.cards)) {
                throw new Error('Invalid format');
            }

            return parsed;
        }
    } catch (err) {
        console.error('Import failed:', err);
        Alert.alert('Import Failed', 'Invalid or corrupted deck file.');
    }

    return null;
};