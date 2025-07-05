import type Swipeable from 'react-native-gesture-handler/Swipeable';

import SwipeButton from "./SwipeButton";
import { ButtonRowContainer } from "@/ui/CardInputFields";

interface SwipeOptionsProps {
    cardId: string;
    deckId: string;
    swipeableRef?: Swipeable | null;
    onDelete: (deckId: string, cardId: string) => void;
    onEdit?: (deckId: string, cardId: string) => void;
}

const SwipeOptions = (props: SwipeOptionsProps) => {
    return (
        <ButtonRowContainer>
            <SwipeButton 
                iconName='delete-sweep'
                iconType='delete'
                onPress={() => props.onDelete(props.deckId, props.cardId)} 
            />
            {props.onEdit && (
                <SwipeButton 
                    iconName='playlist-edit'
                    iconType='edit'
                    onPress={() => {
                        props.onEdit?.(props.deckId, props.cardId);
                        props.swipeableRef?.close();
                    }} 
                />
            )}
        </ButtonRowContainer>
    );
};

export default SwipeOptions;