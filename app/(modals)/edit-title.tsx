import { useLocalSearchParams, useRouter } from "expo-router";

import InputField from "@/components/InputField";
import { useEditTitleState } from "@/hooks/useEditTitleState";
import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import useCustomHeader from "@/hooks/useCustomHeader";
import QuestionInput from "@/ui/QuestionInput";
import DeckTitleContainer from "@/ui/layout/DeckTitleContainer";
import ScreenContainer from "@/ui/layout/ScreenContainer";

const EditTitle = () => {
    const { deckId } = useLocalSearchParams<{ deckId: string }>();
    const router = useRouter();

    const { inputRef } = useAutoFocusInput();
    const { title, setTitle, save } = useEditTitleState({ deckId });

    useCustomHeader({  
        title: 'Edit Title',
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
           <DeckTitleContainer>
                <InputField
                    inputRef={inputRef}
                    value={title}
                    maxLengthHint={35}
                    InputComponent={QuestionInput}
                    onChangeText={setTitle}
                />
           </DeckTitleContainer>
        </ScreenContainer>
    );
};

export default EditTitle;