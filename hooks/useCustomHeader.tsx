import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { View, TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle, Dimensions } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

interface RightButtonProps {
    onPress: () => void;
    label?: string;
    iconName?: keyof typeof SimpleLineIcons.glyphMap;
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
    const screenWidth = Dimensions.get('window').width;

    const renderTitle = () => {
        return () => (
            <View 
                style={{
                    maxWidth: screenWidth - 120,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text 
                    style={{
                        color: "#e6e6e6",
                        fontSize: 18,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}>
                {title}
                </Text>
            </View>
        );
    };

    const renderRightButton = () => {
        if (!rightButton) return undefined;
        const { onPress, iconName, label, style, textStyle } = rightButton;

        return () => (
            <TouchableOpacity
                onPress={onPress}
                style={style}
                hitSlop={{ top: 10, bottom: 10, left: 20, right: 10 }}>

                {iconName ? (
                    <SimpleLineIcons name={iconName} size={18} color="#808080" />
                ) : (
                        <Text 
                            style={[
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
                    )
                }
            </TouchableOpacity>
        );
    };

    useLayoutEffect(() => {
        if (!enabled || !title) return;

        navigation.setOptions({
            title: title ?? '',
            headerTransparent,
            headerBlurEffect,
            headerStyle: headerTransparent
                ? undefined
                : { backgroundColor: "#1a1c20" },
            headerBackTitle: "Back",
            headerTintColor: "#808080",
            headerTitle: renderTitle(),
            headerRight: renderRightButton(),
        });
    }, [navigation, title, enabled, headerTransparent, headerBlurEffect, rightButton]);
};

export default useCustomHeader;