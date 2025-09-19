import { useCallback, useRef, useState } from "react";
import { FlatList } from "react-native";
import type SwipeableType from "react-native-gesture-handler/Swipeable";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { Card } from "@/data/decks";
import CardContainer from "@/ui/container/CardContainer";
import DeckListEmpty from "@/ui/DeckListEmpty";
import { flatListStyles } from "@/utils/contentContainerStyle";
import SwipeOptions, { SwipeOptionsProps } from "./SwipeOptions";

type SwipeableRef = SwipeableType | null;
type DeckListProps = Omit<SwipeOptionsProps, 'card' | 'swipeableRef'> & {
    cards: Card[];
    variant?: 'regular' | 'transparent';
};

const DeckList = ({ cards, variant = 'regular', onEdit, onDelete }: DeckListProps) => {
    const swipeableRefs = useRef<Record<string, SwipeableRef>>({});

    const [activeAnswerId, setActiveAnswerId] = useState<string | null>(null);
    const [swipingCardId, setSwipingCardId] = useState<string | null>(null);

    const toggleAnswer = useCallback(
        (cardId: string) => {
            if (swipingCardId === cardId) return;
            setActiveAnswerId((prev) => (prev === cardId ? null : cardId));
        },
        [swipingCardId]
    );

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

    const renderItem = useCallback(
        ({ item }: { item: Card }) => (
            <Swipeable
                ref={(ref) => {swipeableRefs.current[item.id] = ref}}
                renderRightActions={(_, __, swipeable) =>
                    renderRightActions(item, swipeable)
                }
                onSwipeableWillOpen={() => {
                    Object.entries(swipeableRefs.current).forEach(([id, ref]) => {
                        if (id !== item.id) {
                            ref?.close();
                        }
                    });
                    setSwipingCardId(item.id);
                }}
                onSwipeableClose={() => setSwipingCardId(null)}
            >
                <CardContainer
                    question={item.question}
                    answer={item.answer}
                    isAnswerVisible={activeAnswerId === item.id}
                    onPress={() => toggleAnswer(item.id)}
                />
            </Swipeable>
        ),
        [renderRightActions, toggleAnswer, activeAnswerId]
    );

    return (
        <FlatList
            data={cards}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={
                <DeckListEmpty>No cards yet. Start by adding one!</DeckListEmpty>
            }
            contentContainerStyle={flatListStyles.deckList(variant)}
        />
    );
};

export const AddCardsList = (props: Omit<DeckListProps, 'variant'>) => (
    <DeckList {...props} variant='regular' />
);

export const DeckContentList = (props: Omit<DeckListProps, 'variant'>) => (
    <DeckList {...props} variant='transparent' />
);
