import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import AddButton from "@/components/AddButton";

export default function TabLayout() {
    const router = useRouter();

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
            }}
        >
            <Tabs.Screen 
                name='index' 
                options={{ 
                    title: 'Flashcards',
                    headerTitleStyle: {
                        marginTop: 10,
                        textAlign: "center",
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: '#e6e6e6',
                    },
                    headerRight: () => (
                        <AddButton onPress={() => router.push('/create/add-deck-title')} />
                    ),
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
}