import { useRef, useMemo, useCallback } from "react";
import { FlatList } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { useDecks } from "@/context/DeckContext";
import { useConfirmDelete } from "@/hooks/useConfirmDelete";
import SwipeButtons from "@/ui/buttons/SwipeButtons";
import DeckContainer from "@/ui/container/DeckContainer";
import MessageContainer from "@/ui/container/MessageContainer";
import { flatListStyles } from "@/utils/contentContainerStyle";
import { navigateToCards } from "@/utils/navigation/navigation";

const FolderList = ({ folderId }: { folderId?: string }) => {
    const { decks, folders, actions, folderActions } = useDecks();
    const confirmDelete = useConfirmDelete();
    const swipeableRefs = useRef<Record<string, Swipeable | null>>({});

    const shownDecks = useMemo(() => {
        if (folderId) {
            return folders.find(f => f.id === folderId)?.decks ?? [];
        }
        return decks;
    }, [folderId, folders, decks]);

    const handleDelete = useCallback(
        async (deckId: string) => {
            if (folderId) {
                const confirmed = await confirmDelete('deckFromFolder', deckId);
                if (confirmed) {
                    await folderActions.removeDeckFromFolder(folderId, deckId);
                }
            } else {
                const confirmed = await confirmDelete('deck', deckId);
                if (confirmed) {
                    await actions.deleteDeck(deckId);
                }
            }
        },
        [folderId, confirmDelete, actions, folderActions]
    );

    const renderRightActions = useCallback(
        (deckId: string, swipeable: Swipeable | null) => (
            <SwipeButtons
                onEdit={undefined}
                onDelete={async () => {
                    await handleDelete(deckId);
                    swipeable?.close();
                }}
            />
        ),
        [handleDelete]
    );

    return (
        <FlatList
            data={shownDecks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Swipeable
                    ref={(ref) => {
                        swipeableRefs.current[item.id] = ref;
                    }}
                    renderRightActions={(_, __, swipeable) =>
                        renderRightActions(item.id, swipeable)
                    }
                >
                    <DeckContainer
                        title={item.title}
                        showCountBadge={false}
                        onPress={() => navigateToCards(item.id)}
                    />
                </Swipeable>
            )}
            ListEmptyComponent={<MessageContainer>No decks found</MessageContainer>}
            contentContainerStyle={flatListStyles.folderDetail()}
        />
    );
};

export default FolderList;