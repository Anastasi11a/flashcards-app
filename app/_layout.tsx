import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"
import { View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { DeckProvider } from "@/context/DeckContext";
import { useLoadFont } from "@/hooks/useLoadFont";

export default function RootLayout() {
    const assetsLoaded = useLoadFont();

    if (!assetsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

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