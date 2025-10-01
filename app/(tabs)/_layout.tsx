import { Tabs } from "expo-router";

import DeckHeaderActions from "@/components/options/DeckHeaderActions";
import BlurBackground from "@/ui/background/BlurBackground";
import AddFolderButton from "@/ui/buttons/AddFolderButton";
import { buildHeaderConfig } from "@/ui/header/BuildHeaderConfig";
import { tabBarStyle } from "@/utils/navigationStyles";
import { navigateToAddFolder } from "@/utils/navigation/navigation"; 
import { tabIcon } from "@/utils/icon/tabIcons";

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
                    ...buildHeaderConfig({
                        title: 'Flashcards',
                        rightComponent: <DeckHeaderActions />,
                    }),
                    tabBarLabel: 'Collections',
                    tabBarIcon: tabIcon('reader-outline', 'reader'),
                }}
            />
            <Tabs.Screen 
                name='about'
                options={{
                    ...buildHeaderConfig({
                        title: 'Albums',
                        rightComponent: <AddFolderButton onPress={navigateToAddFolder} />,
                    }),
                    tabBarLabel: 'Albums',
                    tabBarIcon: tabIcon('albums-outline', 'albums'),
                }}
            />
        </Tabs>
    );
};