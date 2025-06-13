import { View, Text, TextInput, Button } from "react-native";
import styled from "styled-components";

import AddCardButton from "./AddCardButton";

interface AddCardsScreenProps {
    question: string;
    answer: string;
    setQuestion: (value: string) => void;
    setAnswer: (value: string) => void;
    onAddCard: () => void;
}

const AddCardsScreen = (props: AddCardsScreenProps) => {
    return (
        <StyledView>
            <InputWrapper>
                <QuestionInput
                    placeholder="Question"
                    value={props.question}
                    onChangeText={props.setQuestion}
                />
                <Divider />
                <AnswerInput
                    placeholder="Answer"
                    value={props.answer}
                    onChangeText={props.setAnswer}
                />
            </InputWrapper>

            <AddCardButton label='Add Card' onPress={props.onAddCard} />
        </StyledView>
    );
};

export default AddCardsScreen;

const StyledView = styled(View)`
    flex: 1;
    padding: 16px 10px;
    background-color: #25292e;
`;

const InputWrapper = styled(View)`
    border-radius: 16px;
    background-color: #1a1c20;
`;

const StyledInput = styled(TextInput).attrs({
    placeholderTextColor: '#808080',
    selectionColor: '#aaa',
})`
    padding: 16px;
    font-weight: bold;
`;

const QuestionInput = styled(StyledInput)`
    font-size: 18px;
    color: #0a7ea4;
`;

const AnswerInput = styled(StyledInput)`
    font-size: 16px;
    color: #e6e6e6;
`;

const Divider = styled(View)`
    width: 92%;
    height: 1px;
    margin: 2px 0;
    align-self: center;
    background-color: #25292e;
`;