import { useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import styled from "styled-components";

import { Card } from "@/data/decks";
import SwipeDelete from "./SwipeDelete";

interface DeckListProps {
    deckId?: string;
    cards: Card[];
    onDelete: (deckId: string, cardId: string) => void;
}

const DeckList = (props: DeckListProps) => {
    const [visibleAnswers, setVisibleAnswers] = useState<Record<string, boolean>>({});
    const [swipingCardId, setSwipingCardId] = useState<string | null>(null);
    
    const toggleAnswer = (cardId: string) => {
        if (swipingCardId === cardId) return;
        setVisibleAnswers((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
    };

    const renderRightActions = (cardId: string) => {
        if (!props.onDelete) return null;
        
        return (        
            <SwipeDelete
                onDelete={() => {
                    if (props.deckId) {
                        props.onDelete(props.deckId, cardId);
                    } else {
                        props.onDelete('', cardId)
                    }
                }}
            />
        ); 
    };

    return (
        <StyledView>
            <FlatList
                data={props.cards}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 10 }}
                renderItem={({ item }) => (
                    <Swipeable 
                        renderRightActions={() => renderRightActions(item.id)}
                        onSwipeableWillOpen={() => setSwipingCardId(item.id)}
                        onSwipeableClose={() => setSwipingCardId(null)}
                    >
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
};

export default DeckList;

const StyledView = styled(View)`
    flex: 1;
    padding: 16px 10px;
    background-color: #1a1c20;
`;

const CardStyledContainer = styled(Pressable)`
    padding: 16px 12px;
    border-radius: 12px;
    background-color: #25292e;
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