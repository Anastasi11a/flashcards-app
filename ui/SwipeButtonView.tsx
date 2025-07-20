import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

export interface SwipeButtonViewProps {
    iconName: IconName;
    gradientColors: [string, string];
    onPress: () => void;
}

export const SwipeButtonView = ({ iconName, gradientColors, onPress }: SwipeButtonViewProps) => {
    return (
        <ButtonBackground colors={gradientColors}>
            <PressableArea onPress={onPress}>
                <StyledIcon name={iconName} />
            </PressableArea>
        </ButtonBackground >
    ); 
};

const ButtonBackground = styled(LinearGradient)`
    width: 64px;
    margin-left: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const PressableArea = styled(TouchableOpacity)`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const StyledIcon = styled(MaterialCommunityIcons)`
    font-size: 24px;
    color: #e6e6e6;
`;