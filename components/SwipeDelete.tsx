import { TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

interface SwipeDeleteProps {
    onDelete: () => void;
}

const SwipeDelete = (props: SwipeDeleteProps) => {
    return (
        <StyledPressable onPress={props.onDelete}>
            <MaterialIcons name='delete-sweep' size={24} color='#e6e6e6' />
        </StyledPressable>
    ); 
}

export default SwipeDelete;

const StyledPressable = styled(TouchableOpacity)`
    width: 64px;
    margin-left: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background-color: #d11a2a;
`;