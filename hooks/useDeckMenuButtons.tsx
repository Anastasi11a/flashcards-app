import { useCallback } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface DeckMenuButtonProps {
    deckId: string;
    onAdd: () => void;
    onEdit: () => void;
    onExport: () => void;
    onDelete: (deckId: string) => void;
}

export const useDeckMenuButtons = (props: DeckMenuButtonProps) => {
    return useCallback(() => {
        const icon = (
            name: keyof typeof MaterialCommunityIcons.glyphMap,
            color = '#fff'
        ) => <MaterialCommunityIcons name={name} size={24} color={color} />;

        return [
            { 
                label: 'Add new card', 
                icon: icon('playlist-plus'), 
                onPress: props.onAdd 
            },
            { 
                label: 'Edit title', 
                icon: icon('playlist-edit'), 
                onPress: props.onEdit 

            },
            {
                label: 'Export', 
                icon: icon('export-variant'), 
                onPress: () => props.onExport(),
            },
            { 
                label: 'Remove', 
                icon: icon('delete-sweep', '#ff4d4f'), 
                onPress: () => props.onDelete(props.deckId),
                isDestructive: true,
            },
        ];
    }, [props.deckId, props.onAdd, props.onEdit, props.onDelete]);
};