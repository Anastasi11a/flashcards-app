import { Alert } from "react-native";
import { Router } from "expo-router";

export const confirmRemoveFolder = (
    folderId: string,
    router: Router,
    removeFolder: (id: string) => Promise<void>,
    setResetGradient: (value: boolean) => void
) => {
    if (!folderId) return;
    setResetGradient(false);

    Alert.alert(
        'Delete folder?',
        'This folder will be removed. Decks inside will stay.',
        [
            { 
                text: 'Cancel', 
                style: 'cancel',
                onPress: () => setResetGradient(true),
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    await removeFolder(folderId);
                    router.replace('/(tabs)/about');
                },
            },
        ]
    );
};