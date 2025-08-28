import { useRouter } from "expo-router";
import { FlatList } from "react-native";

import { useDecks } from "@/context/DeckContext";
import DeckListItemContainer from "@/components/DeckListItemContainer";
import FolderListItem from "@/components/FolderListItem";
import DeckListContainer from "@/ui/layout/DeckListContainer";
import { HEADER_HEIGHT, FOLDER_BAR_HEIGHT } from "@/constants/height/header";
import { flatListContentStyle } from "@/constants/flatlist/flatListStyles";

export default function BookmarksPage() {
    const router = useRouter();
    const { savedDecks, setSelectedDeckId, folders } = useDecks();

    const hasFolders = folders.length > 0;
    const listPaddingTop = HEADER_HEIGHT + (hasFolders ? FOLDER_BAR_HEIGHT : 10);

    const handlePress = (deckId: string) => {
        setSelectedDeckId(deckId);
        router.push('/deck/deck-detail');
    };

    return (
        <DeckListContainer>
            <FolderListItem folders={folders} />
            <FlatList
                data={savedDecks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DeckListItemContainer
                        deckId={item.id}
                        title={item.title}
                        onPress={() => handlePress(item.id)}
                    />
                )}
                contentContainerStyle={{
                    paddingTop: listPaddingTop,
                    ...flatListContentStyle,
                }}
            />
        </DeckListContainer>
    );
};