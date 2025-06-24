import React, { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

import ClearButton from "./ClearButton";
import { InputContainer, HintText, StyledClearButton, QuestionInput } from "@/ui/CardInputFields";

interface InputFieldProps {
    text: string;
    placeholder?: string;
    maxLengthHint?: number;
    onChangeText: (text: string) => void;
    InputComponent: React.ComponentType<TextInputProps>;
}

const InputField = forwardRef<TextInput, InputFieldProps>((props, ref) => {
    const isQuestionInput  = props.InputComponent === QuestionInput;

    return (
        <InputContainer>
            <props.InputComponent
                {...(isQuestionInput ? { ref } : {})}
                value={props.text}
                placeholder={props.placeholder}
                multiline
                onChangeText={props.onChangeText}
            />

            {props.text.length > 0 && (
                <StyledClearButton>
                    <ClearButton onPress={() => props.onChangeText('')} />
                </StyledClearButton>
            )}
            
            {!!props.maxLengthHint && props.text.length >= props.maxLengthHint && (
                <HintText>
                    {props.text.length} characters - recommend to keep max {props.maxLengthHint}
                </HintText>
            )}
        </InputContainer>
    );
});

export default InputField;