import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ClearButtonProps {
    onPress: () => void;
}

const ClearButton = ({ onPress }: ClearButtonProps) => {
    return (
        <TouchableOpacity 
            onPress={onPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                
            <MaterialIcons name='close' size={20} color='#808080' />
        </TouchableOpacity>
    );
};

export default ClearButton;