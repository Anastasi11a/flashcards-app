import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

export default function BlurBackground() {
    return (
        <BlurView
            tint='systemChromeMaterialDark'
            intensity={40}
            style={StyleSheet.absoluteFill}
        />
    );
};

export function useBottomTabOverflow() {
    return useBottomTabBarHeight();
};