import { useState, useCallback } from "react";
import { useLocalSearchParams } from "expo-router";
import { SimpleLineIcons } from "@expo/vector-icons";

import DeckDetailScreen from "@/components/screens/DeckDetailScreen";
import { useDecks } from "@/context/DeckContext";
import useCustomHeader from "@/hooks/useCustomHeader";

const DeckScreen: React.FC = () => {
    const { id } = useLocalSearchParams<{ id: string }>();   
    const { decks } = useDecks(); 
    const deck = decks.find((d) => d.id === id);

    const [isMenuVisible, setMenuVisible] = useState(false);
    const openMenu = useCallback(() => setMenuVisible(true), []);
    
    useCustomHeader({ 
        title: deck?.title,
        headerTransparent: true,
        headerBlurEffect: 'regular',
        rightButton: {
            icon: <SimpleLineIcons name='options-vertical' size={18} color='#808080' />,
            onPress: openMenu, 
        },
    });
    
    if (!deck) return null;

    return (
        <DeckDetailScreen 
            deckId={id} 
            isMenuVisible={isMenuVisible}
            onCloseMenu={() => setMenuVisible(false)}
        />
    );
};

export default DeckScreen;