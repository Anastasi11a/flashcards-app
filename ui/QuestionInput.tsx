import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";

const QuestionInput = forwardRef<TextInput, TextInputProps>((props, ref) => (
    <StyledInput
        ref={ref}
        style={{ 
            fontSize: 18, 
            fontWeight: "bold", 
            color: "#0a7ea4" 
        }}
        {...props}
    />
));

export default QuestionInput;

const StyledInput = styled(TextInput).attrs({
    placeholderTextColor: '#808080',
    selectionColor: '#aaa',
})`
    padding: 12px 16px;
    font-size: 18px;
    font-weight: bold;
    line-height: 22px;
    letter-spacing: 0.4px;
    text-align-vertical: top;
    color: #0a7ea4;
`; 