import { useEffect } from "react";

import { useDecks } from "@/context/DeckContext";
import AddCardButton from "../AddCardButton";
import DeckList from "../DecksList";
import EditCardModal from "../EditCardModal";
import CardInputs from "../CardInputs";
import { useCardModalManager } from "@/hooks/useCardModalManager";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import StyledKeyboardAvoidingView from "@/ui/StyledKeyboardAvoidingView";
import { StyledEAddScreenView } from "@/ui/CardInputFields";

interface AddCardsScreenProps {
    deckId: string;
}

const AddCardsScreen = ({ deckId }: AddCardsScreenProps) => {
    const { inputRef, focusInput } = useKeyboardVisibility();
    const { decks, addCard, editCard, deleteCard, deleteDeck } = useDecks();

    const deck = decks.find((d) => d.id === deckId);
    const cards = deck?.cards || [];

    const { 
        question, answer, setQuestion, setAnswer,
        isModalVisible, isEditing,
        startAdding, startEditing, save, reset,
    } = useCardModalManager({
        deckId, 
        initialCards: cards,
        onAdd: addCard,
        onEdit: editCard,
        focusInput,
    });

    const handleDeleteCard = async (cardId: string) => {
        await deleteCard(deckId, cardId);
    };

    useEffect(() => {
        return () => {
            const deckStillExists = decks.find((d) => d.id === deckId);
            if (deckStillExists && deckStillExists.cards.length === 0) {
                deleteDeck(deckId);
            }
        };
    }, [deckId, decks, deleteDeck]);

    return (
        <StyledKeyboardAvoidingView>
            <StyledEAddScreenView> 
                <CardInputs
                    inputRef={inputRef}
                    question={question}
                    answer={answer}
                    onChangeQuestion={setQuestion}
                    onChangeAnswer={setAnswer}
                />
                <AddCardButton label='Add Card' onPress={save} />
            </StyledEAddScreenView>
            
            <DeckList 
                deckId={deckId} 
                cards={cards} 
                onDelete={(_, cardId) => handleDeleteCard(cardId)}
                onEdit={(_, id) => startEditing(id)}
            />

            <EditCardModal
                visible={isModalVisible}
                question={question}
                answer={answer}
                onChangeQuestion={setQuestion}
                onChangeAnswer={setAnswer}
                onSave={save}
                onClose={reset}
            />
        </StyledKeyboardAvoidingView>
    );
};

export default AddCardsScreen;