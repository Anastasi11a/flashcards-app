import { useState, useCallback } from "react";

import { useDecks } from "@/context/DeckContext";
import DeckDetailScreen from "@/components/screens/DeckDetailScreen";
import useCustomHeader from "@/hooks/useCustomHeader";

const DeckScreen = () => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    
    const { decks, selectedDeckId } = useDecks(); 
    const deck = decks.find((d) => d.id === selectedDeckId);

    const openMenu = useCallback(() => setMenuVisible(true), []);
    const closeMenu = useCallback(() => setMenuVisible(false), []);
    
    useCustomHeader({ 
        title: deck?.title,
        headerTransparent: true,
        headerBlurEffect: 'regular',
        rightButton: {
            iconName: 'options-vertical',
            onPress: openMenu, 
        },
    });
    
    if (!deck || !selectedDeckId) return null;

    return (
        <DeckDetailScreen 
            deck={deck}
            isMenuVisible={isMenuVisible}
            onCloseMenu={closeMenu}
        />
    );
};

export default DeckScreen;