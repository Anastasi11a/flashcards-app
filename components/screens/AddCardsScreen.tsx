import { useDecks } from "@/context/DeckContext";
import AddCardForm from "../AddCardForm";
import { AddCardsList } from "../DecksList";
import { useAddCardState } from "@/hooks/useAddCardState";
import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import KeyboardAvoidingContainer from "@/ui/container/KeyboardAvoidingContainer";
import { navigateToEditCard } from "@/utils/cardNavigation";

const AddCardsScreen = () => {
    const { activeDeckId } = useDecks();
    const { inputRef } = useAutoFocusInput();
    const { cardState, cards, save, deleteCard } = useAddCardState();

    const handleEditCard = (cardId: string) => {
        navigateToEditCard(activeDeckId!, cardId);
    };

    return (
        <KeyboardAvoidingContainer>
            <AddCardForm
                inputRef={inputRef}
                cardState={cardState}
                onSave={save}
            />
            <AddCardsList
                cards={cards}
                onEdit={handleEditCard}
                onDelete={deleteCard}
            />
        </KeyboardAvoidingContainer>
    );
};

export default AddCardsScreen;