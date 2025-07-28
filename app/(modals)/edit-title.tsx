import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";

import useCustomHeader from "@/hooks/useCustomHeader";
import { useEditTitleState } from "@/hooks/useEditTitleState";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import DeckTitleInput from "@/ui/DeckTitleInput";
import ScreenContainer from "@/ui/layout/ScreenContainer";

const EditTitle = () => {
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
        <ScreenContainer withHeaderPadding>
            <DeckTitleInput
                inputRef={inputRef}
                title={title}
                placeholder='Edit deck title'
                onChangeText={setTitle}
            />
        </ScreenContainer>
    );
};

export default EditTitle;