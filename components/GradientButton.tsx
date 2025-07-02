import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

interface GradientButtonProps {
    icon: React.ReactElement;
    colors: [string, string, ...string[]];
    onPress?: () => void;
}

const GradientButton = (props: GradientButtonProps) => {
    return (
        <GradientOverlay colors={props.colors}>
            <StyledPressable onPress={props.onPress}>
                {props.icon}
            </StyledPressable>
        </GradientOverlay>     
    );
};

export default GradientButton;

const GradientOverlay = styled(LinearGradient)`
    width: 46px;
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