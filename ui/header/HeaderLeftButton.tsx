import { TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const HeaderLeftButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>

            <SimpleLineIcons name='arrow-left' size={18} color='#808080' />
        </TouchableOpacity>
    );
};

export default HeaderLeftButton;