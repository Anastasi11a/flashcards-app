import { useLocalSearchParams } from "expo-router";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useDecks } from "@/context/DeckContext";
import FolderActionButtons from "@/ui/buttons/FolderActionButtons";
import { navigateToFolder } from "@/utils/navigation/navigation";

type Props = {
    selectedIds: string[];
    clearSelection: () => void;
};

const FolderActionBar = ({ selectedIds, clearSelection }: Props) => {
    const { folderActions  } = useDecks();
    const { folderId: currentFolderId } = useLocalSearchParams<{ folderId: string }>();
    const insets = useSafeAreaInsets();

    const hasSelection = selectedIds.length > 0;

    const handleAction = async (
        action: (ids: string[], targetFolderId: string) => Promise<void>
    ) => {
        if (!hasSelection || !currentFolderId) return;
        await action(selectedIds, currentFolderId);
        clearSelection();
        navigateToFolder(currentFolderId, true);
    };

    const handleSaveEmptyFolder = () => {
        if (!currentFolderId) return;
        navigateToFolder(currentFolderId, true);
    };

    return (
        <FolderActionButtons
            insets={insets}
            buttons = {[
                {
                    key: 'save',
                    label: 'Save Empty Folder',
                    icon: Entypo,
                    iconName: 'folder',
                    variant: 'GRAY',
                    disabled: false,
                    onPress: handleSaveEmptyFolder,
                },
                {
                    key: 'move',
                    label: 'Move',
                    icon: MaterialCommunityIcons,
                    iconName: 'folder-move',
                    variant: hasSelection ? 'BLUE' : 'GRAY',
                    disabled: !hasSelection,
                    onPress: () => handleAction(folderActions.moveDecksToFolder),
                },
            ]}
        />
    );
};

export default FolderActionBar;