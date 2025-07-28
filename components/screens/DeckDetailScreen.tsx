import { useCallback } from "react";
import { useRouter } from "expo-router";

import DeckContainer from "../DeckContainer";
import { useDecks } from "@/context/DeckContext";
import { useDeckMenuButtons } from "@/hooks/useDeckMenuButtons";
import { useConfirmDeleteDeck } from "@/hooks/useConfirmDeleteDeck";
import { showExportOptions } from "@/utils/showExportOptions";

interface Props {
    deckId?: string;
    isMenuVisible: boolean;
    onCloseMenu: () => void;
}

const DeckDetailScreen = ({ deckId, isMenuVisible, onCloseMenu }: Props) => {
    const router = useRouter();
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

    const handleDeleteCard = (cardId: string) => {
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
        <DeckContainer
            deckId={deckId}
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