import AddDeckScreen from "@/components/AddDeckScreen";
import useCustomHeader from "@/hooks/useCustomHeader";

const AddDeck = () => {
    useCustomHeader({ title: 'Add New Deck' });

    return <AddDeckScreen />
};

export default AddDeck;