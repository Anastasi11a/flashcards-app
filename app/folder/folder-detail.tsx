import { useLocalSearchParams } from "expo-router";

import { useDecks } from "@/context/DeckContext";
import FolderContent from "@/components/pages/FolderContent";
import useCustomHeader from "@/hooks/useCustomHeader";
import { navigateBackToFolders } from "@/utils/navigation/navigation";

const FolderDetail = () => {
    const { folderId } = useLocalSearchParams<{ folderId?: string }>();
    const { folders } = useDecks();

    const currentFolder = folders.find(f => f.id === folderId);

    useCustomHeader({
        title: currentFolder?.title,
        headerTransparent: true,
        headerBlurEffect: 'dark',
        leftButton: { onPress: navigateBackToFolders },
    });

    if (!folderId || !currentFolder) return null;

    return <FolderContent folderId={folderId} />;
};

export default FolderDetail;