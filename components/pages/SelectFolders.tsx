import { useState, useCallback } from "react";
import { FlatList } from "react-native";

import { useDecks } from "@/context/DeckContext";
import FolderActionBar from "../options/FolderActionBar";
import DeckContainer from "@/ui/container/DeckContainer";
import { ScreenContainer } from "@/ui/container/ScreenContainer";
import { flatListStyles } from "@/utils/contentContainerStyle";

const SelectFolders = () => {
    const { decks } = useDecks();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggle = useCallback(
        (deckId: string) => {
            setSelectedIds((prev) =>
                prev.includes(deckId)
                ? prev.filter((id) => id !== deckId)
                : [...prev, deckId]
            );
        },
        [setSelectedIds]
    );

    const clear = useCallback(() => setSelectedIds([]), []);

    return (
        <ScreenContainer>
            <FlatList
                data={decks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DeckContainer
                        title={item.title}
                        checked={selectedIds.includes(item.id)}
                        onToggleCheck={() => toggle(item.id)}
                        showCheckbox={true}
                        showCountBadge={false}
                    />
                )}
                contentContainerStyle={flatListStyles.selectFolder()}
            />
            <FolderActionBar selectedIds={selectedIds} clearSelection={clear} />
        </ScreenContainer>
    );
};

export default SelectFolders;