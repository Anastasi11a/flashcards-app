import { useCallback } from "react";
import { useRouter } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

import DeckList from "../DecksList";
import MenuPopupButton from "../MenuPopupButton";
import { useDecks } from "@/context/DeckContext";
import { useDeckMenuButtons } from "@/hooks/useDeckMenuButtons";
import { useConfirmDeleteDeck } from "@/hooks/useConfirmDeleteDeck";
import { showExportOptions } from "@/utils/showExportOptions";

interface DeckDetailScreenProps {
    deckId?: string;
    isMenuVisible: boolean;
    onCloseMenu: () => void;
}

const DeckDetailScreen = ({ deckId, isMenuVisible, onCloseMenu }: DeckDetailScreenProps) => {
    const router = useRouter();
    const headerHeight = useHeaderHeight();

    const { decks, deleteCard } = useDecks();
    const deck = decks.find((d) => d.id === deckId);
    if (!deck || !deckId) return null;

    const confirmDeleteDeck = useConfirmDeleteDeck();

    const handleEditCardPressed = (cardId: string) => {
        router.push({
            pathname: '/(modals)/edit-card',
            params: { deckId, cardId },
        });
    };

    const handleDeleteCard = (deckId: string, cardId: string) => {
        deleteCard(deckId, cardId);
    };

    const handleAddPressed = () => { 
        onCloseMenu();
        router.push({
            pathname: '/(modals)/add-new-card',
            params: { deckId },
        });
    };

    const handleEditTitlePressed = () => {
        onCloseMenu();
        router.push({
            pathname: '/(modals)/edit-title',
            params: { deckId },
        });
    };

    const handleExportDeck = useCallback(() => {
        if (deck) showExportOptions(deck, onCloseMenu);
    }, [deck]);

    const handleDeleteDeck = (deckId: string) => {
        onCloseMenu();
        confirmDeleteDeck(deckId);
    };

    const menuButtons = useDeckMenuButtons({
        deckId,
        onAdd: handleAddPressed,
        onEdit: handleEditTitlePressed,
        onExport: handleExportDeck,
        onDelete: handleDeleteDeck,
    });

    return (
        <>
            <MenuPopupButton
                isVisible={isMenuVisible}
                buttons={menuButtons()} 
                onClose={onCloseMenu}
            />
            <DeckList 
                deckId={deckId}
                cards={deck.cards}
                paddingTop={headerHeight}
                onDelete={handleDeleteCard}
                onEdit={(_, cardId) => handleEditCardPressed(cardId)}
            />
        </>
    );
};

export default DeckDetailScreen;