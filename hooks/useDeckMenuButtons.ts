import { createElement } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ButtonProps {
    deckId: string;
    onAdd: () => void;
    onEditTitle: () => void;
    onExport: () => void;
    onDelete: (deckId: string) => void;
    onSort?: () => void;
    currentSortOrder?: 'asc' | 'desc';
}

export const useDeckMenuButtons = ({ 
    deckId, onAdd, onEditTitle, onExport, onDelete, onSort, currentSortOrder 
}: ButtonProps) => {
    const icon = (
        name: keyof typeof MaterialCommunityIcons.glyphMap,
        color = '#fff'
    ) => createElement(MaterialCommunityIcons, { name, size: 24, color });

    const buttons = [
        {
            label: 'Add Card', 
            icon: icon('playlist-plus'), 
            onPress: onAdd,
        },
        { 
            label: 'Rename title', 
            icon: icon('playlist-edit'), 
            onPress: onEditTitle,

        },       
        {
            label: 'Export', 
            icon: icon('export-variant'),
            onPress: onExport,
        },
        { 
            label: 'Remove', 
            icon: icon('delete-sweep', '#ff4d4f'), 
            onPress: () => onDelete(deckId),
            isDestructive: true,
        },
    ];

    if (onSort && currentSortOrder) {
        buttons.splice(2, 0, {
            label: 'Sort',
            icon: icon(
                currentSortOrder === 'asc'
                    ? 'sort-alphabetical-ascending-variant'
                    : 'sort-alphabetical-descending-variant'
            ),
            onPress: onSort,
        });
    }

    return buttons;
};