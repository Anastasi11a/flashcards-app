import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";

import CardInputs from "@/components/CardInputs";
import { useAddCardState } from "@/hooks/useAddCardState";
import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import useCustomHeader from "@/hooks/useCustomHeader";
import ScreenContainer from "@/ui/layout/ScreenContainer";

const AddNewCard = () => {
    const { deckId } = useLocalSearchParams<{ deckId: string }>();
    if (!deckId) return null;

    const router = useRouter();
    const { inputRef, focusInput } = useAutoFocusInput();

    const {
        question, answer, setQuestion, setAnswer, save
    } = useAddCardState({ deckId, focusInput });

    const handleSave = () => {
        save();
        router.back();
    };

    useCustomHeader({
        title: 'Add New Card',
        headerTransparent: false,
        rightButton: {
            label: 'Save',
            onPress: handleSave,
        },
    });

    useEffect(() => {
        focusInput();
    }, []);

    return (
        <ScreenContainer>
            <CardInputs
                inputRef={inputRef}
                question={question}
                answer={answer}
                onChangeQuestion={setQuestion}
                onChangeAnswer={setAnswer}
            />
        </ScreenContainer>
    );
};

export default AddNewCard;