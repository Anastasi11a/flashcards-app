import TitleContainer from "../TitleContainer";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import DeckTitleInput from "@/ui/DeckTitleInput";

interface AddDeckTitleProps {
    title: string;
    setTitle: (title: string) => void;
}

const AddDeckTitle = ({ title, setTitle }: AddDeckTitleProps) => {
    const { inputRef } = useKeyboardVisibility();

    return (
        <TitleContainer>
            <DeckTitleInput
                inputRef={inputRef}
                title={title}
                placeholder='Enter deck title'
                onChangeText={setTitle}
            />
        </TitleContainer>
    );
};

export default AddDeckTitle;