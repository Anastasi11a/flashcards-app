import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";

import { useDecks } from "@/context/DeckContext";
import { useMenu, MenuProvider } from "@/context/MenuContext";
import FolderContent from "@/components/pages/FolderContent";
import useCustomHeader from "@/hooks/useCustomHeader";
import { navigateBackToFolders } from "@/utils/navigation/navigation";

const FolderDetailInner = () => {
    const { folderId } = useLocalSearchParams<{ folderId?: string }>();
    const { folders } = useDecks();
    const { openMenu } = useMenu();

    const folder = useMemo(
        () => folders.find(f => f.id === folderId),
        [folders, folderId]
    );

    useCustomHeader({
        title: folder?.title,
        headerTransparent: true,
        headerBlurEffect: 'dark',
        leftButton: { onPress: navigateBackToFolders },
        rightButton: {
            iconName: 'options-vertical',
            onPress: openMenu, 
        },
    });

    if (!folderId || !folder) return null;

    return <FolderContent entity={folder}/> ;
};

const FolderDetail = () => (
    <MenuProvider>
        <FolderDetailInner />
    </MenuProvider>
);

export default FolderDetail;