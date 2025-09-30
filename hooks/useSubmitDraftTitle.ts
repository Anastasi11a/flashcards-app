import { Alert } from "react-native";
import { useRouter } from "expo-router";
import uuid from "uuid-random";

import { useDecks } from "@/context/DeckContext";

export const useSubmitDraftTitle = () => {
    const { actions, folderActions } = useDecks();
    const router = useRouter();

    const submit = async (type: 'deck' | 'folder', title: string) => {
        const trimmed = title.trim();

        if (!trimmed) {
            Alert.alert(`Please enter a ${type} title`);
            return;
        }

        const id = uuid();
        
        if (type === 'deck') {
            await actions.addDeck(id, trimmed);
            router.push({
                pathname: '/(modals)/add-deck',
                params: { title: trimmed, deckId: id },
            });
        } else {
            await folderActions.addFolder(id, trimmed);
            router.push({
                pathname: '/folder/select',
                params: { folderId: id },
            });
        }
    };

    return { submit };
};