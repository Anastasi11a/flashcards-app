import { Alert } from "react-native";
import { useRouter } from "expo-router";

import { useDecks } from "@/context/DeckContext";

export const useSubmitDraftTitle = () => {
    const { actions, folder, draftTitle } = useDecks();
    const router = useRouter();

    const submit = async (type: 'deck' | 'folder') => {
        const trimmed = draftTitle.value.trim();

        if (!trimmed) {
            Alert.alert(`Please enter a ${type} title`);
            return;
        }

        let id: string | null = null;

        if (type === 'deck') {
            id = await actions.addDeck(trimmed);
        } else {
            id = await folder.addFolder(trimmed).catch(() => null);
        }

        if (!id) return;
        draftTitle.clear();

        if (type === 'deck') {
            router.push({
                pathname: '/create/add-deck-cards',
                params: { title: trimmed, deckId: id },
            });
        } else {
            router.push({
                pathname: '/folder/select',
                params: { folderId: id },
            });
        }
    };

    return { submit };
};