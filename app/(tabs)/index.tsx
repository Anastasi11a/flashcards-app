import { Text, View, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import styled from "styled-components";

import { useDecks } from "@/context/DeckContext";

export default function App() {
    const router = useRouter();
    const { decks } = useDecks();

    return (
        <Container>
            <FlatList
                data={decks}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100, gap: 4 }}
                renderItem={({ item }) => (
                    <DeckCard onPress={() => router.push({
                        pathname: '/deck/[id]',
                        params: { id: item.id },
                    })}>
                        <DeckTitle numberOfLines={1} ellipsizeMode='tail'>
                            {item.title}
                        </DeckTitle>
                    </DeckCard>
                )}
            />
        </Container>
    );
};

const Container = styled(View)`
    position: relative;
    flex: 1;
    padding: 16px 10px;
    background-color: #1a1c20;
`;

const DeckCard = styled(Pressable)`
    padding: 16px;
    border-radius: 16px;
    background-color: #25292e;
`;

const DeckTitle = styled(Text)`
    font-size: 18px;
    font-weight: bold;
    color: #0a7ea4;
`;