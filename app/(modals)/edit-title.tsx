import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import TitleContainer from "@/components/TitleContainer";
import useCustomHeader from "@/hooks/useCustomHeader";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import { useEditTitleState } from "@/hooks/useEditTitleState";
import DeckTitleInput from "@/ui/DeckTitleInput";

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
        <TitleContainer withHeaderPadding>
            <DeckTitleInput
                inputRef={inputRef}
                title={title}
                placeholder='Edit deck title'
                onChangeText={setTitle}
            />
        </TitleContainer>
    );
};

export default EditTitle;