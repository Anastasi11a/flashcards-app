import { View, useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import styled, { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "@/themes/theme";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <StyledView>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            </StyledView>
        </ThemeProvider>
    );
}

const StyledView = styled(View)`
    display: flex;
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;