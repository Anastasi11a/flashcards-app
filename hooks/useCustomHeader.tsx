import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from "react-native";

interface CustomHeaderProps {
    title?: string | null;
    enabled?: boolean;
    headerTransparent?: boolean;
    headerBlurEffect?: 'regular';
    rightButton?: {
        onPress: () => void;
        label?: string;
        icon?: React.ReactNode;
        style?: StyleProp<ViewStyle>;
        textStyle?: StyleProp<TextStyle>;
    };
}

const useCustomHeader = ({ 
    title, 
    enabled = true, 
    headerTransparent,
    headerBlurEffect, 
    rightButton 
}: CustomHeaderProps) => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        if (!enabled || !title) return;

        navigation.setOptions({
            title,
            ...(headerTransparent
                ? {}
                : {
                    headerStyle: {
                        backgroundColor: "#1a1c20",
                    },
                }),
            headerBackTitle: 'Back',
            headerTintColor: "#808080",
            headerTitleStyle: {
                color: "#e6e6e6",
                fontSize: 18,
                fontWeight: "bold",
            },
            ...(headerTransparent !== undefined && { headerTransparent }),
            ...(headerBlurEffect !== undefined && { headerBlurEffect }),
            headerRight: rightButton
                ? () => (
                    <TouchableOpacity 
                        onPress={rightButton.onPress} 
                        style={rightButton.style}
                        hitSlop={{ top: 10, bottom: 10, left: 20, right: 10 }}>
                            
                        {rightButton.icon ?? (
                            <Text 
                                style={[
                                    { 
                                        color: "#0a7ea4",
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        marginRight: 10,
                                        paddingHorizontal: 3,  
                                    }, 
                                    rightButton.textStyle
                                ]}>
                                {rightButton.label}
                            </Text>
                        )}
                    </TouchableOpacity>
                )
                : undefined,
        });
    }, [navigation, title, enabled, headerTransparent, headerBlurEffect, rightButton]);
};

export default useCustomHeader;