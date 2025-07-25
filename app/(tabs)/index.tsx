import { FlatList, ListRenderItem } from "react-native";
import { useRouter } from "expo-router";

import { Deck } from "@/data/decks";
import { useDecks } from "@/context/DeckContext";
import DeckListContainer from "@/components/DeckListContainer";
import DeckListItem from "@/ui/DeckListItem";

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
                    paddingTop: 16, 
                    paddingHorizontal: 10,
                    paddingBottom: 140, 
                }}
            />
        </DeckListContainer>
    );
};