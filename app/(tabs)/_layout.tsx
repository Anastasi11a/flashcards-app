import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HeaderOptions from "@/components/HeaderOptions";
import { useDecks } from "@/context/DeckContext";
import { importDeck } from "@/utils/importDeck";
import BlurBackground from "@/ui/BlurBackground";

export default function TabLayout() {
    const { addDeck } = useDecks();

    const handleImport  = async () => {
        const importedDeck = await importDeck();
        if (importedDeck) {
            addDeck(importedDeck.title, importedDeck.cards); 
        }
    };

    return (
        <Tabs
            screenOptions={{
                headerShadowVisible: false,
                tabBarActiveTintColor: '#0a7ea4',
                tabBarStyle: Platform.select({
                    ios: { position: 'absolute' },
                    default: {},
                }),
                tabBarBackground: BlurBackground,
            }}>
            <Tabs.Screen 
                name='index' 
                options={{ 
                    title: 'Flashcards',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        marginTop: 10,
                        marginStart: 12,
                        fontSize: 28,
                        fontWeight: 'bold',
                        color: '#e6e6e6',
                    },
                    headerStyle: {
                        backgroundColor: 'transparent',
                        height: Platform.select({
                            ios: 130,
                            android: 120,
                            default: 120,
                        }),
                    },
                    headerTransparent: true,
                    headerBackground: BlurBackground,
                    headerRight: () => <HeaderOptions onImport={handleImport} />,
                    tabBarLabel: 'Cards collection',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons 
                            name={focused ? 'home-sharp' : 'home-outline'} 
                            color={color} 
                            size={24}
                        />
                    ),
                }} 
            />
            <Tabs.Screen 
                name='about' 
                options={{ 
                    title: 'About' ,
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons 
                            name={focused ? 'information-circle' : 'information-circle-outline'} 
                            color={color} 
                            size={24} 
                        />
                    ),
                }} 
            />
        </Tabs>
    );
};