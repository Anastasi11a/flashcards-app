import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useDecks } from "@/context/DeckContext";
import ActionButtonsBarView from "@/ui/ActionButtonsBarView";

interface ActionButtonsBarProps {
    folderId: string;
}

const ActionButtonsBar = ({ folderId }: ActionButtonsBarProps) => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { selection, moveDecksToFolder, copyDecksToFolder } = useDecks();

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
        navigateToFolder(folderId);
    };

    return (
        <ActionButtonsBarView
            insets={insets}
            hasSelection={hasSelection}
            onCopy={() => handleAction(copyDecksToFolder)}
            onMove={() => handleAction(moveDecksToFolder)}
            onSaveEmptyFolder={handleSaveEmptyFolder}
        />
    );
};

export default ActionButtonsBar;