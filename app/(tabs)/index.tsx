import { Text, View, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Swipeable from "react-native-gesture-handler/Swipeable";
import styled from "styled-components";

import { useDecks } from "@/context/DeckContext";
import AddButton from "@/components/AddButton";
import SwipeDelete from "@/components/SwipeDelete";

export default function App() {
    const router = useRouter();
    const { decks, deleteDeck } = useDecks();

    const renderRightActions = (deckId: string) => {
        return <SwipeDelete onDelete={() => deleteDeck(deckId)} />
    };

    return (
        <Container>
            <FlatList
                data={decks}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                    <Swipeable 
                        renderRightActions={() => renderRightActions(item.id)}
                    >
                        <DeckCard onPress={() => router.push({
                            pathname: '/deck/[id]',
                            params: { id: item.id },
                        })}>
                            <DeckTitle>{item.title}</DeckTitle>
                            <DeckCount>{item.cards.length}</DeckCount>
                        </DeckCard>
                    </Swipeable>
                )}
            />
            <AddButton onPress={() => router.push({ pathname: '/create/add-deck-title' })} />
        </Container>
    );
}

const Container = styled(View)`
    flex: 1;
    padding: 16px 10px;
    background-color: #25292e;
`;

const DeckCard = styled(Pressable)`
    padding: 16px;
    border-radius: 20px;
    background-color: #1a1c20;
`;

const DeckTitle = styled(Text)`
    font-size: 20px;
    font-weight: bold;
    color: #0a7ea4;
`;

const DeckCount = styled(Text)`
    margin-top: 4px;
    font-size: 14px;
    color: #808080;
`;
