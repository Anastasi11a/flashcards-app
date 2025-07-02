import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import HeaderOptions from "@/components/HeaderOptions";
import { useDecks } from "@/context/DeckContext";
import { importDeck } from "@/utils/importDeck";

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
                headerStyle: {
                    backgroundColor: '#1a1c20', 
                    height: 110,
                },
                tabBarActiveTintColor: '#0a7ea4',
                tabBarStyle: {
                    backgroundColor: '#25292e',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 80,
                    borderColor: 'transparent',
                    paddingTop: 3,
                    overflow: 'hidden', 
                },
            }}>
            <Tabs.Screen 
                name='index' 
                options={{ 
                    title: 'Flashcards',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        marginTop: 16,
                        marginStart: 12,
                        fontSize: 28,
                        fontWeight: 'bold',
                        color: '#e6e6e6',
                    },
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