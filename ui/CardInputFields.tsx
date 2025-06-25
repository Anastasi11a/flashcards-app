import { View, Text, TextInput } from "react-native";
import styled from "styled-components/native";

export const StyledInput = styled(TextInput).attrs({
    placeholderTextColor: '#808080',
    selectionColor: '#aaa',
})`
    padding: 12px 16px;
    line-height: 22px;
    letter-spacing: 0.4px;
    text-align-vertical: top;
`; 

export const QuestionInput = styled(StyledInput)`
    font-size: 18px;
    font-weight: bold;
    color: #0a7ea4;
`;

export const AnswerInput = styled(StyledInput)`
    font-size: 16px;
    color: #e6e6e6;
`;

export const InputWrapper = styled(View)`
    border-radius: 16px;
    background-color: #25292e;
`;

export const StyledInputWrapper = styled(InputWrapper)`
    margin-top: 30px;
`;

export const Divider = styled(View)`
    width: 92%;
    height: 1px;
    align-self: center;
    background-color: #1a1c20;
`;

export const HintText = styled(Text)`
    margin: 4px 16px;
    font-size: 12px;
    font-style: italic;
    color: #aaaaaa;
`;

export const HintCounter = styled(Text)`
    align-self: flex-end;
    padding-top: 4px;
    margin-bottom: -12px;
    margin-right: 16px;
    font-size: 12px;
    font-style: italic;
    color: #aaaaaa;
`;

export const InputContainer = styled(View)`
    position: relative;
    padding-right: 20px;
`;

export const StyledClearButton = styled(View)`
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-10px);
`;