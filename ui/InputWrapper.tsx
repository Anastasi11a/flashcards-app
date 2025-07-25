import { View, Text, TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";

import ClearButton from "./ClearButton";

export interface InputWrapperProps {
    inputRef?: React.Ref<TextInput>;
    value: string;
    placeholder?: string;
    maxLengthHint?: number;
    InputComponent: React.ComponentType<TextInputProps>;
    onChangeText: (text: string) => void;
}

const InputWrapper = ({
    inputRef, value, placeholder, maxLengthHint, InputComponent, onChangeText
}: InputWrapperProps) => {
    return (
        <InputContainer>
            <InputComponent
                {...(inputRef ? { ref: inputRef } : {})}
                value={value}
                placeholder={placeholder}
                multiline
                onChangeText={onChangeText}
            />

            {value.length > 0 && (
                <StyledClearButton>
                    <ClearButton onPress={() => onChangeText('')} />
                </StyledClearButton>
            )}

            {!!maxLengthHint && value.length >= maxLengthHint && (
                <HintText>
                    {value.length} characters - recommend to keep max {maxLengthHint}
                </HintText>
            )}
        </InputContainer>
    );
};

export default InputWrapper;

const InputContainer = styled(View)`
    position: relative;
    padding-right: 20px;
`;

const StyledClearButton = styled(View)`
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-10px);
`;

const HintText = styled(Text)`
    margin: 4px 16px;
    font-size: 12px;
    font-style: italic;
    color: #aaaaaa;
`;