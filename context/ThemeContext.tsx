import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme, ThemeColors } from "@/themes/theme";

interface ThemeContextProps {
    theme: ThemeColors;
    themeName: "light" | "dark";
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: lightTheme,
    themeName: "light",
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemColorScheme = useColorScheme();
    const [themeName, setThemeName] = useState<"light" | "dark">(
        systemColorScheme === "dark" ? "dark" : "light"
    );

    const theme = themeName === "dark" ? darkTheme : lightTheme;

    useEffect(() => {
        setThemeName(systemColorScheme === "dark" ? "dark" : "light");
    }, [systemColorScheme]);

    const toggleTheme = () => {
        setThemeName((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);