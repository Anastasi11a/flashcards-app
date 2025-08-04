import { Deck } from "@/data/decks";
import DeckListContainer from "../ui/layout/DeckListContainer";
import DeckList from "./DecksList";
import MenuPopupButton from "./MenuPopupButton";

interface MenuButton {
    label: string;
    onPress: () => void;
}

interface Props {
    deck: Deck;
    isMenuVisible: boolean;
    menuButtons: MenuButton[];
    onCloseMenu: () => void;
    onDeleteCard: (cardId: string) => void;
    onEditCard: (cardId: string) => void;
}

const DeckContainer = ({ 
    deck, isMenuVisible, menuButtons, 
    onCloseMenu, onDeleteCard, onEditCard
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
            </DeckListContainer>
        </>
    );
};

export default DeckContainer;