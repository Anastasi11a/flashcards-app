import { View } from "react-native";
import styled from "styled-components";

import { Card } from "@/data/decks";
import AddCardButton from "../AddCardButton";
import DeckList from "../DecksList";
import EditCardModal from "@/ui/EditCardModal";
import useCardEditor from "@/hooks/useCardEditor";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import StyledKeyboardAvoidingView from "@/ui/StyledKeyboardAvoidingView";
import { InputWrapper, AnswerInput, QuestionInput, Divider } from "@/ui/CardInputFields";

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