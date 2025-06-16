import { View, Text, TextInput, FlatList } from "react-native";
import styled from "styled-components";

import { Card } from "@/data/decks";
import AddCardButton from "./AddCardButton";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import StyledKeyboardAvoidingView from "@/ui/StyledKeyboardAvoidingView";

interface AddCardsScreenProps {
    question: string;
    answer: string;
    setQuestion: (value: string) => void;
    setAnswer: (value: string) => void;
    onAddCard: () => void;
    cards: Card[];
}

const AddCardsScreen = (props: AddCardsScreenProps) => {
    const { inputRef, focusInput } = useKeyboardVisibility();

    const handleAddCard = () => {
        props.onAddCard();
        focusInput();
    };

    return (
        <StyledKeyboardAvoidingView>
            <StyledView>         
                <InputWrapper>
                    <QuestionInput
                        ref={inputRef}
                        value={props.question}
                        placeholder="Question"
                        onChangeText={props.setQuestion}
                    />
                    <Divider />
                    <AnswerInput
                        value={props.answer}
                        placeholder="Answer"
                        onChangeText={props.setAnswer}
                    />
                </InputWrapper>

                <AddCardButton label='Add Card' onPress={handleAddCard} />

                <FlatList
                    data={props.cards}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item, index }) => (
                        <CardPreview>
                            <CardText>{index + 1}. Q: {item.question}</CardText>
                            <CardText>A: {item.answer}</CardText>
                        </CardPreview>
                    )}
                />
            </StyledView>
        </StyledKeyboardAvoidingView>
    );
};

export default AddCardsScreen;

const StyledView = styled(View)`
    flex: 1;
    padding: 16px 10px;
    background-color: #1a1c20;
`;

const InputWrapper = styled(View)`
    border-radius: 16px;
    background-color: #25292e;
`;

const StyledInput = styled(TextInput).attrs({
    placeholderTextColor: '#808080',
    selectionColor: '#aaa',
})`
    padding: 12px 16px;
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
    background-color: #1a1c20;
`;

const CardPreview = styled(View)`
    background-color: #25292e;
    padding: 12px;
    border-radius: 12px;
    margin-top: 10px;
`;

const CardText = styled(Text)`
    color: #ccc;
    font-size: 16px;
    margin-bottom: 4px;
`;