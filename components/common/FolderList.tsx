import { useMemo } from "react";
import { FlatList } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { useDecks } from "@/context/DeckContext";
import DeckContainer from "@/ui/container/DeckContainer";
import MessageContainer from "@/ui/container/MessageContainer";
import { flatListStyles } from "@/utils/contentContainerStyle";
import { navigateToCards } from "@/utils/navigation/navigation";

const FolderList = ({ folderId }: { folderId?: string }) => {
    const { decks, folders } = useDecks();

    const shownDecks = useMemo(() => {
        if (folderId) {
            return folders.find(f => f.id === folderId)?.decks ?? [];
        }
        return decks;
    }, [folderId, folders, decks]);

    return (
        <FlatList
            data={shownDecks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Swipeable>
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