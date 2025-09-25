import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";

import { useDecks } from "@/context/DeckContext";
import { FolderWithDecks } from "@/data/decks";
import DeckContainer from "@/ui/container/DeckContainer";
import { navigateToFolder } from "@/utils/navigation/navigation";
import { flatListStyles } from "@/utils/contentContainerStyle";

const FoldersScreen = ({ folders }: { folders: FolderWithDecks[] }) => {
    const { folder } = useDecks();
    if (!folders.length) return null;

    const renderDeckItem = ({ item, drag }: RenderItemParams<FolderWithDecks>) => (
        <DeckContainer
            title={item.title}
            cardCount={item.decks ? item.decks.length : item.deckIds.length}
            onPress={() => navigateToFolder(item.id)}
            onLongPress={drag}
        />
    );

    return (
        <DraggableFlatList
            data={folders}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={renderDeckItem}
            onDragEnd={({ data }) => folder.reorderFolders(data)}
            contentContainerStyle={flatListStyles.appDecks()}
        />
    );
};

export default FoldersScreen;