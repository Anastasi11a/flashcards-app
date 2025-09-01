import { Tabs } from "expo-router";

import { useDecks } from "@/context/DeckContext";
import createTabIcon from "@/components/TabBarIcon";
import HeaderOptions from "@/components/HeaderOptions";
import FavoriteHeaderAction from "@/components/FavoriteHeaderAction";
import BlurBackground from "@/ui/BlurBackground";
import { handleImportDeck } from "@/utils/handleImportDeck";
import { tabBarStyle } from "@/utils/navigationStyles";
import { createScreenHeader } from "@/ui/header/ScreenHeader";

export default function TabLayout() {
    const { importDeck } = useDecks();
    const handleImport = () => handleImportDeck(importDeck);
 
    return (
        <Tabs
            screenOptions={{
                headerShadowVisible: false,
                tabBarActiveTintColor: '#0a7ea4',
                tabBarStyle,
                tabBarBackground: () => <BlurBackground />,
            }}>
            <Tabs.Screen 
                name='index' 
                options={{
                    ...createScreenHeader({
                        title: 'Flashcards',
                        rightComponent: <HeaderOptions onImport={handleImport} />,
                    }),
                    tabBarLabel: 'Collections',
                    tabBarIcon: createTabIcon('reader-outline', 'reader'),
                }}
            />
            <Tabs.Screen 
                name='about'
                options={{
                    ...createScreenHeader({
                        title: 'Favorites',
                        rightComponent: <FavoriteHeaderAction />,
                    }),
                    tabBarLabel: 'Bookmarks',
                    tabBarIcon: createTabIcon('bookmark-outline', 'bookmark'),
                }}
            />
        </Tabs>
    );
};