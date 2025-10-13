import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";

import { useDecks } from "@/context/DeckContext";
import { SaveHandler } from "./useSaveModal";

interface Props {
    id?: string;
    type?: 'deck' | 'folder';
}

export function useEditTitleState({ id, type }: Props) {
    const { decks, folders, actions, folderActions } = useDecks();

    const item = type === 'folder'
        ? folders.find((f) => f.id === id)
        : decks.find((d) => d.id === id);

    const [title, setTitle] = useState(item?.title ?? '');

    useEffect(() => {
        if (item?.title !== undefined) {
            setTitle(item.title);
        }
    }, [item?.title, id]);

    const save: SaveHandler = useCallback(async () => {
        if (!id || !type) return false;

        const trimmed = title.trim();
        if (!trimmed) return false;

        const list = type === 'folder' ? folders : decks;
        const isDuplicate = list.some(
            (entry) => 
                entry.title.toLowerCase() === trimmed.toLowerCase() && 
                entry.id !== id
        );

        if (isDuplicate) {
            Alert.alert(
                'Duplicate Title',
                `A ${type} with this title already exists. Please choose another name.`
            );
            return false;
        }

        if (type === 'folder') {
            await folderActions.editFolder(id, trimmed);
        } else {
            await actions.editDeck(id, trimmed);
        }

        return true;
    }, [id, type, title, actions, folderActions, decks, folders]);

    return { title, setTitle, save };
};