import { Card } from "@/data/decks";
import DeckListContainer from "../ui/layout/DeckListContainer";
import DeckList from "./DecksList";
import MenuPopupButton from "./MenuPopupButton";

interface Props {
    deckId: string;
    deck: { cards: Card[] }; 
    isMenuVisible: boolean;
    menuButtons: { 
        label: string; 
        onPress: () => void 
    }[];
    onCloseMenu: () => void;
    onDeleteCard: (cardId: string) => void;
    onEditCard: (cardId: string) => void;
}

const DeckContainer = ({ 
    deckId, deck, isMenuVisible, menuButtons, 
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
                    deckId={deckId}
                    cards={deck.cards}
                    onDelete={(_, cardId) => onDeleteCard(cardId)}
                    onEdit={(_, cardId) => onEditCard(cardId)}
                    isHeaderTransparent={true} 
                />
            </DeckListContainer>
        </>
    );
};

export default DeckContainer;