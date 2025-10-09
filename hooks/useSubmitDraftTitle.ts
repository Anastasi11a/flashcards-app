import { Alert } from "react-native";
import uuid from "uuid-random";

import { useDecks } from "@/context/DeckContext";
import { 
    navigateToAddDeck, 
    navigateToFolderSelection, 
} from "@/utils/navigation/navigation";

export const useSubmitDraftTitle = () => {
    const { decks, folders, actions, folderActions } = useDecks();

    const submit = async (type: 'deck' | 'folder', title: string): Promise<boolean> => {
        const trimmed = title.trim();

        if (!trimmed) {
            Alert.alert(`Please enter a ${type} title`);
            return false;
        }

        const isDuplicate =
            type === 'deck'
                ? decks.some((d) => d.title.toLowerCase() === trimmed.toLowerCase())
                : folders.some((f) => f.title.toLowerCase() === trimmed.toLowerCase());

        if (isDuplicate) {
            Alert.alert(
                'Duplicate Title',
                `A ${type} with this title already exists. Please choose another name`
            );
            return false;
        }

        const id = uuid();
        
        if (type === 'deck') {
            await actions.addDeck(id, trimmed);
            navigateToAddDeck(id, trimmed);
        } else {
            await folderActions.addFolder(id, trimmed);
            navigateToFolderSelection(id);
        }

        return true;
    };

    return { submit };
};