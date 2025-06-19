import { useDecks } from "@/context/DeckContext";
import useCardEditor from "@/hooks/useCardEditor";
import DeckList from "./DecksList";
import EditCardModal from "@/ui/EditCardModal";

interface DeckDetailScreenProps {
    deckId?: string;
}

const DeckDetailScreen = (props: DeckDetailScreenProps) => {
    const { decks, deleteCard, editCard } = useDecks();
    const deck = decks.find((d) => d.id === props.deckId); 
    const { 
        editingCardId, editQuestion, editAnswer, setEditQuestion, setEditAnswer, startEditing, saveEdit, resetEditor
    } = useCardEditor(
        {
            initialCards: deck?.cards ?? [],
            onUpdateCards: (updatedCards) => {
                const updatedCard = updatedCards.find(card => card.id === editingCardId);
                if (updatedCard) {
                    editCard(props.deckId!, updatedCard.id, updatedCard.question, updatedCard.answer);
                }
            },
        }
    );

    if (!deck || !props.deckId) return null;

    const handleDeleteCard = (deckId: string, cardId: string) => {
        deleteCard(deckId, cardId);
    };

    return (
        <>
            <DeckList 
                deckId={props.deckId}
                cards={deck.cards} 
                onDelete={handleDeleteCard} 
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
        </>
    );
};

export default DeckDetailScreen;