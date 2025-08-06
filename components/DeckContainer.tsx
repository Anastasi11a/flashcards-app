import { Deck } from "@/data/decks";
import DeckList from "./DecksList";
import MenuPopupButton from "./MenuPopupButton";
import DeckListContainer from "../ui/layout/DeckListContainer";
import FloatingAddButton from "@/ui/FloatingAddButton";

interface MenuButton {
    label: string;
    onPress: () => void;
}

interface Props {
    deck: Deck;
    isMenuVisible: boolean;
    menuButtons: MenuButton[];
    onAddCard: () => void;
    onCloseMenu: () => void;
    onDeleteCard: (cardId: string) => void;
    onEditCard: (cardId: string) => void;
}

const DeckContainer = ({ 
    deck, isMenuVisible, menuButtons, 
    onAddCard, onCloseMenu, onDeleteCard, onEditCard
}: Props) => {
    return (
        <>
            <MenuPopupButton
                isVisible={isMenuVisible}
                buttons={menuButtons} 
                onClose={onCloseMenu}
            />
            <DeckListContainer> 
                <DeckList 
                    cards={deck.cards}
                    onDelete={(card) => onDeleteCard(card.id)}
                    onEdit={(card) => onEditCard(card.id)}
                    isHeaderTransparent={true} 
                />
                <FloatingAddButton onPress={onAddCard} />
            </DeckListContainer>
        </>
    );
};

export default DeckContainer;