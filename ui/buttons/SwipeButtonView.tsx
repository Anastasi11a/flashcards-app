import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { titleText } from "@/constants/text/textStyles";

interface Props {
    iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
    label?: string;
    gradientColors: [string, string];
    onPress: () => void; 
}

const SwipeButtonView = ({ iconName, label, gradientColors, onPress }: Props) => {
    return (
        <ButtonBackground colors={gradientColors}>
            <PressableArea onPress={onPress}>
                {iconName ? (
                    <StyledIcon name={iconName} />
                ) : label ? (
                    <StyledText>{label}</StyledText>
                ) : null}
            </PressableArea>
        </ButtonBackground >
    ); 
};

export default SwipeButtonView;

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

const StyledText = styled(Text)`
    ${titleText}
    text-align: center;
`;