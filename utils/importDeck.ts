import * as DocumentPicker from "expo-document-picker";
import { File } from "expo-file-system";
import { Alert } from "react-native";

import { Deck } from "@/data/decks";

export async function importDeck(): Promise<Deck | null> {
    const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
        multiple: false,
    });

    if (result.canceled || !result.assets?.length) {
        return null;
    }

    const fileUri = result.assets[0].uri;
    const file = new File(fileUri);

    const content = file.textSync(); 

    let parsed: Deck;
    try {
        parsed = JSON.parse(content);
    } catch {
        Alert.alert('Import Failed', 'File is not valid JSON.');
        return null;
    }

    if (!parsed.title || !Array.isArray(parsed.cards)) {
        Alert.alert('Import Failed', 'Invalid or corrupted deck file.');
        return null;
    }

    return parsed;
};