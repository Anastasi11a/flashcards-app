import { useCallback } from "react";
import { useRouter } from "expo-router";

import type { Deck } from "@/data/decks";
import { useDecks } from "@/context/DeckContext";
import { useDeckMenuButtons } from "@/hooks/useDeckMenuButtons";
import { useConfirmDeleteDeck } from "@/hooks/useConfirmDeleteDeck";
import { showExportOptions } from "@/utils/showExportOptions";

export const useDeckActions = (deck: Deck, closeMenu: () => void) => {
    const router = useRouter();
    const { deleteCard } = useDecks();
    const confirmDeleteDeck = useConfirmDeleteDeck();

    const onAddCard = () => {
        router.push({
            pathname: '/(modals)/add-new-card',
            params: { deckId: deck.id },
        });
    };

    const onEditCard = (cardId: string) => {
        router.push({
            pathname: '/(modals)/edit-card',
            params: { deckId: deck.id, cardId },
        });
    };

    const onDeleteCard = (cardId: string) => {
        deleteCard(deck.id, cardId);
    };

    const onEditTitle = () => {
        router.push({
            pathname: '/(modals)/edit-title',
            params: { deckId: deck.id },
        });
    };

    const onExport = useCallback(() => {
        showExportOptions(deck, closeMenu);
    }, [deck, closeMenu]);

    const onDeleteDeck = () => {
        confirmDeleteDeck(deck.id);
    };

    const menuButtons = useDeckMenuButtons({
        deckId: deck.id,
        onAdd: onAddCard,
        onEditTitle,
        onExport,
        onDelete: onDeleteDeck,
    });

    return { onAddCard, onEditCard, onDeleteCard, menuButtons };
};