import { forwardRef } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import styled from "styled-components/native";

import ClearButton from "../buttons/ClearButton";
import { inputText } from "@/constants/text/textStyles";

type Variant = 'question' | 'answer';

interface Props extends TextInputProps {
    value: string;
    variant?: Variant;
    onChangeText: (text: string) => void;
}

const InputField = forwardRef<TextInput, Props>(
    ({ value, variant = 'answer', placeholder, onChangeText, ...props }, ref) => {
        return (
            <InputContainer>
                <StyledInput
                    ref={ref}
                    $variant={variant}
                    value={value}
                    placeholder={placeholder}
                    multiline
                    onChangeText={onChangeText}
                    {...props}
                />

                {value.length > 0 && (
                    <ClearButton onPress={() => onChangeText('')} />
                )}
            </InputContainer>
        );
    }
);

export default InputField;

const InputContainer = styled(View)`
    position: relative;
    width: 100%;
`;

const StyledInput = styled(TextInput).attrs({
    placeholderTextColor: '#808080',
    selectionColor: '#aaa',
    textAlignVertical: 'top',
})<{ $variant: Variant }>`
    ${inputText}
    font-weight: ${({ $variant }) => $variant === 'question' ? '700' : '500'};
    color: ${({ $variant }) => $variant === 'question' ? '#4da6ffea' : '#e6e6e6'};
`;