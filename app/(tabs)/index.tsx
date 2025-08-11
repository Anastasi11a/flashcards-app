import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";

import { useDecks } from "@/context/DeckContext";
import { Deck } from "@/data/decks";
import DeckListItem from "@/ui/DeckListItem";
import DeckListContainer from "@/ui/layout/DeckListContainer";

export default function App() {
    const router = useRouter();
    const { decks, setSelectedDeckId, reorderDecks, isDeckFavorite } = useDecks();
    const [localDecks, setLocalDecks] = useState(decks);

    useEffect(() => {
        setLocalDecks(decks);
    }, [decks]);

    const handlePress = (deckId: string) => {
        setSelectedDeckId(deckId);
        router.push('/deck/deck-detail');
    };

    const renderDeckItem = ({ item, drag, isActive }: RenderItemParams<Deck>) => (
        <DeckListItem
            title={item.title}
            onPress={() => handlePress(item.id)}
            onLongPress={drag}
            isActive={isActive}
            isFavorite={isDeckFavorite(item.id)}
        />
    );

    return (
        <DeckListContainer>
            <DraggableFlatList
                data={localDecks}
                keyExtractor={(item) => item.id}
                renderItem={renderDeckItem}
                onDragEnd={({ data }) => {
                    setLocalDecks(data);
                    reorderDecks(data);
                }}
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