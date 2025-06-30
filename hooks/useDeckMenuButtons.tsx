import { useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface DeckMenuButtonProps {
    deckId: string;
    onAdd: () => void;
    onEdit: () => void;
    onExport: () => void;
    onDelete: (deckId: string) => void;
}

export const useDeckMenuButtons = (props: DeckMenuButtonProps) => {
    return useCallback(() => {
        const icon = (name: keyof typeof MaterialIcons.glyphMap) => (
            <MaterialIcons name={name} size={24} color="#0a7ea4" />
        );

        return [
            { 
                label: 'Add new card', 
                icon: icon('playlist-add'), 
                onPress: props.onAdd 
            },
            { 
                label: 'Edit collection name', 
                icon: icon('edit-note'), 
                onPress: props.onEdit 

            },
            {
                label: 'Export Deck', 
                icon: icon('file-download'), 
                onPress: () => props.onExport(),
            },
            { 
                label: 'Delete Deck', 
                icon: icon('delete-sweep'), 
                onPress: () => props.onDelete(props.deckId) 
            },
        ];
    }, [props.deckId, props.onAdd, props.onEdit, props.onDelete]);
};
