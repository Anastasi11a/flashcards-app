import { TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

export interface LeftButtonProps {
    onPress?: () => void;
}

const HeaderLeftButton = ({ onPress }: LeftButtonProps) => {
    const navigation = useNavigation();

    const handlePress = () => {
        if (onPress) onPress();
        else navigation.goBack();
    };

    return (
        <TouchableOpacity hitSlop={12} onPress={handlePress}>
            <SimpleLineIcons name='arrow-left' size={18} color='#808080' />
        </TouchableOpacity>
    );
};

export default HeaderLeftButton;