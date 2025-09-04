import { Deck } from "@/data/decks";
import DeckList from "../DecksList";
import MenuPopupButton from "../MenuPopupButton";
import { useDeckActions } from "@/hooks/useDeckActions";
import FloatingAddButton from "@/ui/buttons/FloatingAddButton";
import DeckListContainer from "@/ui/layout/DeckListContainer";

interface Props {
    deck: Deck;
    isMenuVisible: boolean;
    onCloseMenu: () => void;
}

const DeckContent = ({ deck, isMenuVisible, onCloseMenu }: Props) => {
    const {
        menuButtons,
        onAddCard, 
        onEditCard, 
        onDeleteCard 
    } = useDeckActions(deck, onCloseMenu);

    return (
        <DeckListContainer>
            <MenuPopupButton
                isVisible={isMenuVisible}
                buttons={menuButtons}
                onClose={onCloseMenu}
            />
            <DeckList 
                cards={deck.cards}
                onDelete={(card) => onDeleteCard(card.id)}
                onEdit={(card) => onEditCard(card.id)}
                isHeaderTransparent={true} 
            />
            <FloatingAddButton onPress={onAddCard} />
        </DeckListContainer>
    );
};

export default DeckContent;