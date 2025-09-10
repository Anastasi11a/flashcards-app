import { useDecks } from "@/context/DeckContext";
import AddTitle from "@/components/screens/AddTitle";
import useCustomHeader from "@/hooks/useCustomHeader";
import { useSubmitDraftTitle } from "@/hooks/useSubmitDraftTitle";

const AddDeckTitleScreen = () => {
    const { draftTitle } = useDecks();
    const { submit } = useSubmitDraftTitle();

    useCustomHeader({
        title: 'Deck Title',
        rightButton: {
            label: 'Next',
            onPress: () => submit('deck'),
        },
    });

    return (
        <AddTitle 
            title={draftTitle.value} 
            setTitle={draftTitle.set} 
        />
    );
};

export default AddDeckTitleScreen;