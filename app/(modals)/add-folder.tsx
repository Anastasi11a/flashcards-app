import { useDecks } from "@/context/DeckContext";
import AddTitle from "@/components/screens/AddTitle";
import useCustomHeader from "@/hooks/useCustomHeader";
import { useSubmitDraftTitle } from "@/hooks/useSubmitDraftTitle";

const CreateFolder = () => {
    const { draftTitle } = useDecks();
    const { submit } = useSubmitDraftTitle();

    useCustomHeader({
        title: 'Folder Title',
        rightButton: {
            label: 'Next',
            onPress: () => submit('folder'),
        },
    });

    return (
        <AddTitle 
            title={draftTitle.value} 
            setTitle={draftTitle.set} 
        />
    );
};

export default CreateFolder;