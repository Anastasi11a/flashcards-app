import { Tabs } from "expo-router";

import FavoriteHeaderAction from "@/components/FavoriteHeaderAction";
import HeaderOptions from "@/components/HeaderOptions";
import createTabIcon from "@/components/TabBarIcon";
import BlurBackground from "@/ui/background/BlurBackground";
import { createScreenHeader } from "@/ui/header/ScreenHeader";
import { tabBarStyle } from "@/utils/navigationStyles";

export default function TabLayout() { 
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
                        rightComponent: <HeaderOptions />,
                    }),
                    tabBarLabel: 'Collections',
                    tabBarIcon: createTabIcon('reader-outline', 'reader'),
                }}
            />
            <Tabs.Screen 
                name='about'
                options={{
                    ...createScreenHeader({
                        title: 'Albums',
                        rightComponent: <FavoriteHeaderAction />,
                    }),
                    tabBarLabel: 'Bookmarks',
                    tabBarIcon: createTabIcon('bookmark-outline', 'bookmark'),
                }}
            />
        </Tabs>
    );
};