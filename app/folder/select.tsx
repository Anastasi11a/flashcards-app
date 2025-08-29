import { useEffect } from "react";
import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { useDecks } from "@/context/DeckContext";
import useCustomHeader from "@/hooks/useCustomHeader";
import SelectButtonContainer from "@/components/SelectButtonContainer";
import ActionButtonsBar from "@/components/ActionButtonsBar";
import DeckListContainer from "@/ui/layout/DeckListContainer";
import DeckListItem from "@/ui/DeckListItem";
import { PADDING_TOP } from "@/constants/height/header";
import { flatListContentStyle } from "@/constants/flatlist/flatListStyles";

const SelectFolder = () => {
    const { savedDecks, selection } = useDecks();
    const { folderId } = useLocalSearchParams<{ folderId: string }>();

    useEffect(() => {
        selection.clear();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useCustomHeader({
        title: 'Select Folders',
        headerTransparent: true,
        headerBlurEffect: 'regular',
        rightButton: () => (
            <SelectButtonContainer allIds={savedDecks.map((d) => d.id)}/>
        ),
    });

    return (
        <DeckListContainer>
            <FlatList
                data={savedDecks}
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
                    paddingTop: PADDING_TOP,
                    ...flatListContentStyle, 
                }}
            />
            <ActionButtonsBar folderId={folderId} />
        </DeckListContainer>
    );
};

export default SelectFolder;