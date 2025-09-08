import { useCallback, useState } from "react";

import { useDecks } from "@/context/DeckContext";
import DeckContent from "@/components/screens/DeckContent";
import useCustomHeader from "@/hooks/useCustomHeader";

const DeckScreen = () => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    
    const { decks, activeDeckId } = useDecks(); 
    const deck = decks.find((d) => d.id === activeDeckId);

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
    
    if (!deck || !activeDeckId) return null;

    return (
        <DeckContent
            deck={deck}
            isMenuVisible={isMenuVisible}
            onCloseMenu={closeMenu}
        />
    );
};

export default DeckScreen;