import { FlatList } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import DeckListContainer from "@/ui/layout/DeckListContainer";
import DeckListItem from "@/ui/DeckListItem";
import DeckListEmpty from "@/ui/DeckListEmpty";
import SwipeOptionsView from "@/ui/SwipeOptionsView";
import { flatListStyles } from "@/utils/contentContainerStyle";

interface Props {
    shownDecks: { id: string; title: string }[];
    onPressDeck: (deckId: string) => void;
    onDeleteDeck: (deckId: string) => void;
}

const FolderDetailScreen = ({ shownDecks, onPressDeck, onDeleteDeck }: Props) => {
    const renderRightActions = (deckId: string) => (
        <SwipeOptionsView onDeletePress={() => onDeleteDeck(deckId)} />
    );

    return (
        <DeckListContainer>
            <FlatList
                data={shownDecks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                        <DeckListItem
                            title={item.title}
                            onPress={() => onPressDeck(item.id)}
                            showCheckbox={false}
                            showBookmarkIcon={false}
                        />
                    </Swipeable>
                )}
                ListEmptyComponent={<DeckListEmpty>No decks found</DeckListEmpty>}
                contentContainerStyle={flatListStyles.folderDetail()}
            />
        </DeckListContainer>
    );
};

export default FolderDetailScreen;