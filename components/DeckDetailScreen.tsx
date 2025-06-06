import { useState } from "react";
import { Text, View, FlatList, Pressable, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import styled from "styled-components";

import { Card, initialDecks } from "@/data/decks";

interface Props {
    deckId?: string;
}

const DeckDetailScreen: React.FC<Props> = ({ deckId }) => {
    const deck = initialDecks.find((deck) => deck.id === deckId);
    const [visibleAnswers, setVisibleAnswers] = useState<Record<string, boolean>>({});
    const [cards, setCards] = useState<Card[]>(deck?.cards ?? []);

    const toggleAnswer = (cardId: string) => {
        setVisibleAnswers((prev) => ({
            ...prev,
            [cardId]: !prev[cardId],
        }));
    };

    const deleteCard = (cardId: string) => {
        setCards(prev => prev.filter(card => card.id !== cardId));

        setVisibleAnswers(prev => {
            const updated = { ...prev };
            delete updated[cardId];
            return updated;
        });
    };

    const renderRightActions = (cardId: string) => (
        <DeleteCard onPress={() => deleteCard(cardId)}>
            <MaterialIcons name='delete' size={24} color='#e6e6e6' />
        </DeleteCard>
    );

    return (
        <StyledView>
            <FlatList
                data={cards}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 12, paddingTop: 16 }}
                renderItem={({ item }) => (
                    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                        <CardStyledContainer onPress={() => toggleAnswer(item.id)}>
                            <StyledQuestion>{item.question}</StyledQuestion>
                            {visibleAnswers[item.id] && (
                                <StyledAnswer>{item.answer}</StyledAnswer>
                            )}
                        </CardStyledContainer>
                    </Swipeable>
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

const DeleteCard = styled(TouchableOpacity)`
    width: 64px;
    margin-left: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background-color: #d11a2a;
`;