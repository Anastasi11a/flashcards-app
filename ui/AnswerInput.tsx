import { TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";

const AnswerInput = (props: TextInputProps) => {
    return <StyledInput {...props} />;
};

export default AnswerInput;

const StyledInput = styled(TextInput).attrs({
    placeholderTextColor: '#808080',
    selectionColor: '#aaa',
})`
    padding: 12px 16px;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.4px;
    text-align-vertical: top;
    color: #e6e6e6;
`;