import { Alert } from "react-native";

export type DeleteTarget = 'deck' | 'folder' | 'deckFromFolder' | 'card';

interface ConfirmDeleteOptions {
    onCancel?: (id: string) => void;
    onConfirm?: (id: string) => Promise<void> | void;
}

export const useConfirmDelete = (options: ConfirmDeleteOptions = {}) => {
    const confirmDelete = (type: DeleteTarget, id: string): Promise<boolean> => {
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

        return new Promise<boolean>((resolve) => {
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
                            await options.onConfirm?.(id);
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