import { Card } from "@/data/decks";
import MenuPopupButton from "./MenuPopupButton";
import DeckListContainer from "./DeckListContainer";
import DeckList from "./DecksList";

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
                />
            </DeckListContainer>
        </>
    );
};

export default DeckContainer;