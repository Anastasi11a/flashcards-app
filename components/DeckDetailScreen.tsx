import { useDecks } from "@/context/DeckContext";
import DeckList from "./DecksList";

interface Props {
    deckId?: string;
}

const DeckDetailScreen: React.FC<Props> = ({ deckId }) => {
    const { decks, deleteCard } = useDecks();
    const deck = decks.find((d) => d.id === deckId); 

    if (!deck || !deckId) return null;

    const handleDeleteCard = (deckId: string, cardId: string) => {
        deleteCard(deckId, cardId);
    };

    return (
        <DeckList 
            deckId={deckId}
            cards={deck.cards} 
            onDelete={handleDeleteCard} 
        />
    );
}

export default DeckDetailScreen;