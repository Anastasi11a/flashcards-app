import { useState, useRef } from "react";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { useDecks } from "@/context/DeckContext";
import { FolderWithDecks } from "@/data/decks";
import { useConfirmDelete } from "@/hooks/useConfirmDelete";
import SwipeButtons from "@/ui/buttons/SwipeButtons";
import DeckContainer from "@/ui/container/DeckContainer";
import { flatListStyles } from "@/utils/contentContainerStyle";
import { navigateToFolder } from "@/utils/navigation/navigation";

const FoldersScreen = () => {
    const [pressedId, setPressedId] = useState<string | null>(null);

    const { folders, folderActions } = useDecks();
    const swipeableRefs = useRef<Record<string, Swipeable | null>>({});

    const confirmDelete = useConfirmDelete({
        onCancel: (id) => {
            swipeableRefs.current[id]?.close();
            setPressedId(null);
        },
        onConfirm: async (id) => {
            await folderActions.removeFolder(id);
            setPressedId(null);      
        },
    });

    if (!folders.length) return null;

    const renderRightActions = (folderId: string) => (
        <SwipeButtons
            isPressed={pressedId === folderId}
            isDeleteGradient={false}
            onDelete={() => {
                setPressedId(folderId);
                confirmDelete('folder', folderId);            
            }}
        />
    );

    const renderDeckItem = ({ item, drag }: RenderItemParams<FolderWithDecks>) => (
        <Swipeable
            ref={(ref) => { 
                swipeableRefs.current[item.id] = ref 
            }}
            overshootRight={false}
            renderRightActions={() => renderRightActions(item.id)}
        >
            <DeckContainer
                title={item.title}
                isDeck={false}
                cardCount={item.decks ? item.decks.length : item.deckIds.length}
                onPress={() => navigateToFolder(item.id)}
                onLongPress={drag}
            />
        </Swipeable>
    );

    return (
        <DraggableFlatList
            data={folders}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={renderDeckItem}
            onDragEnd={({ data }) => folderActions.reorderFolders(data)}
            contentContainerStyle={flatListStyles.appDecks()}
        />
    );
};

export default FoldersScreen;