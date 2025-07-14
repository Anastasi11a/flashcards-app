import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from "react-native";

interface RightButtonProps {
    onPress: () => void;
    label?: string;
    icon?: React.ReactNode | (() => React.ReactNode);
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

interface CustomHeaderProps {
    title?: string | null;
    enabled?: boolean;
    headerTransparent?: boolean;
    headerBlurEffect?: 'regular';
    rightButton?: RightButtonProps;
}

const useCustomHeader = ({ 
    title, 
    enabled = true, 
    headerTransparent,
    headerBlurEffect, 
    rightButton 
}: CustomHeaderProps) => {
    const navigation = useNavigation();

    const renderRightButton = () => {
        if (!rightButton) return undefined;

        const { onPress, icon, label, style, textStyle } = rightButton;

        return () => (
            <TouchableOpacity
                onPress={onPress}
                style={style}
                hitSlop={{ top: 10, bottom: 10, left: 20, right: 10 }}>

                {icon
                ? (typeof icon === 'function' ? icon() : icon)
                : (
                    <Text style={[
                        {
                            color: "#0a7ea4",
                            fontSize: 20,
                            fontWeight: "bold",
                            marginRight: 10,
                            paddingHorizontal: 3,
                        },
                        textStyle,
                        ]}>
                        {label}
                    </Text>
                )}
            </TouchableOpacity>
        );
    };

    useLayoutEffect(() => {
        if (!enabled || !title) return;

        navigation.setOptions({
            title: title ?? '',
            headerStyle: headerTransparent
                ? undefined
                : { backgroundColor: "#1a1c20" },
            headerBackTitle: "Back",
            headerTintColor: "#808080",
            headerTitleStyle: {
                color: "#e6e6e6",
                fontSize: 18,
                fontWeight: "bold",
            },
            headerTransparent,
            headerBlurEffect,
            headerRight: renderRightButton(),
        });
    }, [navigation, title, enabled, headerTransparent, headerBlurEffect, rightButton]);
};

export default useCustomHeader;