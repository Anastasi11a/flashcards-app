import { useDecks } from "@/context/DeckContext";
import AddCardForm from "../AddCardForm";
import { AddCardsList } from "../DecksList";
import { useAddCardState } from "@/hooks/useAddCardState";
import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import { ScreenContainer } from "@/ui/container/ScreenContainer";
import { navigateToEditCard } from "@/utils/cardNavigation";

const AddCards = () => {
    const { activeDeckId } = useDecks();
    const { inputRef, focusInput } = useAutoFocusInput();
    const { cardState, cards, save, deleteCard } = useAddCardState();

    const handleSave = () => {
        save();
        focusInput();
    };

    const handleEditCard = (cardId: string) => {
        navigateToEditCard(activeDeckId!, cardId);
    };

    return (
        <ScreenContainer>
            <AddCardForm
                inputRef={inputRef}
                cardState={cardState}
                onSave={handleSave}
            />
            <AddCardsList
                cards={cards}
                onEdit={handleEditCard}
                onDelete={deleteCard}
            />
        </ScreenContainer>
    );
};

export default AddCards;