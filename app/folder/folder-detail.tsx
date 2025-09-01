import { useState } from "react";
import { FlatList } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Swipeable } from "react-native-gesture-handler";

import { useDecks } from "@/context/DeckContext";
import useCustomHeader from "@/hooks/useCustomHeader";
import DeckListContainer from "@/ui/layout/DeckListContainer";
import DeckListItem from "@/ui/DeckListItem";
import DeckListEmpty from "@/ui/DeckListEmpty";
import SwipeOptionsView from "@/ui/SwipeOptionsView";
import RemoveFolderButton from "@/ui/RemoveFolderButton";
import { flatListStyles } from "@/utils/contentContainerStyle";
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

    const handlePress = (deckId: string) => {
        setSelectedDeckId?.(deckId);
        router.push('/deck/deck-detail');
    };

    const renderRightActions = (deckId: string) => (
        <SwipeOptionsView
            onDeletePress={() => {
                if (!folderId) return;
                removeDeckFromFolder(deckId, folderId);
            }}
        />
    );

    return (
        <DeckListContainer>
            <FlatList
                data={shownDecks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                        <DeckListItem
                            title={item.title}
                            onPress={() => handlePress(item.id)}
                            showCheckbox={false}
                            showBookmarkIcon={false}
                        />
                    </Swipeable>
                )}
                ListEmptyComponent={<DeckListEmpty>No decks found</DeckListEmpty>}
                contentContainerStyle={flatListStyles.folderDetail()}
            />
        </DeckListContainer>
    );
};

export default FolderDetail;