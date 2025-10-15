import { useState, useCallback } from 'react';

import { useDecks } from '@/context/DeckContext';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { useMenuButtons } from './useMenuButtons';
import { showExportOptions } from '@/utils/showExportOptions';
import {
    navigateToDecks,
    navigateBackToFolders,
    navigateToAddCard,
    navigateToEditCard,
    navigateToEditTitle,
} from '@/utils/navigation/navigation';

import type { Deck, FolderWithDecks } from '@/data/decks';

export const useMenuOptions = <T extends Deck | FolderWithDecks>(
    entity: T,
    closeMenu: () => void,
) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const { actions, folderActions } = useDecks();
    const confirmDelete = useConfirmDelete();

    const isDeck = 'cards' in entity;
    const type: 'deck' | 'folder' = isDeck ? 'deck' : 'folder';
    const id = entity.id;

    const onEditTitle = () => navigateToEditTitle(id, type);

    const onDelete = async () => {
        const confirmed = await confirmDelete(type, id);
        if (!confirmed) return;

        if (isDeck) {
            await actions.deleteDeck(id);
            navigateToDecks();
        } else {
            await folderActions.removeFolder(id);
            navigateBackToFolders();
        }
        closeMenu();
    };

    const onAddCard = isDeck 
        ? () => {
            closeMenu();
            navigateToAddCard(id);
        } 
        : undefined;

    const onEditCard = isDeck 
        ? (cardId: string) => navigateToEditCard(id, cardId) 
        : undefined;

    const onDeleteCard = isDeck 
        ? (cardId: string) => actions.deleteCard(cardId) 
        : undefined;

    const onExport = useCallback(() => {
        if (isDeck) {
            showExportOptions(entity as Deck, closeMenu);
        }
    }, [isDeck, entity, closeMenu]);

    const onSortCards = isDeck
        ? () => {
            const nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            const sortedCards = [...(entity as Deck).cards].sort((a, b) =>
                nextOrder === 'asc'
                    ? a.question.localeCompare(
                        b.question, 
                        undefined,
                        { sensitivity: 'base' }
                    )
                    : b.question.localeCompare(
                        a.question, 
                        undefined, 
                        { sensitivity: 'base' }
                    )
            );
            actions.reorderCards(id, sortedCards).catch(console.error);
            setSortOrder(nextOrder);
        }
        : undefined;

    const menuButtons = useMenuButtons({
        id,
        type,
        onAdd: onAddCard,
        onEditTitle,
        onExport,
        onDelete,
        onSort: onSortCards,
        currentSortOrder: isDeck ? sortOrder : undefined,
    });

    return {
        menuButtons,
        onEditTitle,
        onDelete,
        ...(isDeck && {
            onAddCard,
            onEditCard,
            onDeleteCard,
            onSortCards,
            sortOrder,
        }),
    };
};