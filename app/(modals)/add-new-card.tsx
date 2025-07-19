import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import CardInputs from "@/components/CardInputs";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import useCustomHeader from "@/hooks/useCustomHeader";
import { useAddCardState } from "@/hooks/useAddCardState";
import { StyledEAddScreenView } from "@/ui/CardInputFields";
import StyledKeyboardAvoidingView from "@/ui/StyledKeyboardAvoidingView";

const AddNewCard = () => {
    const { deckId } = useLocalSearchParams<{ deckId: string }>();
    if (!deckId) return null;

    const router = useRouter();
    const { inputRef, focusInput } = useKeyboardVisibility();

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
        <StyledKeyboardAvoidingView>
            <StyledEAddScreenView>
                <CardInputs
                    inputRef={inputRef}
                    question={question}
                    answer={answer}
                    onChangeQuestion={setQuestion}
                    onChangeAnswer={setAnswer}
                />
            </StyledEAddScreenView>
        </StyledKeyboardAvoidingView>
    );
};

export default AddNewCard;