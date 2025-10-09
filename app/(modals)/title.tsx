import { useState } from "react";
import { useLocalSearchParams } from "expo-router";

import AddTitle from "@/components/pages/AddTitle";
import useCustomHeader from "@/hooks/useCustomHeader";
import { useEditTitleState } from "@/hooks/useEditTitleState";
import { useSubmitDraftTitle } from "@/hooks/useSubmitDraftTitle";
import { useSaveModal } from "@/hooks/useSaveModal";
import { TitleParams } from "@/utils/navigation/navigation";

const TitleModal = () => {
    const [draftTitle, setDraftTitle] = useState('');

    const { deckId, mode } = useLocalSearchParams<TitleParams>();
    const isEdit = mode === 'edit';
    const isFolder = mode === 'create-folder';

    const editState = useEditTitleState({ deckId });
    const { submit } = useSubmitDraftTitle();
    const { onSave } = useSaveModal(editState.save);

    const handleSave = async () => {
        if (isEdit) {
            await onSave();
        } else if (isFolder) {
            const success = await submit('folder', draftTitle);
            if (success) setDraftTitle('');
        } else {
            const success = await submit('deck', draftTitle);
            if (success) setDraftTitle('');
        }
    };

    useCustomHeader({
        title: isEdit 
            ? 'Edit Title'
            : isFolder
            ? 'Folder Title' 
            : 'Deck Title',
        rightButton: {
            label: isEdit ? 'Done' : 'Next',
            onPress: handleSave,
        },
    });

    return (
        <AddTitle
            mode={mode}
            editState={editState}
            draftTitle={draftTitle}
            setDraftTitle={setDraftTitle}
        />
    );
};

export default TitleModal;