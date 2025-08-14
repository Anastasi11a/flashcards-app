import { useDecks } from "@/context/DeckContext";
import DeckListItem, { DeckListItemProps } from "@/ui/DeckListItem";

type ContainerProps = Omit<DeckListItemProps, 'isFavorite' | 'cardCount'> & {
    deckId: string;
};

const DeckListItemContainer = ({ deckId, ...rest }: ContainerProps) => {
    const { isDeckFavorite, savedDecks } = useDecks();

    const deck = savedDecks.find(d => d.id === deckId);
    const cardCount = deck ? deck.cards.length : 0;

    return (
        <DeckListItem
            {...rest}
            isFavorite={isDeckFavorite(deckId)}
            cardCount={cardCount}
            isBookmarksPage={true}
            showBookmarkIcon={false}
        />
    );
};

export default DeckListItemContainer;