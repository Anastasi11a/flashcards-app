import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

const ClearButton = ({ onPress }: { onPress: () => void }) => {
    return (
        <ClearButtonWrapper>
            <TouchableOpacity hitSlop={10} onPress={onPress}>  
                <MaterialIcons name='close' size={20} color='#808080' />
            </TouchableOpacity>
        </ClearButtonWrapper>
    );
};

export default ClearButton;

const ClearButtonWrapper = styled(View)`
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-12px);
`;