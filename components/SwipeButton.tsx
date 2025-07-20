import { SwipeButtonView, SwipeButtonViewProps } from "@/ui/SwipeButtonView";

type IconType = 'edit' | 'delete';
type IconName = SwipeButtonViewProps['iconName'];

interface SwipeEditProps {
    iconType: IconType;
    iconName: IconName;
    onPress: () => void;
}

const SwipeButton = ({ iconName, iconType, onPress }: SwipeEditProps) => {
    const gradientColors: [string, string] =
        iconType === 'delete'
            ? ['#ff5f6d', '#d11a2a']
            : ['#42e695', '#035e04'];

    return (
        <SwipeButtonView
            iconName={iconName}
            gradientColors={gradientColors}
            onPress={onPress}
        />
    ); 
};

export default SwipeButton;