import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

import { GRADIENTS } from "@/constants/colors/gradient";

type IconComponent = React.ElementType;
type GradientVariant = keyof typeof GRADIENTS;

export interface IconProps {
    icon: IconComponent;
    iconName: string;
    iconSize?: number;
    iconColor?: string;
    gradientVariant?: GradientVariant;
    buttonSize?: number;
    borderRadius?: number;
}

interface ButtonGradientViewProps extends IconProps{
    onPress?: () => void;
}

const ButtonGradientView = ({ 
    icon: Icon, 
    iconName,
    iconSize = 24, 
    iconColor = '#fff', 
    gradientVariant = 'BLUE',
    buttonSize = 46,
    borderRadius = 16,
    onPress,
}: ButtonGradientViewProps) => {
    const gradientColors = GRADIENTS[gradientVariant];

    return (
        <GradientOverlay 
            colors={gradientColors} 
            size={buttonSize}
            borderRadius={borderRadius}
        >
            <StyledPressable onPress={onPress}>
                <Icon name={iconName} size={iconSize} color={iconColor} />
            </StyledPressable>
        </GradientOverlay>     
    );
};

export default ButtonGradientView;

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