import { View } from "react-native";
import styled from "styled-components";

import EditCardModal from "@/components/EditCardModal";
import { Card } from "@/data/decks";
import useCardEditor from "@/hooks/useCardEditor";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import { AnswerInput, Divider, InputWrapper, QuestionInput } from "@/ui/CardInputFields";
import StyledKeyboardAvoidingView from "@/ui/StyledKeyboardAvoidingView";
import AddCardButton from "../AddCardButton";
import DeckList from "../DecksList";
import InputField from "../InputField";

interface AddCardsScreenProps {
    deckId?: string;
    cards: Card[];
    question: string;
    answer: string;
    setQuestion: (value: string) => void;
    setAnswer: (value: string) => void;
    onAddCard: () => void;
    onDeleteCard: (cardId: string) => void;
    onEditCard: (cardId: string, newQuestion: string, newAnswer: string) => void;
    onTextChange?: (value: string) => void;
}

const AddCardsScreen = (props: AddCardsScreenProps) => {
    const { inputRef, focusInput } = useKeyboardVisibility();
    const { 
        editingCardId, editQuestion, editAnswer, setEditQuestion, setEditAnswer, startEditing, saveEdit, resetEditor
    } = useCardEditor(
        {
            initialCards: props.cards,
            onUpdateCards: (updatedCards) => {
                const updatedCard = updatedCards.find(card => card.id === editingCardId);
                if (updatedCard) {
                    props.onEditCard(updatedCard.id, updatedCard.question, updatedCard.answer);
                }
            },
        }
    );

    const handleAddCard = () => {
        props.onAddCard();
        focusInput();
    };

    return (
        <StyledKeyboardAvoidingView>
            <StyledView>         
                <InputWrapper>
                    <InputField
                        ref={inputRef}
                        text={props.question}
                        InputComponent={QuestionInput}
                        placeholder='Type a question or something else'
                        maxLengthHint={75}
                        onChangeText={props.setQuestion}
                    />
                    <Divider />
                    <InputField
                        text={props.answer}
                        InputComponent={AnswerInput}
                        placeholder='Type a description or something else'
                        onChangeText={props.setAnswer}
                    />
                </InputWrapper>
                <AddCardButton label='Add Card' onPress={handleAddCard} />
            </StyledView>
            
            <DeckList 
                deckId={props.deckId} 
                cards={props.cards} 
                onDelete={(_, cardId) => props.onDeleteCard(cardId)}
                onEdit={(_, cardId) => startEditing(cardId)}
            />

            <EditCardModal
                visible={editingCardId !== null}
                question={editQuestion}
                answer={editAnswer}
                onChangeQuestion={setEditQuestion}
                onChangeAnswer={setEditAnswer}
                onSave={saveEdit}
                onClose={resetEditor}
            />
        </StyledKeyboardAvoidingView>
    );
};

export default AddCardsScreen;

const StyledView = styled(View)`
    padding: 20px 10px 10px;
    background-color: #1a1c20;
`;