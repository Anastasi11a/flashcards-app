import { useDecks } from "@/context/DeckContext";
import { SwipeableReorderList } from "../common/SwipeableReorderList";
import { navigateToFolder } from "@/utils/navigation/navigation";

const FoldersScreen = () => {
    const { folders, folderActions } = useDecks();
    
    return (
        <SwipeableReorderList
            data={folders}
            type='folder'
            isDeck={false}
            getCardCount={(item) => item.decks ? item.decks.length : item.deckIds.length}
            onDelete={folderActions.removeFolder}
            onReorder={folderActions.reorderFolders}
            onPress={(id) => navigateToFolder(id)}
        />
    );
};

export default FoldersScreen;