import { useLocalSearchParams, useRouter } from "expo-router";

import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import useCustomHeader from "@/hooks/useCustomHeader";
import { useEditCardState } from "@/hooks/useEditCardState";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import CardInputsView from "@/ui/CardInputsView";

const EditCard = () => {
    const { deckId, cardId } = useLocalSearchParams<{ 
        deckId: string; 
        cardId: string 
    }>();

    const router = useRouter();
    const { inputRef } = useAutoFocusInput();

    const {
        question, answer,
        setQuestion, setAnswer,
        save
    } = useEditCardState({ deckId, cardId });

    useCustomHeader({
        title: 'Edit Card',
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

export default EditCard;