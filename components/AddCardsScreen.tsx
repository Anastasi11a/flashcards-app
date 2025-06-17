import { View, TextInput } from "react-native";
import styled from "styled-components";

import { Card } from "@/data/decks";
import AddCardButton from "./AddCardButton";
import DeckList from "./DecksList";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import StyledKeyboardAvoidingView from "@/ui/StyledKeyboardAvoidingView";

interface AddCardsScreenProps {
    deckId?: string;
    cards: Card[];
    question: string;
    answer: string;
    setQuestion: (value: string) => void;
    setAnswer: (value: string) => void;
    onAddCard: () => void;
    onDeleteCard: (cardId: string) => void;
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
            </StyledView>
            
            <DeckList 
                deckId={props.deckId} 
                cards={props.cards} 
                onDelete={props.onDeleteCard} 
            />
        </StyledKeyboardAvoidingView>
    );
};

export default AddCardsScreen;

const StyledView = styled(View)`
    padding: 20px 10px 10px;
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