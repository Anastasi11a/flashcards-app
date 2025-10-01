import type { TextInput } from "react-native";
import { View } from "react-native";
import styled from "styled-components/native";

import InputField from "./InputField";
import GradientContainer from "../container/GradientContainer";

export interface CardInputsProps {
    inputRef: React.Ref<TextInput>;
    cardState: {
        question: string;
        answer: string;
        setQuestion: (text: string) => void;
        setAnswer: (text: string) => void;
    };
}

const CardInputs = ({ inputRef, cardState }: CardInputsProps) => {
    const { question, answer, setQuestion, setAnswer } = cardState;

    return (
        <GradientContainer>
            <InputField
                ref={inputRef}
                value={question}
                variant='question'
                placeholder='Type a question or something else'
                onChangeText={setQuestion}
            />
            <Divider />
            <InputField
                value={answer}
                variant='answer'
                placeholder='Type a description or something else'
                onChangeText={setAnswer}
            />
        </GradientContainer>
    );
};

export default CardInputs;

const Divider = styled(View)`
    width: 92%;
    height: 1px;
    align-self: center;
    background-color: #1a1c20;
`;