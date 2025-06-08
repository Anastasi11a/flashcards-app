import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { DeckProvider } from "@/context/DeckContext";

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <DeckProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
                <StatusBar style='dark' />
            </DeckProvider>
        </GestureHandlerRootView>
    );
}