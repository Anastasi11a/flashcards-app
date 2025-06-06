import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: '#25292e',
                    height: 110,
                },
                tabBarActiveTintColor: '#0a7ea4',
                tabBarStyle: {
                    backgroundColor: '#1a1c20',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 80,
                    borderTopEndRadius: 20,
                    borderTopStartRadius: 20,
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