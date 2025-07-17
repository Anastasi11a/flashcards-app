import { TextInput, TextInputProps } from "react-native";

import ClearButton from "./ClearButton";
import QuestionInput from "@/ui/QuestionInput";
import { InputContainer, HintText, StyledClearButton } from "@/ui/CardInputFields";

interface InputFieldProps {
    text: string;
    placeholder?: string;
    maxLengthHint?: number;
    onChangeText: (text: string) => void;
    InputComponent: React.ComponentType<TextInputProps>;
    inputRef?: React.Ref<TextInput>;
}

const InputField = ({ 
    text, placeholder, maxLengthHint, onChangeText, InputComponent, inputRef
}: InputFieldProps) => {
    const isQuestionInput = InputComponent === QuestionInput;

    return (
        <InputContainer>
            <InputComponent
                {...(isQuestionInput && inputRef ? { ref: inputRef } : {})}
                value={text}
                placeholder={placeholder}
                multiline
                onChangeText={onChangeText}
            />

            {text.length > 0 && (
                <StyledClearButton>
                    <ClearButton onPress={() => onChangeText('')} />
                </StyledClearButton>
            )}
            
            {!!maxLengthHint && text.length >= maxLengthHint && (
                <HintText>
                    {text.length} characters - recommend to keep max {maxLengthHint}
                </HintText>
            )}
        </InputContainer>
    );
};

export default InputField;