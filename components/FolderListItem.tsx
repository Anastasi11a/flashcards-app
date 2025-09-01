import { useRouter } from "expo-router";
import { FlatList } from "react-native";

import { FolderWithDecks } from "@/data/decks";
import FolderContainer from "@/ui/FolderContainer";
import FolderBarWrapper from "@/ui/FolderBarWrapper";
import { flatListStyles } from "@/utils/contentContainerStyle";
  
interface Props {
    folders: FolderWithDecks[];
}

const FolderListItem = ({ folders }: Props) => {
    const router = useRouter();
    if (!folders.length) return null;

    const handlePress = (folderId: string) => {
        router.push({
            pathname: '/folder/folder-detail',
            params: { folderId },
        });
    };

    return (
        <FolderBarWrapper>
            <FlatList
                data={folders}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <FolderContainer
                        title={item.title}
                        count={item.decks ? item.decks.length : item.deckIds.length}
                        onPress={() => handlePress(item.id)}
                    />
                )}
                contentContainerStyle={flatListStyles.folderBar()}
            />
        </FolderBarWrapper>
    );
};

export default FolderListItem;