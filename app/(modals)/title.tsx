import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import AddTitle from '@/components/pages/AddTitle';
import useCustomHeader from '@/hooks/useCustomHeader';
import { useEditTitleState } from '@/hooks/useEditTitleState';
import { useSubmitDraftTitle } from '@/hooks/useSubmitDraftTitle';
import { useSaveModal } from '@/hooks/useSaveModal';
import { TitleParams } from '@/utils/navigation/navigation';

const TitleModal = () => {
    const params = useLocalSearchParams<TitleParams>();
    const id = params?.id;
    const type = params?.type as TitleParams['type'] | undefined;
    const mode = params?.mode as TitleParams['mode'] | undefined;

    const isEdit = mode === 'edit';
    const isFolderCreate = mode === 'create-folder';
    const isDeckCreate = mode === 'create-deck';

    const [draftTitle, setDraftTitle] = useState('');

    const editState = useEditTitleState({ id, type });
    const { submit } = useSubmitDraftTitle();
    const { onSave } = useSaveModal(editState.save);

    const handleSave = async () => {
        if (isEdit) {
            await onSave();
            return;
        }
        if (isFolderCreate) {
            const success = await submit('folder', draftTitle);
            if (success) setDraftTitle('');
            return;
        }
        if (isDeckCreate) {
            const success = await submit('deck', draftTitle);
            if (success) setDraftTitle('');
            return;
        }

        const success = await submit('deck', draftTitle);
        if (success) setDraftTitle('');
    };

    useCustomHeader({
        title: isEdit 
            ? 'Edit Title' 
            : isFolderCreate 
            ? 'Folder Title' 
            : 'Deck Title',
        rightButton: {
            label: isEdit ? 'Done' : 'Next',
            onPress: handleSave,
        },
    });

    const addMode: TitleParams['mode'] = mode ?? 'create-deck';

    return (
        <AddTitle
            mode={addMode}
            editState={editState}
            draftTitle={draftTitle}
            setDraftTitle={setDraftTitle}
        />
    );
};

export default TitleModal;