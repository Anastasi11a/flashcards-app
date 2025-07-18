import { GradientOverlay, StyledPressable } from "@/ui/CardInputFields";

interface GradientButtonProps {
    icon: React.ReactElement;
    colors: [string, string, ...string[]];
    onPress?: () => void;
}

const GradientButton = ({ icon, colors, onPress }: GradientButtonProps) => {
    return (
        <GradientOverlay colors={colors}>
            <StyledPressable onPress={onPress}>
                {icon}
            </StyledPressable>
        </GradientOverlay>     
    );
};

export default GradientButton;