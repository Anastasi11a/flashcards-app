import { Alert } from "react-native";
import { useRouter } from "expo-router";

import { useDecks } from "@/context/DeckContext";

export const useConfirmDeleteDeck = () => {
    const router = useRouter();
    const { deleteDeck } = useDecks();

    const confirmDeleteDeck = (deckId: string) => {
        Alert.alert(
            "Delete Deck",
            "Are you sure you want to delete this deck?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive",
                    onPress: () => {
                        deleteDeck(deckId);
                        router.replace('/');
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return confirmDeleteDeck;
};