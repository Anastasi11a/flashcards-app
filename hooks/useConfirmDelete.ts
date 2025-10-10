import { Alert } from "react-native";

type DeleteTarget = 'deck' | 'folder';

interface ConfirmDeleteOptions {
    onCancel?: (id: string) => void;
    onConfirm?: (id: string) => Promise<void> | void;
}

export const useConfirmDelete = (options: ConfirmDeleteOptions = {}) => {
    const confirmDelete = (type: DeleteTarget, id: string): Promise<boolean> => {
        const title = type === 'deck' ? 'Delete Deck' : 'Delete Folder';
        const message =
            type === 'deck'
                ? 'Are you sure you want to delete this deck?'
                : 'Are you sure you want to delete this folder?';

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
                        onPress: () => {
                            options.onConfirm?.(id);
                            resolve(true);
                        } 
                    },
                ],
                { cancelable: true }
            );
        })
    };

    return confirmDelete;
};