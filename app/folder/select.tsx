import { useEffect } from "react";
import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { useDecks } from "@/context/DeckContext";
import useCustomHeader from "@/hooks/useCustomHeader";
import SelectButtonContainer from "@/components/SelectButtonContainer";
import ActionButtonsBar from "@/ui/ActionButtonsBar";
import DeckListContainer from "@/ui/layout/DeckListContainer";
import DeckListItem from "@/ui/DeckListItem";

const SelectFolder = () => {
    const { decks, selection } = useDecks();
    const { folderId } = useLocalSearchParams<{ folderId: string }>();

    useEffect(() => {
        selection.clear();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useCustomHeader({
        title: 'Select Folders',
        rightButton: () => (
            <SelectButtonContainer allIds={decks.map((d) => d.id)}/>
        ),
    });

    return (
        <DeckListContainer>
            <FlatList
                data={decks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DeckListItem
                        title={item.title}
                        checked={selection.selectedIds.includes(item.id)}
                        onToggleCheck={() => selection.toggle(item.id)}
                        showCheckbox={true} 
                        showBookmarkIcon={false}
                    />
                )}
                contentContainerStyle={{
                    gap: 4,
                    paddingTop: 12,
                    paddingBottom: 140,
                    paddingHorizontal: 10,
                }}
            />
            {folderId ? <ActionButtonsBar folderId={folderId} /> : null}
        </DeckListContainer>
    );
};

export default SelectFolder;