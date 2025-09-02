import { FlatList } from "react-native";

import ActionButtonsBar from "@/components/ActionButtonsBar";
import DeckListContainer from "@/ui/layout/DeckListContainer";
import DeckListItem from "@/ui/DeckListItem";
import { flatListStyles } from "@/utils/contentContainerStyle";

interface Props {
    savedDecks: { id: string; title: string }[];
    folderId: string;
    selection: {
        selectedIds: string[];
        toggle: (deckId: string) => void;
    };
}

const SelectFolderScreen = ({ savedDecks, selection, folderId }: Props) => {
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
                contentContainerStyle={flatListStyles.selectFolder()}
            />
            <ActionButtonsBar folderId={folderId} />
        </DeckListContainer>
    );
};

export default SelectFolderScreen;