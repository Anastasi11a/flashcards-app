import { useCallback, useRef, useState } from "react";
import { FlatList } from "react-native";
import type SwipeableType from "react-native-gesture-handler/Swipeable";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { Card } from "@/data/decks";
import CardContainer from "@/ui/container/CardContainer";
import MessageContainer from "@/ui/container/MessageContainer";
import SwipeButtons from "@/ui/buttons/SwipeButtons";
import { flatListStyles } from "@/utils/contentContainerStyle";

type SwipeableRef = SwipeableType | null;
type DeckListProps = {
    cards: Card[];
    variant?: 'regular' | 'transparent';
    onEdit?: (cardId: string) => void;
    onDelete: (cardId: string) => void;
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
            <SwipeButtons
                onEdit={onEdit 
                    ? () => { 
                        onEdit(card.id); 
                        swipeableRef?.close(); 
                    } 
                    : undefined
                }
                onDelete={() => onDelete(card.id)}
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
                <MessageContainer>No cards yet. Start by adding one!</MessageContainer>
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