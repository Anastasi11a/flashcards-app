import { useState, useRef } from 'react';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import SwipeButtons from '@/ui/buttons/SwipeButtons';
import DeckContainer from '@/ui/container/DeckContainer';
import { flatListStyles } from '@/utils/contentContainerStyle';

type SwipeableProps<T extends { id: string; title: string }> = {
    data: T[];
    type: 'deck' | 'folder';
    isDeck: boolean;
    getCardCount: (item: T) => number;
    onDelete: (id: string) => Promise<void>;
    onReorder: (data: T[]) => Promise<void>;
    onPress: (id: string) => void;
};

export function SwipeableReorderList<T extends { id: string; title: string }>({
    data, 
    type, 
    isDeck, 
    getCardCount, 
    onDelete, 
    onReorder, 
    onPress
}: SwipeableProps<T>) {
    const [pressedId, setPressedId] = useState<string | null>(null);
    const swipeableRefs = useRef<Record<string, Swipeable | null>>({});

    const confirmDelete = useConfirmDelete({
        onCancel: (id) => {
            swipeableRefs.current[id]?.close();
            setPressedId(null);
        },
        onConfirm: async (id) => {
            await onDelete(id);
            setPressedId(null);
        },
    });

    if (!data.length) return null;

    const renderRightActions = (id: string) => (
        <SwipeButtons
            isPressed={pressedId === id}
            isDeleteGradient={false}
            onDelete={() => {
                setPressedId(id);
                confirmDelete(type, id);
            }}
        />
    );

    const renderItem = ({ item, drag }: RenderItemParams<T>) => (
        <Swipeable
            ref={(ref) => {
                swipeableRefs.current[item.id] = ref;
            }}
            overshootRight={false}
            renderRightActions={() => renderRightActions(item.id)}
        >
            <DeckContainer
                isDeck={isDeck}
                title={item.title}
                cardCount={getCardCount(item)}
                onPress={() => onPress(item.id)}
                onLongPress={drag}
            />
        </Swipeable>
    );

    return (
        <DraggableFlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onDragEnd={({ data }) => onReorder(data)}
            contentContainerStyle={flatListStyles.appDecks()}
            showsVerticalScrollIndicator={false}
        />
    );
};