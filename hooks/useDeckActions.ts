import { useCallback } from "react";
import { useRouter } from "expo-router";

import type { Deck } from "@/data/decks";
import { useDecks } from "@/context/DeckContext";
import { useDeckMenuButtons } from "@/hooks/useDeckMenuButtons";
import { useConfirmDeleteDeck } from "@/hooks/useConfirmDeleteDeck";
import { showExportOptions } from "@/utils/showExportOptions";
import { navigateToAddCard, navigateToEditCard } from "@/utils/cardNavigation";

export const useDeckActions = (deck: Deck, closeMenu: () => void) => {
    const router = useRouter();
    const { actions } = useDecks();

    const confirmDeleteDeck = useConfirmDeleteDeck();

    const onAddCard = () => navigateToAddCard(deck.id);
    const onEditCard = (cardId: string) => navigateToEditCard(deck.id, cardId);
    const onDeleteCard = (cardId: string) => actions.deleteCard(cardId);

    const onEditTitle = () => {
        router.push({
            pathname: '/(modals)/title',
            params: { deckId: deck.id, mode: 'edit' }, 
        });
    };

    const onExport = useCallback(() => {
        showExportOptions(deck, closeMenu);
    }, [deck, closeMenu]);

    const onDeleteDeck = () => confirmDeleteDeck(deck.id);

    const menuButtons = useDeckMenuButtons({
        deckId: deck.id,
        onAdd: onAddCard,
        onEditTitle,
        onExport,
        onDelete: onDeleteDeck,
    });

    return {
        menuButtons,
        onAddCard, 
        onEditCard,
        onDeleteCard
    };
};