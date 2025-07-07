import { Tabs } from "expo-router";
import { Alert, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useDecks } from "@/context/DeckContext";
import { importDeck as pickDeckFile } from "@/utils/importDeck";
import HeaderOptions from "@/components/HeaderOptions";
import BlurBackground from "@/ui/BlurBackground";

export default function TabLayout() {
    const { importDeck } = useDecks();

    const handleImport  = async () => {
        try {
            const deck = await pickDeckFile();
            if (!deck) return;
            await importDeck(deck);

        } catch (err) {
            console.error('Failed to import deck:', err);
            Alert.alert('Import Failed', 'Could not import the deck. Make sure the file is valid.');
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