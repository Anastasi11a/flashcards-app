import { Alert } from "react-native";
import { useDecks } from "@/context/DeckContext";

export type DeleteTarget = 'deck' | 'folder' | 'deckFromFolder' | 'card';

interface ConfirmDeleteOptions {
    onCancel?: (id: string) => void;
    onConfirm?: (id: string, folderId?: string) => Promise<void> | void;
}

export const useConfirmDelete = (options: ConfirmDeleteOptions = {}) => {
    const { actions, folderActions } = useDecks();

    const confirmDelete = (
        type: DeleteTarget, id: string, folderId?: string
    ): Promise<boolean> => {
        return new Promise<boolean>((resolve) => {
            let title = '';
            let message = '';

            switch (type) {
                case 'deck':
                    title = 'Delete Deck';
                    message = 'Are you sure you want to delete this deck?';
                    break;
                case 'folder':
                    title = 'Delete Folder';
                    message = 'Are you sure you want to delete this folder?';
                    break;
                case 'deckFromFolder':
                    title = 'Remove Deck from Folder';
                    message = 'This will only remove the deck from this folder.';
                    break;
                case 'card':
                    title = 'Delete Card';
                    message = 'Are you sure you want to delete this card?';
                    break;
            }

            if (type === 'deck' && folderId) {
                Alert.alert(
                    'Delete Deck',
                    'Do you want to delete this deck everywhere or only remove it from this folder?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => {
                                options.onCancel?.(id);
                                resolve(false);
                            },
                        },
                        {
                            text: 'Remove from folder only',
                            onPress: async () => {
                                await folderActions.removeDeckFromFolder(folderId, id);
                                resolve(true);
                            },
                        },
                        {
                            text: 'Delete everywhere',
                            style: 'destructive',
                            onPress: async () => {
                                await actions.deleteDeck(id);
                                resolve(true);
                            },
                        },
                    ],
                    { cancelable: true }
                );
                return;
            }

            Alert.alert(
                title,
                message,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => {
                            options.onCancel?.(id);
                            resolve(false);
                        },
                    },
                    {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: async () => {
                            await options.onConfirm?.(id, folderId);
                            resolve(true);
                        },
                    },
                ],
                { cancelable: true }
            );
        });
    };

    return confirmDelete;
};