import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

export default function BlurBackground() {
    return (
        <BlurView
            tint='dark'
            intensity={40}
            style={StyleSheet.absoluteFill}
        />
    );
};