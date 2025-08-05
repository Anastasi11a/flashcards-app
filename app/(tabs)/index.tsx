import { useRouter } from "expo-router";
import { FlatList, ListRenderItem } from "react-native";

import { useDecks } from "@/context/DeckContext";
import { Deck } from "@/data/decks";
import DeckListItem from "@/ui/DeckListItem";
import DeckListContainer from "@/ui/layout/DeckListContainer";

export default function App() {
    const router = useRouter();
    const { decks, setSelectedDeckId } = useDecks();

    const handlePress = (deckId: string) => {
        setSelectedDeckId(deckId);
        router.push('/deck/deck-detail');
    };

    const renderDeckItem: ListRenderItem<Deck> = ({ item }) => (
        <DeckListItem
            title={item.title}
            onPress={() => handlePress(item.id)}
        />
    );

    return (
        <DeckListContainer>
            <FlatList
                data={decks}
                keyExtractor={(item) => item.id}
                renderItem={renderDeckItem}
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