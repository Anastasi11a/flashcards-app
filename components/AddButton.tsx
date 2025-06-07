import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

interface AddButtonProps {
    onPress: () => void;
}

const AddButton = (props: AddButtonProps) => {
    return (
        <StyledPressable onPress={props.onPress}>
            <MaterialIcons name='add' size={32} color='#fff' />
        </StyledPressable>
    );
};

export default AddButton;

const StyledPressable = styled(TouchableOpacity)`
    position: absolute;
    right: 20px;
    bottom: 80px;
    width: 60px;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    background-color: #0a7ea4;
`;