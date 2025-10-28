import { Deck } from "@/data/decks";
import { DeckContentList } from "../common/DecksList";
import { useMenu } from "@/context/MenuContext";
import { useMenuOptions } from "@/hooks/useMenuOptions";
import FloatingAddButton from "@/ui/buttons/FloatingAddButton";
import MenuPopupButton from "@/ui/buttons/MenuPopupButton";
import { ScreenContainer } from "@/ui/container/ScreenContainer";

const DeckContent = ({ entity: deck }: { entity: Deck }) => {
    const { isMenuVisible, closeMenu } = useMenu();

    const { menuButtons, onAddCard, onEditCard, onDeleteCard } = useMenuOptions(
        deck, closeMenu
    );

    return (
        <ScreenContainer>
            <MenuPopupButton
                isVisible={isMenuVisible}
                buttons={menuButtons}
                onClose={closeMenu}
            />
            <DeckContentList
                cards={deck.cards}
                onEdit={onEditCard}
                onDelete={onDeleteCard!}
            />
            <FloatingAddButton onPress={onAddCard!} />
        </ScreenContainer>
    );
};

export default DeckContent;