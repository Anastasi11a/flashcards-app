import { useCallback, useState, useMemo } from "react";
import { useLocalSearchParams } from "expo-router";

import { useDecks } from "@/context/DeckContext";
import DeckContent from "@/components/pages/DeckContent";
import useCustomHeader from "@/hooks/useCustomHeader";

const DeckScreen = () => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const { deckId } = useLocalSearchParams<{ deckId: string }>();

    const { decks } = useDecks();
    const deck = useMemo(() => decks.find((d) => d.id === deckId), [decks, deckId]);

    const openMenu = useCallback(() => setMenuVisible(true), []);
    const closeMenu = useCallback(() => setMenuVisible(false), []);
    
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

    return (
        <DeckContent
            deck={deck}
            isMenuVisible={isMenuVisible}
            onCloseMenu={closeMenu}
        />
    );
};

export default DeckScreen;