import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import DeckTitleInput from "@/ui/DeckTitleInput";
import { StyledView } from "@/ui/CardInputFields";

interface AddDeckTitleProps {
    title: string;
    setTitle: (title: string) => void;
}

const AddDeckTitle = ({ title, setTitle }: AddDeckTitleProps) => {
    const { inputRef } = useKeyboardVisibility();

    return (
        <StyledView>
            <DeckTitleInput
                inputRef={inputRef}
                title={title}
                placeholder='Enter deck title'
                onChangeText={setTitle}
            />
        </StyledView>
    );
};

export default AddDeckTitle;