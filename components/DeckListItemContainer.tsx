import { useDecks } from "@/context/DeckContext";
import DeckListItem, { DeckListItemProps } from "@/ui/DeckListItem";

type ContainerProps = Pick<DeckListItemProps, 'title' | 'onPress' | 'onLongPress'> & {
    deckId: string;
};

const DeckListItemContainer = ({ deckId, ...rest }: ContainerProps) => {
    const { favorites, savedDecks } = useDecks();

    const deck = savedDecks.find(d => d.id === deckId);
    const cardCount = deck ? deck.cards.length : 0;

    return (
        <DeckListItem
            {...rest}
            isFavorite={favorites.isFavorite(deckId)}
            cardCount={cardCount}
            isBookmarksPage={true}
            showBookmarkIcon={false}
        />
    );
};

export default DeckListItemContainer;