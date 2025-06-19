import { View, TextInput } from "react-native";
import styled from "styled-components/native";

export const StyledInput = styled(TextInput).attrs({
    placeholderTextColor: '#808080',
    selectionColor: '#aaa',
})`
    padding: 12px 16px;
    font-weight: bold;
`; 

export const InputWrapper = styled(View)`
    border-radius: 16px;
    background-color: #25292e;
`;

export const QuestionInput = styled(StyledInput)`
    font-size: 18px;
    color: #0a7ea4;
`;

export const AnswerInput = styled(StyledInput)`
    font-size: 16px;
    color: #e6e6e6;
`;

export const Divider = styled(View)`
    width: 92%;
    height: 1px;
    margin: 2px 0;
    align-self: center;
    background-color: #1a1c20;
`;