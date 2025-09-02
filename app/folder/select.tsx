import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

import { useDecks } from "@/context/DeckContext";
import useCustomHeader from "@/hooks/useCustomHeader";
import SelectFolderScreen from "@/components/screens/SelectFolderScreen";
import SelectButtonContainer from "@/components/SelectButtonContainer";

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
        <SelectFolderScreen
            savedDecks={savedDecks}
            selection={selection}
            folderId={folderId}
        />
    );
};

export default SelectFolder;