import { Text, View, FlatList, Pressable } from "react-native";
import styled from "styled-components";

import { initialDecks } from "@/data/decks";

export default function App() {
    return (
        <Container>
            <FlatList
                data={initialDecks}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                    <DeckCard>
                        <DeckTitle>{item.title}</DeckTitle>
                        <DeckCount>{item.cards.length}</DeckCount>
                    </DeckCard>
                )}
            />
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
