import { FlatList } from "react-native";

import { useDecks } from "@/context/DeckContext";
import FolderActionBar from "../options/FolderActionBar";
import DeckContainer from "@/ui/container/DeckContainer";
import { ScreenContainer } from "@/ui/container/ScreenContainer";
import { flatListStyles } from "@/utils/contentContainerStyle";

const SelectFolders = () => {
    const { decks, selection } = useDecks();

    return (
        <ScreenContainer>
            <FlatList
                data={decks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DeckContainer
                        title={item.title}
                        checked={selection.selectedIds.includes(item.id)}
                        onToggleCheck={() => selection.toggle(item.id)}
                        showCheckbox={true}
                        showCountBadge={false}
                    />
                )}
                contentContainerStyle={flatListStyles.selectFolder()}
            />
            <FolderActionBar />
        </ScreenContainer>
    );
};

export default SelectFolders;