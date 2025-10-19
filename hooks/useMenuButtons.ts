import { createElement } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type SortOrder = 'asc' | 'desc';

interface CommonMenuProps {
    id: string;
    type: 'deck' | 'folder';
    onEditTitle: () => void;
    onDelete: (id: string) => void;
}

interface DeckExtras {
    onAdd?: () => void;
    onExport?: () => void;
    onSort?: () => void;
    currentSortOrder?: 'asc' | 'desc';
}

type MenuProps = CommonMenuProps & Partial<DeckExtras>;

export const useMenuButtons = ({
    id,
    type,
    onAdd,
    onEditTitle,
    onExport,
    onDelete,
    onSort,
    currentSortOrder,
}: MenuProps) => {
    const icon = (
        name: keyof typeof MaterialCommunityIcons.glyphMap,
        color = '#fff'
    ) => createElement(MaterialCommunityIcons, { name, size: 24, color });

    const buttons = [];

    if (type === 'deck' && onAdd) {
        buttons.push({
            label: 'Add Card',
            icon: icon('playlist-plus'),
            onPress: onAdd,
        });
    }

    buttons.push({
        label: 'Rename title',
        icon: icon('playlist-edit'),
        onPress: onEditTitle,
    });

    if (onSort) {
        buttons.push({
            label: 'Sort',
            icon: icon(
                currentSortOrder === 'desc'
                ? 'sort-alphabetical-ascending-variant'
                : 'sort-alphabetical-descending-variant'
            ),
            onPress: onSort,
        });
    }

    if (type === 'deck' && onExport) {
        buttons.push({
            label: 'Export',
            icon: icon('export-variant'),
            onPress: onExport,
        });
    }

    buttons.push({
        label: 'Remove',
        icon: icon('delete-sweep', '#ff4d4f'),
        onPress: () => onDelete(id),
        isDestructive: true,
    });

    return buttons;
};