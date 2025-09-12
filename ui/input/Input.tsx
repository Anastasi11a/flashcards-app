import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";

type Variant = 'question' | 'answer';

interface Props extends TextInputProps {
    variant?: Variant;
}

const Input = forwardRef<TextInput, Props>(({ variant = 'answer', ...props }, ref) => {
    return <StyledInput ref={ref} $variant={variant} {...props} />;
});

export default Input;

const StyledInput = styled(TextInput).attrs({
    placeholderTextColor: '#808080',
    selectionColor: '#aaa',
})<{ $variant: Variant }>`
    padding: 6px 10px;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.3px;
    text-align-vertical: top;

    font-weight: ${({ $variant }) => $variant === 'question' ? '700' : '500'};
    color: ${({ $variant }) => $variant === 'question' ? '#4da6ffea' : '#e6e6e6'};
`;