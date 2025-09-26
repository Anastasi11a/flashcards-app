import { useLocalSearchParams } from "expo-router";

import { useDecks } from "@/context/DeckContext";
import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import { useEditTitleState } from "@/hooks/useEditTitleState";
import { KeyboardScreenContainer } from "@/ui/container/ScreenContainer";
import TitleInput from "@/ui/input/TitleInput";
import { TitleParams } from "@/utils/navigation/navigation";

const AddTitle = () => {
    const { deckId, mode } = useLocalSearchParams<TitleParams>();
    const { inputRef } = useAutoFocusInput();
    const { draftTitle } = useDecks();
    const editState = useEditTitleState({ deckId });

    const title = mode === 'edit' ? editState.title : draftTitle.value;
    const setTitle = mode === 'edit' ? editState.setTitle : draftTitle.set;

    return (
        <KeyboardScreenContainer>
            <TitleInput 
                ref={inputRef}
                title={title}
                setTitle={setTitle}
            />
        </KeyboardScreenContainer>
    );
};

export default AddTitle;