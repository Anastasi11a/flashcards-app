import { Deck } from "@/data/decks";
import { useDeckActions } from "@/hooks/useDeckActions";
import { DeckContentList } from "../DecksList";
import MenuPopupButton from "../MenuPopupButton";
import FloatingAddButton from "@/ui/buttons/FloatingAddButton";
import BackgroundScreenView from "@/ui/container/BackgroundScreenView";

interface Props {
    deck: Deck;
    isMenuVisible: boolean;
    onCloseMenu: () => void;
}

const DeckContent = ({ deck, isMenuVisible, onCloseMenu }: Props) => {
    const { menuButtons, onAddCard, onEditCard, onDeleteCard } = useDeckActions(
        deck, onCloseMenu
    );

    return (
        <BackgroundScreenView>
            <MenuPopupButton
                isVisible={isMenuVisible}
                buttons={menuButtons}
                onClose={onCloseMenu}
            />
            <DeckContentList
                cards={deck.cards}
                onEdit={onEditCard}
                onDelete={onDeleteCard}
            />
            <FloatingAddButton onPress={onAddCard} />
        </BackgroundScreenView>
    );
};

export default DeckContent;