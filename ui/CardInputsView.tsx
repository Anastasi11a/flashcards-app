import { View } from "react-native";
import type { TextInput } from "react-native";
import styled from "styled-components/native";

import InputField from "@/components/InputField";
import GradientContainer from "./container/GradientContainer";
import Input from "./input/Input";

export interface CardInputsProps {
    inputRef: React.Ref<TextInput>;
    cardState: {
        question: string;
        answer: string;
        setQuestion: (text: string) => void;
        setAnswer: (text: string) => void;
    };
}

const CardInputsView = ({ inputRef, cardState }: CardInputsProps) => {
    const { question, answer, setQuestion, setAnswer } = cardState;

    return (
        <GradientContainer>
            <InputField
                inputRef={inputRef}
                value={question}
                variant='question'
                placeholder='Type a question or something else'
                InputComponent={Input}
                maxLengthHint={75}
                onChangeText={setQuestion}
            />
            <Divider />
            <InputField
                value={answer}
                variant='answer'
                placeholder='Type a description or something else'
                InputComponent={Input}
                onChangeText={setAnswer}
            />
        </GradientContainer>
    );
};

export default CardInputsView;

const Divider = styled(View)`
    width: 92%;
    height: 1px;
    align-self: center;
    background-color: #1a1c20;
`;