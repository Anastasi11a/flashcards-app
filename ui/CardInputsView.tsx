import { View, TextInput } from "react-native";
import styled from "styled-components/native";

import InputField from "@/components/InputField";
import QuestionInput from "./QuestionInput";
import AnswerInput from "./AnswerInput";

export interface CardInputsViewProps {
    inputRef?: React.Ref<TextInput>;
    question: string;
    answer: string;
    onChangeQuestion: (text: string) => void;
    onChangeAnswer: (text: string) => void;
}

const CardInputsView = ({ 
    inputRef, question, answer, onChangeQuestion, onChangeAnswer
}: CardInputsViewProps) => {
    return (
        <InputWrapper>
            <InputField
                inputRef={inputRef}
                value={question}
                placeholder='Type a question or something else'
                InputComponent={QuestionInput}
                maxLengthHint={75}
                onChangeText={onChangeQuestion}
            />
            <Divider />
            <InputField
                value={answer}
                placeholder='Type a description or something else'
                InputComponent={AnswerInput}
                onChangeText={onChangeAnswer}
            />
        </InputWrapper>
    );
};

export default CardInputsView;

const InputWrapper = styled(View)`
    border-radius: 16px;
    background-color: #25292e;
`;

const Divider = styled(View)`
    width: 92%;
    height: 1px;
    align-self: center;
    background-color: #1a1c20;
`;