import { useState, useCallback } from "react";

import DeckDetailScreen from "@/components/screens/DeckDetailScreen";
import { useDecks } from "@/context/DeckContext";
import useCustomHeader from "@/hooks/useCustomHeader";

const DeckScreen: React.FC = () => {
    const { decks, selectedDeckId } = useDecks(); 
    const deck = decks.find((d) => d.id === selectedDeckId);

    const [isMenuVisible, setMenuVisible] = useState(false);
    const openMenu = useCallback(() => setMenuVisible(true), []);
    
    useCustomHeader({ 
        title: deck?.title,
        headerTransparent: true,
        headerBlurEffect: 'regular',
        rightButton: {
            iconName: 'options-vertical',
            onPress: openMenu, 
        },
    });
    
    if (!deck) return null;

    return (
        <DeckDetailScreen 
            deckId={selectedDeckId!} 
            isMenuVisible={isMenuVisible}
            onCloseMenu={() => setMenuVisible(false)}
        />
    );
};

export default DeckScreen;