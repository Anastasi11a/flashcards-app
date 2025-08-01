import { useRouter } from "expo-router";

import { Card } from "@/data/decks";
import { useDecks } from "@/context/DeckContext";
import DeckList from "../DecksList";
import AddCardsContainer from "../AddCardsContainer";
import { useAddCardState } from "@/hooks/useAddCardState";
import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import KeyboardBehavior from "@/ui/layout/KeyboardBehavior"

interface AddCardsScreenProps {
    deckId: string;
}

const AddCardsScreen = ({ deckId }: AddCardsScreenProps) => {
    const router = useRouter();
    const { inputRef, focusInput } = useAutoFocusInput();
    const { decks, deleteCard } = useDecks();

    const deck = decks.find((d) => d.id === deckId);
    const cards = deck?.cards || [];

    const {
        question, answer, setQuestion, setAnswer, save
    } = useAddCardState({ deckId, focusInput });

    const handleEditCard = (card: Card) => {
        router.push({
            pathname: '/(modals)/edit-card',
            params: { deckId, cardId: card.id },
        });
    };

    const handleDeleteCard = async (card: Card) => {
        await deleteCard(deckId, card.id);
    };

    return (
        <KeyboardBehavior>
            <AddCardsContainer
                inputRef={inputRef}
                question={question}
                answer={answer}
                onChangeQuestion={setQuestion}
                onChangeAnswer={setAnswer}
                onSave={save}
            />
            <DeckList 
                cards={cards} 
                onDelete={(card) => handleDeleteCard(card)}
                onEdit={(card) => handleEditCard(card)}
            />
        </KeyboardBehavior>
    );
};

export default AddCardsScreen;