import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ClearButtonProps {
    onPress: () => void;
}

const ClearButton = (props: ClearButtonProps) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <MaterialIcons name='close' size={20} color='#808080' />
        </TouchableOpacity>
    );
};

export default ClearButton;