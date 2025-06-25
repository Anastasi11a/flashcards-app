import InputField from "../InputField";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import { StyledView, QuestionInput, InputWrapper } from "@/ui/CardInputFields";

interface AddDeckTitleProps {
    title: string;
    setTitle: (title: string) => void;
}

const AddDeckTitle = (props: AddDeckTitleProps) => {
    const { inputRef } = useKeyboardVisibility();

    return (
        <StyledView>
            <InputWrapper>
                <InputField
                    ref={inputRef}
                    text={props.title}
                    placeholder='Enter deck title'
                    maxLengthHint={35}
                    InputComponent={QuestionInput}
                    onChangeText={props.setTitle}
                />
            </InputWrapper>
        </StyledView>
    );
};

export default AddDeckTitle;