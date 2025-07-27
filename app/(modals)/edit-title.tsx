import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useEditTitleState } from "@/hooks/useEditTitleState";
import useCustomHeader from "@/hooks/useCustomHeader";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import DeckTitleInput from "@/ui/DeckTitleInput";
import AddTitleView from "@/ui/layout/AddTitleView";

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
        <AddTitleView withHeaderPadding>
            <DeckTitleInput
                inputRef={inputRef}
                title={title}
                placeholder='Edit deck title'
                onChangeText={setTitle}
            />
        </AddTitleView>
    );
};

export default EditTitle;