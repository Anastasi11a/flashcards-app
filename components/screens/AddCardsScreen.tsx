import { useState } from "react";
import uuid from "uuid-random";

import { useDecks } from "@/context/DeckContext";
import { Card } from "@/data/decks";
import useCardEditor from "@/hooks/useCardEditor";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import AddCardButton from "../AddCardButton";
import DeckList from "../DecksList";
import InputField from "../InputField";
import EditCardModal from "@/components/EditCardModal";
import StyledKeyboardAvoidingView from "@/ui/StyledKeyboardAvoidingView";
import { 
    StyledEAddScreenView, 
    AnswerInput, 
    Divider, 
    InputWrapper, 
    QuestionInput 
} from "@/ui/CardInputFields";

interface AddCardsScreenProps {
    deckId: string;
}

const AddCardsScreen = ({ deckId }: AddCardsScreenProps) => {
    const { inputRef, focusInput } = useKeyboardVisibility();
    const { decks, addCard, editCard, deleteCard } = useDecks();

    const deck = decks.find((d) => d.id === deckId);
    const cards = deck?.cards || [];

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const {
        editingCardId, editQuestion, editAnswer, 
        setEditQuestion, setEditAnswer, startEditing, saveEdit, resetEditor,
    } = useCardEditor({
        initialCards: cards,
        onUpdateCards: async (updatedCards) => {
            const updated = updatedCards.find((c) => c.id === editingCardId);
            if (updated) {
                await editCard(deckId, updated.id, updated.question, updated.answer);
            }
        },
    });

    const handleAddCard = async () => {
        const trimmedQuestion = question.trim();
        const trimmedAnswer = answer.trim();
        if (!trimmedQuestion || !trimmedAnswer) return;

        const newCard: Card = {
            id: uuid(),
            question: trimmedQuestion,
            answer: trimmedAnswer,
        };

        await addCard(deckId, newCard);
        setQuestion('');
        setAnswer('');
        focusInput();
    };

    const handleDeleteCard = async (cardId: string) => {
        await deleteCard(deckId, cardId);
    };

    return (
        <StyledKeyboardAvoidingView>
            <StyledEAddScreenView>         
                <InputWrapper>
                    <InputField
                        ref={inputRef}
                        text={question}
                        InputComponent={QuestionInput}
                        placeholder='Type a question or something else'
                        maxLengthHint={75}
                        onChangeText={setQuestion}
                    />
                    <Divider />
                    <InputField
                        text={answer}
                        InputComponent={AnswerInput}
                        placeholder='Type a description or something else'
                        onChangeText={setAnswer}
                    />
                </InputWrapper>
                <AddCardButton label='Add Card' onPress={handleAddCard} />
            </StyledEAddScreenView>
            
            <DeckList 
                deckId={deckId} 
                cards={cards} 
                onDelete={(_, cardId) => handleDeleteCard(cardId)}
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