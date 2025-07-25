import type Swipeable from 'react-native-gesture-handler/Swipeable';

import SwipeOptionsView from '@/ui/SwipeOptionsView';

interface SwipeOptionsProps {
    cardId: string;
    deckId: string;
    swipeableRef?: Swipeable | null;
    onDelete: (deckId: string, cardId: string) => void;
    onEdit?: (deckId: string, cardId: string) => void;
}

const SwipeOptions = ({ 
    cardId, deckId, swipeableRef, onDelete, onEdit 
}: SwipeOptionsProps) => {
    const handleDelete = () => onDelete(deckId, cardId);

    const handleEdit = () => {
        onEdit?.(deckId, cardId);
        swipeableRef?.close();
    };

    return (
        <SwipeOptionsView
            showEdit={!!onEdit}
            onDeletePress={handleDelete}
            onEditPress={onEdit ? handleEdit : undefined}
        />
    );
};

export default SwipeOptions;