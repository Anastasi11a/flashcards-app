import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";

interface CustomHeaderProps {
    title?: string | null;
    enabled?: boolean;
}

const useCustomHeader = ({ title, enabled = true }: CustomHeaderProps) => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        if (!enabled || !title) return;

        navigation.setOptions({
            title,
            headerStyle: {
                backgroundColor: "#25292e",
            },
            headerBackTitle: "Back",
            headerTintColor: "#ffd33d", 
            headerTitleStyle: {
                color: "#e6e6e6",
                fontSize: 20,
                fontWeight: "bold",
            },
        });
    }, [navigation, title, enabled]);
};

export default useCustomHeader;