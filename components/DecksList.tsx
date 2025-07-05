import { useState, useRef } from "react";
import { Text, View, FlatList } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import type SwipeableLegacyType from 'react-native-gesture-handler/Swipeable';
import styled from "styled-components";

import { Card } from "@/data/decks";
import SwipeOptions from "./SwipeOptions";
import { DeckContainer } from "@/ui/CardInputFields";

interface DeckListProps {
    deckId?: string;
    cards: Card[];
    paddingTop?: number;
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
        const swipeableRef = swipeableRefs.current[cardId];

        const swipeActions = (
            <SwipeOptions
                cardId={cardId}
                deckId={deckId}
                onDelete={props.onDelete}
                onEdit={props.onEdit}
                swipeableRef={swipeableRef}
            />
        );

        return swipeActions;
    };

    return (
        <StyledView>
            <FlatList
                data={[...props.cards].reverse()}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    gap: 4, 
                    marginVertical: 16, 
                    paddingBottom: 140,
                    ...(props.paddingTop !== undefined && { paddingTop: props.paddingTop }),
                }}
                renderItem={({ item }) => (
                    <Swipeable 
                        ref={(ref) => {swipeableRefs.current[item.id] = ref}}
                        renderRightActions={() => renderRightActions(item.id)}
                        onSwipeableWillOpen={() => setSwipingCardId(item.id)}
                        onSwipeableClose={() => setSwipingCardId(null)}>

                        <DeckContainer onPress={() => toggleAnswer(item.id)}>
                            <StyledQuestion>{item.question}</StyledQuestion>
                            {visibleAnswers[item.id] && (
                                <StyledAnswer>{item.answer}</StyledAnswer>
                            )}
                        </DeckContainer>
                    </Swipeable>
                )}
            />
        </StyledView>
    );
};

export default DeckList;

const StyledView = styled(View)`
    flex: 1;
    padding: 0 10px;
    background-color: #1a1c20;
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