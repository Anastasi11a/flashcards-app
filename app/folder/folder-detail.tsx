import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

import { useDecks } from "@/context/DeckContext";
import useCustomHeader from "@/hooks/useCustomHeader";
import FolderDetailScreen from "@/components/screens/FolderDetailScreen";
import RemoveFolderButton from "@/ui/RemoveFolderButton";
import { confirmRemoveFolder } from "@/utils/confirmRemoveFolder";

const FolderDetail = () => {
    const [resetGradient, setResetGradient] = useState(false);

    const router = useRouter();
    const { folderId } = useLocalSearchParams<{ folderId?: string }>();
    const { 
        folders, decks, setSelectedDeckId, selection, removeFolder, removeDeckFromFolder 
    } = useDecks();

    const currentFolder = folders.find(f => f.id === folderId);

    const handleRemoveFolder = async () => {
        if (!folderId) return;
        confirmRemoveFolder(folderId, router, removeFolder, setResetGradient);
    };

    useCustomHeader({
        title: currentFolder?.title,
        headerTransparent: true,
        headerBlurEffect: 'regular',
        rightButton: () => (
            <RemoveFolderButton reset={resetGradient} onPress={handleRemoveFolder} />
        ),
        leftButton: { 
            onPress: () => router.replace('/(tabs)/about')
        },
    });

    const shownDecks = folderId
        ? currentFolder?.decks ?? []
        : decks.filter(d => new Set(selection?.selectedIds ?? []).has(d.id));

    const handlePressDeck = (deckId: string) => {
        setSelectedDeckId?.(deckId);
        router.push('/deck/deck-detail');
    };

    const handleDeleteDeck = (deckId: string) => {
        if (!folderId) return;
        removeDeckFromFolder(deckId, folderId);
    };

    return (
        <FolderDetailScreen
            shownDecks={shownDecks}
            onPressDeck={handlePressDeck}
            onDeleteDeck={handleDeleteDeck}
        />
    );
};

export default FolderDetail;