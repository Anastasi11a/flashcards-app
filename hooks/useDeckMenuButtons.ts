import { createElement, useCallback } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ButtonProps {
    deckId: string;
    onAdd: () => void;
    onEditTitle: () => void;
    onExport: () => void;
    onDelete: (deckId: string) => void;
}

export const useDeckMenuButtons = ({
    deckId, onAdd, onEditTitle, onExport, onDelete }: ButtonProps) => {
    return useCallback(() => {
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
    }, [deckId, onAdd, onEditTitle, onExport, onDelete]);
};