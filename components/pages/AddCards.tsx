import { useLocalSearchParams } from "expo-router";

import { AddCardsList } from "../common/DecksList";
import { useAddCardState } from "@/hooks/useAddCardState";
import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import AddCardButton from "@/ui/buttons/AddCardButton";
import CardInputContainer from "@/ui/container/CardInputContainer";
import { ScreenContainer } from "@/ui/container/ScreenContainer";
import CardInputs from "@/ui/input/CardInputs";
import { navigateToEditCard } from "@/utils/navigation/navigation";

const AddCards = () => {
    const { deckId } = useLocalSearchParams<{ deckId: string }>();
    const { inputRef, focusInput } = useAutoFocusInput();
    const { cardState, cards, save, deleteCard } = useAddCardState(deckId!);

    const handleSave = () => {
        save();
        focusInput();
    };

    const handleEditCard = (cardId: string) => {
        navigateToEditCard(deckId!, cardId);
    };

    return (
        <ScreenContainer>
            <CardInputContainer> 
                <CardInputs inputRef={inputRef} cardState={cardState} />
                <AddCardButton label='Add Card' onPress={handleSave} />
            </CardInputContainer>

            <AddCardsList
                deckId={deckId!}
                cards={cards}
                onEdit={handleEditCard}
                onDelete={deleteCard}
            />
        </ScreenContainer>
    );
};

export default AddCards;