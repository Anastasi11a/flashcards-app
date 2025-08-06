import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

interface GradientButtonProps {
    icon: React.ReactElement;
    size?: number;
    colors: [string, string, ...string[]];
    onPress: () => void;
}

const GradientButton = ({ icon, size = 46, colors, onPress }: GradientButtonProps) => {
    return (
        <GradientOverlay size={size} colors={colors}>
            <StyledPressable onPress={onPress}>
                {icon}
            </StyledPressable>
        </GradientOverlay>     
    );
};

export default GradientButton;

const GradientOverlay = styled(LinearGradient)<{ size: number }>`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border-radius: 16px;
    justify-content: center;
    align-items: center;
`;

export const StyledPressable = styled(TouchableOpacity)`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;