import SwipeButtonView, { IconName } from "@/ui/SwipeButtonView";

type IconType = 'edit' | 'delete';

interface SwipeButtonProps {
    iconType: IconType;
    iconName: IconName;
    onPress: () => void;
}

const gradientMap: Record<IconType, [string, string]> = {
    delete: ['#ff5f6d', '#d11a2a'],
    edit: ['#42e695', '#035e04'],
};

const SwipeButton = ({ iconName, iconType, onPress }: SwipeButtonProps) => {
    return (
        <SwipeButtonView
            iconName={iconName}
            gradientColors={gradientMap[iconType]}
            onPress={onPress}
        />
    ); 
};

export default SwipeButton;