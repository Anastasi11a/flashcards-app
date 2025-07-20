import { useEffect } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { useLocalSearchParams, useRouter } from "expo-router";

import useCustomHeader from "@/hooks/useCustomHeader";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import { useEditTitleState } from "@/hooks/useEditTitleState";
import { StyledEAddScreenView } from "@/ui/CardInputFields";
import DeckTitleInput from "@/ui/DeckTitleInput";
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
                <DeckTitleInput
                    inputRef={inputRef}
                    title={title}
                    placeholder='Edit deck title'
                    onChangeText={setTitle}
                />
            </StyledEAddScreenView>
        </StyledKeyboardAvoidingView>
    );
};

export default EditTitle;