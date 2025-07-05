import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

import { StyledPressable } from "@/ui/CardInputFields";

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
    border-radius: 16px;
    justify-content: center;
    align-items: center;
`;