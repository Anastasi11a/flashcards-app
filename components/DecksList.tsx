import { useState, useRef, useCallback } from "react";
import { FlatList } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import type SwipeableType from "react-native-gesture-handler/Swipeable";

import { Card } from "@/data/decks";
import SwipeOptions from "./SwipeOptions";
import DeckCardItem from "@/ui/DeckCardItem";
import DeckListEmpty from "@/ui/DeckListEmpty";
import { flatListStyles } from "@/utils/contentContainerStyle";

type SwipeableRef = SwipeableType | null;

interface DeckListProps {
    cards: Card[];
    onDelete: (card: Card) => void;
    onEdit?: (card: Card) => void;
    isHeaderTransparent?: boolean;
}

const DeckList = ({ 
    cards, 
    onDelete, 
    onEdit, 
    isHeaderTransparent = false
}: DeckListProps) => {
    const swipeableRefs = useRef<Record<string, SwipeableRef>>({});

    const [visibleAnswers, setVisibleAnswers] = useState<Record<string, boolean>>({});
    const [swipingCardId, setSwipingCardId] = useState<string | null>(null);

    const toggleAnswer = (cardId: string) => {
        if (swipingCardId === cardId) return;
            setVisibleAnswers((prev) => ({
                ...prev,
                [cardId]: !prev[cardId],
            })
        );
    };

    const renderRightActions = useCallback(
        (card: Card, swipeableRef: SwipeableRef) => (
            <SwipeOptions
                card={card}
                swipeableRef={swipeableRef}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        ),
        [onDelete, onEdit]
    );

    const renderItem = ({ item }: { item: Card }) => (
        <Swipeable
            ref={(ref) => {
                swipeableRefs.current[item.id] = ref;
            }}
            renderRightActions={(_, __, swipeable) => renderRightActions(item, swipeable)}
            onSwipeableWillOpen={() => setSwipingCardId(item.id)}
            onSwipeableClose={() => setSwipingCardId(null)}>

            <DeckCardItem
                question={item.question}
                answer={item.answer}
                isAnswerVisible={visibleAnswers[item.id]}
                onPress={() => toggleAnswer(item.id)}
            />
        </Swipeable>
    );

    return (
        <FlatList
            data={cards}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={
                <DeckListEmpty>No cards yet. Start by adding one!</DeckListEmpty>
            }
            contentContainerStyle={flatListStyles.deckList(isHeaderTransparent)}
        />
    );
};

export default DeckList;