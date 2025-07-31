import { useState, useRef } from "react";
import { FlatList } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import Swipeable from "react-native-gesture-handler/Swipeable";
import type SwipeableLegacyType from 'react-native-gesture-handler/Swipeable';

import { Card } from "@/data/decks";
import SwipeOptions from "./SwipeOptions";
import DeckCardItem from "@/ui/DeckCardItem";

interface DeckListProps {
    deckId?: string;
    cards: Card[];
    onDelete: (deckId: string, cardId: string) => void;
    onEdit?: (deckId: string, cardId: string) => void;
    isHeaderTransparent?: boolean;
}

const DeckList = ({ 
    deckId = '', 
    cards,
    isHeaderTransparent = false, 
    onDelete,
    onEdit, 
}: DeckListProps) => {
    const swipeableRefs  = useRef<Record<string, SwipeableLegacyType | null>>({});
    const headerHeight = useHeaderHeight();
    const paddingTop = isHeaderTransparent ? headerHeight : 0;

    const [visibleAnswers, setVisibleAnswers] = useState<Record<string, boolean>>({});
    const [swipingCardId, setSwipingCardId] = useState<string | null>(null);
    
    const toggleAnswer = (cardId: string) => {
        if (swipingCardId === cardId) return;
        setVisibleAnswers((prev) => ({ 
            ...prev, 
            [cardId]: !prev[cardId] 
        }));
    };

    const renderRightActions = (
        cardId: string,
        swipeableRef: SwipeableLegacyType | null
    ) => (
        <SwipeOptions
            cardId={cardId}
            deckId={deckId}
            onDelete={onDelete}
            onEdit={onEdit}
            swipeableRef={swipeableRef}
        />
    );

    const renderItem = ({ item }: { item: Card }) => (
        <Swipeable
            ref={(ref) => {swipeableRefs.current[item.id] = ref}}
            renderRightActions={(_, __, swipeable) => 
                renderRightActions(item.id, swipeable)
            }
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
            contentContainerStyle={{
                gap: 4,
                marginVertical: 16,
                paddingTop: paddingTop,
                paddingBottom: 140,
                paddingHorizontal: 10,
            }}
            renderItem={renderItem}
        />
    );
};

export default DeckList;