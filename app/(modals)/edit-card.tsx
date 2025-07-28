import { useLocalSearchParams, useRouter } from "expo-router";

import CardInputs from "@/components/CardInputs";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import useCustomHeader from "@/hooks/useCustomHeader";
import { useEditCardState } from "@/hooks/useEditCardState";
import ScreenContainer from "@/ui/layout/ScreenContainer";

const EditCard = () => {
    const router = useRouter();
    const { inputRef, focusInput } = useKeyboardVisibility();

    const { deckId, cardId } = useLocalSearchParams<{ 
        deckId?: string; 
        cardId?: string 
    }>();
    
    if (!deckId || !cardId) return null;

    const { 
        question, answer, setQuestion, setAnswer, save
    } = useEditCardState({ deckId, cardId });

    const handleSave = () => {
        save();
        router.back();
    };

    useCustomHeader({
        title: 'Edit Card',
        headerTransparent: false,
        rightButton: {
            label: 'Save',
            onPress: handleSave,
        },
    });

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

export default EditCard;