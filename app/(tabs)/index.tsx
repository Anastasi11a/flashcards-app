import { FlatList, ListRenderItem } from "react-native";
import { useRouter } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

import { useDecks } from "@/context/DeckContext";
import { Deck } from "@/data/decks";
import { ScreenView, DeckContainer, DeckTitle } from "@/ui/CardInputFields";

export default function App() {
    const router = useRouter();
    const { decks, setSelectedDeckId } = useDecks();
    const headerHeight = useHeaderHeight();

    const handlePress = (deckId: string) => {
        setSelectedDeckId(deckId);
        router.push('/deck/deck-detail');
    };

    const renderDeckItem: ListRenderItem<Deck> = ({ item }) => (
        <DeckContainer onPress={() => handlePress(item.id)}>
            <DeckTitle numberOfLines={1} ellipsizeMode='tail'>
                {item.title}
            </DeckTitle>
        </DeckContainer>
    );

    return (
        <ScreenView>
            <FlatList
                data={[...decks].reverse()}
                keyExtractor={(item) => item.id}
                renderItem={renderDeckItem}
                contentContainerStyle={{ 
                    paddingTop: headerHeight, 
                    paddingBottom: 100, 
                    gap: 4 
                }}
            />
        </ScreenView>
    );
};