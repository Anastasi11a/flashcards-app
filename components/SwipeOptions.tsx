import type Swipeable from 'react-native-gesture-handler/Swipeable';

import { Card } from "@/data/decks";
import SwipeOptionsView from '@/ui/SwipeOptionsView';

export interface SwipeOptionsProps  {
    card: Card;
    swipeableRef?: Swipeable | null;
    onDelete: (cardId: string) => void;
    onEdit?: (cardId: string) => void;
}

const SwipeOptions = ({ card, swipeableRef, onDelete, onEdit }: SwipeOptionsProps) => {
    const handleDelete = () => onDelete(card.id);

    const handleEdit = () => {
        if (!onEdit) return;
        onEdit(card.id);
        swipeableRef?.close();
    };

    return (
        <SwipeOptionsView
            onDelete={handleDelete}
            onEdit={onEdit ? handleEdit : undefined}
        />
    );
};

export default SwipeOptions;