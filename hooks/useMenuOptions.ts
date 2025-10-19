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
import type { SortOrder } from './useMenuButtons';

export const useMenuOptions = <T extends Deck | FolderWithDecks>(
    entity: T,
    closeMenu: () => void,
) => {
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

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

    const onSort = isDeck
        ? () => {
            const nextOrder: SortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            const sortedCards = [...(entity as Deck).cards].sort((a, b) =>
                nextOrder === 'asc'
                    ? a.question.localeCompare(b.question)
                    : b.question.localeCompare(a.question)
            );
            actions.reorderCards(id, sortedCards).catch(console.error);
            setSortOrder(nextOrder);
        }
        : () => {
            const nextOrder: SortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            const sortedDeck = [...(entity as FolderWithDecks).decks ?? []].sort((a, b) =>
                    nextOrder === 'asc'
                        ? a.title.localeCompare(b.title)
                        : b.title.localeCompare(a.title)
                );
            folderActions.updateFolderDeckOrder(entity.id, sortedDeck)
                .catch(console.error);
            setSortOrder(nextOrder);
        };

    const menuButtons = useMenuButtons({
        id,
        type,
        onAdd: onAddCard,
        onEditTitle,
        onExport,
        onDelete,
        onSort,
        currentSortOrder: sortOrder,
    });

    return {
        menuButtons,
        onEditTitle,
        onDelete,
        onSort,
        sortOrder,
        ...(isDeck && {
            onAddCard,
            onEditCard,
            onDeleteCard,
        }),
    };
};