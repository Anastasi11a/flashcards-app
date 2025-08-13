import { useDecks } from "@/context/DeckContext";
import DeckListItem, { DeckListItemProps } from "@/ui/DeckListItem";

type ContainerProps = Omit<DeckListItemProps, 'isFavorite'> & {
    deckId: string;
};

const DeckListItemContainer = ({ deckId, ...rest }: ContainerProps) => {
    const { isDeckFavorite } = useDecks();

    return (
        <DeckListItem
            {...rest}
            isFavorite={isDeckFavorite(deckId)}
            isBookmarksPage={true}
            showBookmarkIcon={false}
        />
    );
};

export default DeckListItemContainer;