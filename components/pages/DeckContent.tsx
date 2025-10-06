import { Deck } from "@/data/decks";
import { DeckContentList } from "../common/DecksList";
import { useDeckActions } from "@/hooks/useDeckActions";
import FloatingAddButton from "@/ui/buttons/FloatingAddButton";
import MenuPopupButton from "@/ui/buttons/MenuPopupButton";
import { ScreenContainer } from "@/ui/container/ScreenContainer";

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
        <ScreenContainer>
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
        </ScreenContainer>
    );
};

export default DeckContent;