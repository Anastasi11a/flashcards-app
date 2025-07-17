import InputField from "../InputField";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import QuestionInput from "@/ui/QuestionInput";
import { StyledView, InputWrapper } from "@/ui/CardInputFields";

interface AddDeckTitleProps {
    title: string;
    setTitle: (title: string) => void;
}

const AddDeckTitle = ({ title, setTitle }: AddDeckTitleProps) => {
    const { inputRef } = useKeyboardVisibility();

    return (
        <StyledView>
            <InputWrapper>
                <InputField
                    inputRef={inputRef}
                    text={title}
                    placeholder='Enter deck title'
                    maxLengthHint={35}
                    InputComponent={QuestionInput}
                    onChangeText={setTitle}
                />
            </InputWrapper>
        </StyledView>
    );
};

export default AddDeckTitle;