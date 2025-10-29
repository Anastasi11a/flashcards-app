import { useLocalSearchParams } from "expo-router";

import { useAddCardState } from "@/hooks/useAddCardState";
import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import useCustomHeader from "@/hooks/useCustomHeader";
import { useEditCardState } from "@/hooks/useEditCardState";
import { useSaveModal } from "@/hooks/useSaveModal";
import { KeyboardScreenContainer } from "@/ui/container/ScreenContainer";
import CardInputs from "@/ui/input/CardInputs";

type Params = {
    deckId: string;
    cardId?: string;
};

const CardModal = () => {
    const { deckId, cardId } = useLocalSearchParams<Params>();
    const { inputRef } = useAutoFocusInput();

    const isEditMode = cardId !== undefined;

    const addState = useAddCardState(deckId!);
    const editState = useEditCardState({
        deckId: deckId!,
        cardId: cardId ?? '',
    });

    const { cardState, save } = isEditMode ? editState : addState;
    const { onSave } = useSaveModal(async () => {
        await Promise.resolve(save());
        return true;
    });

    useCustomHeader({
        title: isEditMode ? 'Edit Card' : 'Add New Card',
        headerTransparent: false,
        rightButton: {
            label: 'Done',
            onPress: onSave,
        },
    });

    return (
        <KeyboardScreenContainer>
            <CardInputs
                inputRef={inputRef}
                cardState={cardState}
            />
        </KeyboardScreenContainer>
    );
};

export default CardModal;