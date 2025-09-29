import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { GRADIENTS } from "@/constants/colors/gradient";

export interface ButtonIconProps {
    icon: React.ElementType;
    variant?: keyof typeof GRADIENTS;
    iconName: string;
    iconSize?: number;
    iconColor?: string;
    containerSize?: number;
    borderRadius?: number;
    onPress?: () => void;
}

const GradientButton = ({
    icon: Icon, 
    iconName,
    iconSize = 24, 
    iconColor = '#fff', 
    variant = 'BLUE',
    containerSize = 46,
    borderRadius = 16,
    onPress,
}: ButtonIconProps) => {
    return (
        <GradientOverlay 
            colors={GRADIENTS[variant]} 
            size={containerSize}
            borderRadius={borderRadius}
        >
            <StyledPressable onPress={onPress}>
                <Icon name={iconName} size={iconSize} color={iconColor} />
            </StyledPressable>
        </GradientOverlay>     
    );
};

export default GradientButton;

const GradientOverlay = styled(LinearGradient)<{ 
    size: number; 
    borderRadius: number;
}>`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border-radius: ${({ borderRadius }) => borderRadius}px;
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