import { Platform, ViewStyle } from "react-native";

export const tabBarStyle: ViewStyle = Platform.select({
    ios: { position: 'absolute' },
    default: {},
});

export const headerStyle: ViewStyle = {
    height: Platform.select({
        ios: 130,
        android: 120,
        default: 120,
    }),
};