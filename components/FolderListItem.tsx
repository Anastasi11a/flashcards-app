import { FlatList } from "react-native";

import { Folder } from "@/data/decks";
import FolderContainer from "@/ui/FolderContainer";
import FolderBarWrapper from "@/ui/FolderBarWrapper";
  
interface Props {
    folders: Folder[];
}

const FolderListItem = ({ folders }: Props) => {
    if (!folders.length) return null;

    return (
        <FolderBarWrapper>
            <FlatList
                data={folders}
                keyExtractor={(item) => item.id}
                horizontal
                inverted
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <FolderContainer title={item.title} />}
                contentContainerStyle={{
                    paddingTop: 12,
                    paddingHorizontal: 10,
                }}
            />
        </FolderBarWrapper>
    );
};

export default FolderListItem;