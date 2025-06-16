import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from "react-native";

interface CustomHeaderProps {
    title?: string | null;
    enabled?: boolean;
    rightButton?: {
        onPress: () => void;
        label: string;
        style?: StyleProp<ViewStyle>;
        textStyle?: StyleProp<TextStyle>;
    };
}

const useCustomHeader = ({ title, enabled = true, rightButton }: CustomHeaderProps) => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        if (!enabled || !title) return;

        navigation.setOptions({
            title,
            headerStyle: {
                backgroundColor: "#1a1c20",
            },
            headerBackTitle: "Back",
            headerTintColor: "#ffd33d",
            headerTitleStyle: {
                color: "#e6e6e6",
                fontSize: 20,
                fontWeight: "bold",
            },
            headerRight: rightButton
                ? () => (
                    <TouchableOpacity onPress={rightButton.onPress} style={rightButton.style}>
                        <Text 
                            style={[
                                { 
                                    color: "#0a7ea4",
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    marginRight: 10,
                                    paddingHorizontal: 3,  
                                }, rightButton.textStyle
                            ]}
                        >
                            {rightButton.label}
                        </Text>
                    </TouchableOpacity>
                )
                : undefined,
        });
    }, [navigation, title, enabled, rightButton]);
};

export default useCustomHeader;