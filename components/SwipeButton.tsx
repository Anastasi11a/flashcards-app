import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { StyledPressable, StyledIcon } from "@/ui/CardInputFields";

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;
type IconType = 'edit' | 'delete';

interface SwipeEditProps {
    iconName: IconName;
    iconType: IconType;
    colors?: [string, string, ...string[]];
    onPress: () => void;
}

const SwipeButton = (props: SwipeEditProps) => {
    const gradientColors: [string, string] =
        props.iconType === 'delete'
            ? ['#ff5f6d', '#d11a2a']
            : ['#42e695', '#035e04'];

    return (
        <GradientWrapper colors={gradientColors}>
            <StyledPressable onPress={props.onPress}>
                <StyledIcon name={props.iconName} />
            </StyledPressable>
        </GradientWrapper>
    ); 
};

export default SwipeButton;

const GradientWrapper = styled(LinearGradient)`
    width: 64px;
    margin-left: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;