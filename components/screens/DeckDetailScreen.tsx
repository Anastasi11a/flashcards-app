import { useCallback } from "react";
import { useRouter } from "expo-router";

import type { Deck } from "@/data/decks";
import DeckContainer from "../DeckContainer";
import { useDecks } from "@/context/DeckContext";
import { useDeckMenuButtons } from "@/hooks/useDeckMenuButtons";
import { useConfirmDeleteDeck } from "@/hooks/useConfirmDeleteDeck";
import { showExportOptions } from "@/utils/showExportOptions";

interface Props { 
    deck: Deck;
    isMenuVisible: boolean;
    onCloseMenu: () => void;
}

const DeckDetailScreen = ({ deck, isMenuVisible, onCloseMenu }: Props) => {
    const router = useRouter();
    const { deleteCard } = useDecks();
    const confirmDeleteDeck = useConfirmDeleteDeck();

    const handleEditCardPressed = (cardId: string) => {
        router.push({
            pathname: '/(modals)/edit-card',
            params: { deckId: deck.id, cardId },
        });
    };

    const handleDeleteCard = (cardId: string) => {
        deleteCard(deck.id, cardId);
    };

    const handleAddPressed = () => {
        router.push({
            pathname: '/(modals)/add-new-card',
            params: { deckId: deck.id },
        });
    };
 
    const handleEditTitlePressed = () => {
        router.push({
            pathname: '/(modals)/edit-title',
            params: { deckId: deck.id },
        });
    };

    const handleExportDeck = useCallback(() => {
        showExportOptions(deck, onCloseMenu);
    }, [deck, onCloseMenu]);

    const handleDeleteDeck = () => {
        confirmDeleteDeck(deck.id);
    };

    const menuButtons = useDeckMenuButtons({
        deckId: deck.id,
        onAdd: handleAddPressed,
        onEditTitle: handleEditTitlePressed,
        onExport: handleExportDeck,
        onDelete: handleDeleteDeck,
    });

    return (
        <DeckContainer
            deck={deck}
            isMenuVisible={isMenuVisible}
            menuButtons={menuButtons()}
            onCloseMenu={onCloseMenu}
            onDeleteCard={handleDeleteCard}
            onEditCard={handleEditCardPressed}
        />
    );
};

export default DeckDetailScreen;