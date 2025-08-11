import { createElement } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useDecks } from "@/context/DeckContext";

interface ButtonProps {
    deckId: string;
    onAdd: () => void;
    onEditTitle: () => void;
    onExport: () => void;
    onDelete: (deckId: string) => void;
}

export const useDeckMenuButtons = ({ 
    deckId, onAdd, onEditTitle, onExport, onDelete 
}: ButtonProps) => {
    const { 
        saveDeckToFavorites, 
        removeDeckFromFavorites, 
        isDeckFavorite, 
        sortOrder, toggleSortCards
    } = useDecks();
    const isFavorite = isDeckFavorite(deckId);

    const icon = (
        name: keyof typeof MaterialCommunityIcons.glyphMap,
        color = '#fff'
    ) => createElement(MaterialCommunityIcons, { name, size: 24, color });

    return [
        { 
            label: 'Add new card', 
            icon: icon('playlist-plus'), 
            onPress: onAdd,
        },
        { 
            label: 'Edit title', 
            icon: icon('playlist-edit'), 
            onPress: onEditTitle,

        },
        {
            label: 'Sort',
            icon: icon(
                sortOrder === 'asc'
                    ? 'sort-alphabetical-ascending-variant'
                    : 'sort-alphabetical-descending-variant'
            ),
            onPress: () => toggleSortCards(deckId),
        },
        {
            label: isFavorite ? 'Remove from favorites' : 'Add to favorites',
            icon: isFavorite ? icon('bookmark') : icon('bookmark-outline'),
            onPress: () => isFavorite 
                ? removeDeckFromFavorites(deckId) 
                : saveDeckToFavorites(deckId),
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
};