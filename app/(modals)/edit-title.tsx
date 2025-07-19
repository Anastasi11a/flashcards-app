import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

import InputField from "@/components/InputField";
import useCustomHeader from "@/hooks/useCustomHeader";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import { useEditTitleState } from "@/hooks/useEditTitleState";
import QuestionInput from "@/ui/QuestionInput";
import { StyledEAddScreenView, InputWrapper } from "@/ui/CardInputFields";
import StyledKeyboardAvoidingView from "@/ui/StyledKeyboardAvoidingView";

const EditTitle = () => {
    const headerHeight = useHeaderHeight();
    const router = useRouter();
    const { inputRef, focusInput } = useKeyboardVisibility();
    
    const { deckId } = useLocalSearchParams<{ deckId?: string }>();
    if (!deckId) return null;

    const { title, setTitle, save } = useEditTitleState({ deckId });

    const handleSave = () => {
        save();
        router.back();
    };

    useCustomHeader({
        title: 'Edit Title',
        headerTransparent: true,
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
            <StyledEAddScreenView style={{ paddingTop: headerHeight }}>
                <InputWrapper>
                    <InputField
                        inputRef={inputRef}
                        text={title}
                        placeholder='Edit deck title'
                        onChangeText={setTitle}
                        InputComponent={QuestionInput}
                        maxLengthHint={35}
                    />
                </InputWrapper>
            </StyledEAddScreenView>
        </StyledKeyboardAvoidingView>
    );
};

export default EditTitle;