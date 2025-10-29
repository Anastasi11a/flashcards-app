import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";

import { useDecks } from "@/context/DeckContext";
import { useMenu, MenuProvider } from "@/context/MenuContext";
import DeckContent from "@/components/pages/DeckContent";
import useCustomHeader from "@/hooks/useCustomHeader";

const DeckScreenInner = () => {
    const { deckId, folderId } = useLocalSearchParams<{ 
        deckId: string; 
        folderId?: string 
    }>();
    const { decks, folders } = useDecks();
    const { openMenu } = useMenu();

    const deck = useMemo(() => {
        if (folderId) {
            const folder = folders.find(f => f.id === folderId);
            return folder?.decks?.find(d => d.id === deckId);
        }
        return decks.find(d => d.id === deckId);
    }, [decks, folders, deckId, folderId]);

    useCustomHeader({ 
        title: deck?.title,
        headerTransparent: true,
        headerBlurEffect: 'dark',
        rightButton: {
            iconName: 'options-vertical',
            onPress: openMenu, 
        },
    });
    
    if (!deck) return null;

    return <DeckContent entity={deck} folderId={folderId} />;
};

const DeckScreen = () => (
    <MenuProvider>
        <DeckScreenInner />
    </MenuProvider>
);

export default DeckScreen;