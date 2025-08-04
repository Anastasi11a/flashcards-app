import InputField from "../InputField";
import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import DeckTitleContainer from "@/ui/layout/DeckTitleContainer";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import QuestionInput from "@/ui/QuestionInput";

interface AddDeckTitleProps {
    title: string;
    setTitle: (title: string) => void;
}

const AddDeckTitle = ({ title, setTitle }: AddDeckTitleProps) => {
    const { inputRef } = useAutoFocusInput();

    return (
        <ScreenContainer>
            <DeckTitleContainer>
                <InputField
                    inputRef={inputRef}
                    value={title}
                    maxLengthHint={35}
                    InputComponent={QuestionInput}
                    onChangeText={setTitle}
                />
            </DeckTitleContainer>
        </ScreenContainer>
    );
};

export default AddDeckTitle;