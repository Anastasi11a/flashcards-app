import { useState, useRef } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import type SwipeableLegacyType from 'react-native-gesture-handler/Swipeable';
import styled from "styled-components";

import { Card } from "@/data/decks";
import SwipeButton from "./SwipeButton";

interface DeckListProps {
    deckId?: string;
    cards: Card[];
    onDelete: (deckId: string, cardId: string) => void;
    onEdit?: (deckId: string, cardId: string) => void;
}

const DeckList = (props: DeckListProps) => {
    const swipeableRefs  = useRef<Record<string, SwipeableLegacyType | null>>({});
    const [visibleAnswers, setVisibleAnswers] = useState<Record<string, boolean>>({});
    const [swipingCardId, setSwipingCardId] = useState<string | null>(null);
    
    const toggleAnswer = (cardId: string) => {
        if (swipingCardId === cardId) return;
        setVisibleAnswers((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
    };

    const renderRightActions = (cardId: string) => {
        const deckId = props.deckId ?? '';

        return (
            <ButtonContainer>
                <SwipeButton 
                    iconName='delete-sweep'
                    iconType='delete'
                    onPress={() => props.onDelete(deckId, cardId)} 
                />
                {props.onEdit && (
                    <SwipeButton 
                        iconName='playlist-edit'
                        iconType='edit'
                        onPress={() => {
                            props.onEdit?.(deckId, cardId);
                            swipeableRefs.current[cardId]?.close();
                        }} 
                    />
                )}
            </ButtonContainer>
        );
    };

    return (
        <StyledView>
            <FlatList
                data={props.cards}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100, gap: 4 }}
                renderItem={({ item }) => (
                    <Swipeable 
                        ref={(ref) => {swipeableRefs.current[item.id] = ref}}
                        renderRightActions={() => renderRightActions(item.id)}
                        onSwipeableWillOpen={() => setSwipingCardId(item.id)}
                        onSwipeableClose={() => setSwipingCardId(null)}>

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
    padding: 16px 32px 16px 20px;
    border-radius: 12px;
    background-color: #25292e;
`;

const StyledInput = styled(Text)`
    line-height: 22px;
    letter-spacing: 0.4px;
    text-align-vertical: top;
`; 

const StyledQuestion = styled(StyledInput)`
    font-size: 18px;
    font-weight: bold;
    color: #0a7ea4;
`;

const StyledAnswer = styled(StyledInput)`
    margin-top: 10px;
    font-size: 16px;
    color: #e6e6e6;
`;

const ButtonContainer = styled(View)`
    flex-direction: row;
`;