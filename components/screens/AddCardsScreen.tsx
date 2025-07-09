import { useState } from "react";
import uuid from "uuid-random";

import { useDecks } from "@/context/DeckContext";
import { Card } from "@/data/decks";
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

    const [editingCard, setEditingCard] = useState<Card | null>(null);
    const [editQuestion, setEditQuestion] = useState('');
    const [editAnswer, setEditAnswer] = useState('');

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

    const handleSaveEdit = async () => {
        if (!editingCard) return;

        const trimmedQ = editQuestion.trim();
        const trimmedA = editAnswer.trim();
        if (!trimmedQ || !trimmedA) return;

        await editCard(deckId, editingCard.id, trimmedQ, trimmedA);
        setEditingCard(null);
    };

    const handleEditCard = (cardId: string) => {
        const card = cards.find((c) => c.id === cardId);
        if (!card) return;

        setEditingCard(card);
        setEditQuestion(card.question);
        setEditAnswer(card.answer);
    };

    const handleCloseEdit = () => setEditingCard(null);

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
                onEdit={(_, cardId) => handleEditCard(cardId)}
            />

            <EditCardModal
                visible={editingCard !== null}
                question={editQuestion}
                answer={editAnswer}
                onChangeQuestion={setEditQuestion}
                onChangeAnswer={setEditAnswer}
                onSave={handleSaveEdit}
                onClose={handleCloseEdit}
            />
        </StyledKeyboardAvoidingView>
    );
};

export default AddCardsScreen;