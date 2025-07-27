import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import DeckTitleInput from "@/ui/DeckTitleInput";
import AddTitleView from "@/ui/layout/AddTitleView";

interface AddDeckTitleProps {
    title: string;
    setTitle: (title: string) => void;
}

const AddDeckTitle = ({ title, setTitle }: AddDeckTitleProps) => {
    const { inputRef } = useKeyboardVisibility();

    return (
        <AddTitleView>
            <DeckTitleInput
                inputRef={inputRef}
                title={title}
                placeholder='Enter deck title'
                onChangeText={setTitle}
            />
        </AddTitleView>
    );
};

export default AddDeckTitle;