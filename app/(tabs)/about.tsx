import { useRouter } from "expo-router";
import { FlatList } from "react-native";

import { useDecks } from "@/context/DeckContext";
import DeckListItem from "@/ui/DeckListItem";
import DeckListContainer from "@/ui/layout/DeckListContainer";

export default function BookmarksPage() {
    const router = useRouter();
    const { savedDecks, setSelectedDeckId } = useDecks();

    const handlePress = (deckId: string) => {
        setSelectedDeckId(deckId);
        router.push('/deck/deck-detail');
    };

    return (
        <DeckListContainer>
            <FlatList
                data={savedDecks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DeckListItem
                        title={item.title}
                        onPress={() => handlePress(item.id)}
                    />
                )}
                contentContainerStyle={{
                    gap: 4,
                    paddingTop: 140,
                    paddingBottom: 140,
                    paddingHorizontal: 10,
                }}
            />
        </DeckListContainer>
    );
};