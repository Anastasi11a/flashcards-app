import { useLocalSearchParams } from "expo-router";

import useCustomHeader from "@/hooks/useCustomHeader";
import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import { useAddCardState } from "@/hooks/useAddCardState";
import { useEditCardState } from "@/hooks/useEditCardState";
import { useSaveModal } from "@/hooks/useSaveModal";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import CardInputsView from "@/ui/CardInputsView";

type Params = {
    deckId: string;
    cardId?: string;
};

const CardModal = () => {
    const { deckId, cardId } = useLocalSearchParams<Params>();
    const { inputRef, focusInput } = useAutoFocusInput();

    const addState = useAddCardState({ deckId, focusInput });
    const editState = useEditCardState({ deckId, cardId: cardId || '' });

    const isEditMode = Boolean(cardId);
    const { question, answer, setQuestion, setAnswer, save } = isEditMode
        ? editState
        : addState;

    const { onSave } = useSaveModal(save);

    useCustomHeader({
        title: isEditMode ? 'Edit Card' : 'Add New Card',
        headerTransparent: false,
        rightButton: {
            label: 'Save',
            onPress: onSave,
        },
    });

    return (
        <ScreenContainer>
            <CardInputsView
                inputRef={inputRef}
                question={question}
                answer={answer}
                onChangeQuestion={setQuestion}
                onChangeAnswer={setAnswer}
            />
        </ScreenContainer>
    );
};

export default CardModal;