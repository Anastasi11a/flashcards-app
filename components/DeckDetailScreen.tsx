import { useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import styled from "styled-components";

import { initialDecks } from "@/data/decks";

interface Props {
    deckId?: string;
}

const DeckDetailScreen: React.FC<Props> = ({ deckId }) => {
    const deck = initialDecks.find((deck) => deck.id === deckId);
    const [visibleAnswers, setVisibleAnswers] = useState<Record<string, boolean>>({});

    const toggleAnswer = (cardId: string) => {
        setVisibleAnswers((prev) => ({
            ...prev,
            [cardId]: !prev[cardId],
        }));
    };

    if (!deck) {
        return <Text>Deck not found</Text>
    }

    return (
        <StyledView>
            <FlatList
                data={deck.cards}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 12, paddingTop: 16 }}
                renderItem={({ item }) => (
                    <CardStyledContainer onPress={() => toggleAnswer(item.id)}>
                        <StyledQuestion>{item.question}</StyledQuestion>

                        {visibleAnswers[item.id] && (
                            <StyledAnswer>{item.answer}</StyledAnswer>
                        )}
                    </CardStyledContainer>
                )}
            />
        </StyledView>
    );
}

export default DeckDetailScreen;

export const getDeckTitleById = (id?: string): string => {
    const deck = initialDecks.find((deck) => deck.id === id);
    return deck?.title ?? '';
};

const StyledView = styled(View)`
    flex: 1;
    padding: 16px 10px;
    background-color: #25292e;
`;

const CardStyledContainer = styled(Pressable)`
    padding: 16px 12px;
    border-radius: 12px;
    background-color: #1a1c20;
`;

const StyledQuestion = styled(Text)`
    font-size: 18px;
    font-weight: bold;
    color: #0a7ea4;
`;

const StyledAnswer = styled(Text)`
    margin-top: 10px;
    font-size: 16px;
    color: #e6e6e6;
`;