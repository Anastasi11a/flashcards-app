import type Swipeable from 'react-native-gesture-handler/Swipeable';

import { Card } from "@/data/decks";
import SwipeOptionsView from '@/ui/SwipeOptionsView';

interface SwipeOptionsProps {
    card: Card;
    swipeableRef?: Swipeable | null;
    onDelete: (card: Card) => void;
    onEdit?: (card: Card) => void;
}

const SwipeOptions = ({ card, swipeableRef, onDelete, onEdit }: SwipeOptionsProps) => {
    const handleDelete = () => onDelete(card);

    const handleEdit = () => {
        if (!onEdit) return;
        onEdit(card);
        swipeableRef?.close();
    };

    return (
        <SwipeOptionsView
            onDeletePress={handleDelete}
            onEditPress={onEdit ? handleEdit : undefined}
        />
    );
};

export default SwipeOptions;