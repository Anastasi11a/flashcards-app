import { useState, useCallback } from "react";

import type { Deck } from "@/data/decks";
import { useDecks } from "@/context/DeckContext";
import { useConfirmDelete } from "@/hooks/useConfirmDelete";
import { useDeckMenuButtons } from "@/hooks/useDeckMenuButtons";
import { showExportOptions } from "@/utils/showExportOptions";
import { 
    navigateToAddCard, 
    navigateToEditCard, 
    navigateToEditTitle 
} from "@/utils/navigation/navigation";

export const useDeckActions = (deck: Deck, closeMenu: () => void) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const { actions } = useDecks();
    const confirmDelete = useConfirmDelete();

    const onAddCard = () => navigateToAddCard(deck.id);
    const onEditCard = (cardId: string) => navigateToEditCard(deck.id, cardId);
    const onDeleteCard = (cardId: string) => actions.deleteCard(cardId);
    const onEditTitle = () => navigateToEditTitle(deck.id);

    const onExport = useCallback(() => {
        showExportOptions(deck, closeMenu);
    }, [deck, closeMenu]);

    const onDeleteDeck = () => confirmDelete('deck', deck.id);

    const onSortCards = () => {
        const nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';

        const sortedCards = [...deck.cards].sort((a, b) =>
            nextOrder === 'asc'
                ? a.question.localeCompare(b.question, undefined, { sensitivity: 'base' })
                : b.question.localeCompare(a.question, undefined, { sensitivity: 'base' })
        );

        actions.reorderCards(deck.id, sortedCards).catch(console.error);
        setSortOrder(nextOrder);
    };

    const menuButtons = useDeckMenuButtons({
        deckId: deck.id,
        onAdd: onAddCard,
        onEditTitle,
        onExport,
        onDelete: onDeleteDeck,
        onSort: onSortCards,
        currentSortOrder: sortOrder
    });

    return {
        menuButtons,
        onAddCard, 
        onEditCard,
        onDeleteCard,
        onSortCards,
        sortOrder,
    };
};