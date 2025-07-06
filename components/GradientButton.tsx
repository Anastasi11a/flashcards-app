import { GradientOverlay, StyledPressable } from "@/ui/CardInputFields";

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