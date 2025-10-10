import { useDecks } from "@/context/DeckContext";
import { SwipeableReorderList } from "../common/SwipeableReorderList";
import { navigateToCards } from "@/utils/navigation/navigation";

const DecksScreen = () => {
    const { decks, actions } = useDecks();

    return (
        <SwipeableReorderList
            data={decks}
            type='deck'
            isDeck
            getCardCount={(item) => item.cards.length}
            onDelete={actions.deleteDeck}
            onReorder={actions.reorderDecks}
            onPress={(id) => navigateToCards(id)}
        />
    );
};

export default DecksScreen;