import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useDecks } from "@/context/DeckContext";
import ActionButtonsBarView from "@/ui/ActionButtonsBarView";

const ActionButtonsBar = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { folderId } = useLocalSearchParams<{ folderId: string }>();
    const { selection, folder } = useDecks();

    const hasSelection = (selection?.selectedIds?.length ?? 0) > 0;

    const navigateToFolder = (targetFolderId: string) => {
        router.push({
            pathname: '/folder/folder-detail',
            params: { folderId: targetFolderId },
        });
    };

    const handleAction = async (
        action: (ids: string[], targetFolderId: string) => Promise<void>
    ) => {
        if (!hasSelection) return;
        await action(selection.selectedIds, folderId);
        selection.clear?.();
        navigateToFolder(folderId);
    };

    const handleSaveEmptyFolder = () => {
        if (!folderId) return;
        navigateToFolder(folderId);
    };

    return (
        <ActionButtonsBarView
            insets={insets}
            hasSelection={hasSelection}
            onMove={() => handleAction(folder.moveDecksToFolder)}
            onSave={handleSaveEmptyFolder}
        />
    );
};

export default ActionButtonsBar;