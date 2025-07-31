import { useRouter } from "expo-router";

import { useDecks } from "@/context/DeckContext";
import { useAddCardState } from "@/hooks/useAddCardState";
import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import KeyboardBehavior from "@/ui/layout/KeyboardBehavior";
import AddCardsContainer from "../AddCardsContainer";
import DeckList from "../DecksList";

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

    const handleEditCard = (cardId: string) => {
        router.push({
            pathname: '/(modals)/edit-card',
            params: { deckId, cardId },
        });
    };

    const handleDeleteCard = async (cardId: string) => {
        await deleteCard(deckId, cardId);
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
                deckId={deckId} 
                cards={cards} 
                onDelete={(_, cardId) => handleDeleteCard(cardId)}
                onEdit={(_, cardId) => handleEditCard(cardId)}
            />
        </KeyboardBehavior>
    );
};

export default AddCardsScreen;