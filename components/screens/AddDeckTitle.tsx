import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import DeckTitleInput from "@/ui/DeckTitleInput";
import ScreenContainer from "@/ui/layout/ScreenContainer";

interface AddDeckTitleProps {
    title: string;
    setTitle: (title: string) => void;
}

const AddDeckTitle = ({ title, setTitle }: AddDeckTitleProps) => {
    const { inputRef } = useKeyboardVisibility();

    return (
        <ScreenContainer>
            <DeckTitleInput
                inputRef={inputRef}
                title={title}
                placeholder='Enter deck title'
                onChangeText={setTitle}
            />
        </ScreenContainer>
    );
};

export default AddDeckTitle;