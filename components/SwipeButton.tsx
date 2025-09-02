import SwipeButtonView, { IconName } from "@/ui/SwipeButtonView";
import { GRADIENTS } from "@/constants/colors/gradient";

type IconType = 'edit' | 'delete';

interface SwipeButtonProps {
    iconType: IconType;
    iconName: IconName;
    onPress: () => void;
}

const SwipeButton = ({ iconName, iconType, onPress }: SwipeButtonProps) => {
    const gradientColors =
        iconType === 'delete' ? GRADIENTS.DELETE : GRADIENTS.EDIT;

    return (
        <SwipeButtonView
            iconName={iconName}
            gradientColors={gradientColors}
            onPress={onPress}
        />
    ); 
};

export default SwipeButton;