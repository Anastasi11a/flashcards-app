import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

interface AddButtonProps {
    onPress: () => void;
}

const AddButton = (props: AddButtonProps) => {
    return (
        <GradientOverlay colors={['#12b3d6', '#0a7ea4']}>
            <StyledPressable onPress={props.onPress}>
                <MaterialIcons name="add" size={24} color="#fff" />
            </StyledPressable>
        </GradientOverlay>     
    );
};

export default AddButton;

const GradientOverlay = styled(LinearGradient)`
    width: 52px;
    height: 46px;
    margin: 12px 12px 0 0;
    border-radius: 16px;
    justify-content: center;
    align-items: center;
`;

const StyledPressable = styled(TouchableOpacity)`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;