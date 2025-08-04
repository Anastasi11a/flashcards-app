import { useLocalSearchParams, useRouter } from "expo-router";

import { useAddCardState } from "@/hooks/useAddCardState";
import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import useCustomHeader from "@/hooks/useCustomHeader";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import CardInputsView from "@/ui/CardInputsView";

const AddNewCard = () => {
    const { deckId } = useLocalSearchParams<{ deckId: string }>();
    const router = useRouter();
    
    const { inputRef, focusInput } = useAutoFocusInput();

    const {
        question, answer, 
        setQuestion, setAnswer, 
        save
    } = useAddCardState({ deckId, focusInput });
 
    useCustomHeader({
        title: 'Add New Card',
        headerTransparent: false,
        rightButton: {
            label: 'Save',
            onPress: () => {
                save();
                router.back();
            },
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

export default AddNewCard;