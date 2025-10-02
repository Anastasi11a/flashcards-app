import { useLocalSearchParams } from "expo-router";

import { useDecks } from "@/context/DeckContext";
import FolderContent from "@/components/pages/FolderContent";
import useCustomHeader from "@/hooks/useCustomHeader";
import { useConfirmDelete } from "@/hooks/useConfirmDelete";
import { navigateBackToFolders } from "@/utils/navigation/navigation";

const FolderDetail = () => {
    const { folderId } = useLocalSearchParams<{ folderId?: string }>();
    const { folders, folderActions } = useDecks();

    const currentFolder = folders.find(f => f.id === folderId);

    const confirmDelete = useConfirmDelete({
        onConfirm: (id) => {
            folderActions.removeFolder(id);
            navigateBackToFolders();
        },
    });

    useCustomHeader({
        title: currentFolder?.title,
        headerTransparent: true,
        headerBlurEffect: 'dark',
        leftButton: { onPress: navigateBackToFolders },
        rightButton: {
            label: 'Delete',
            onPress: () => {
                if (folderId) confirmDelete('folder', folderId);
            },
        },
    });

    if (!folderId || !currentFolder) return null;

    return <FolderContent folderId={folderId} />;
};

export default FolderDetail;