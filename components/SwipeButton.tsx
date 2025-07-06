import { MaterialCommunityIcons } from "@expo/vector-icons";

import { 
    GradientSwipeButtonWrapper, 
    StyledPressable, 
    StyledIcon 
} from "@/ui/CardInputFields";

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
        <GradientSwipeButtonWrapper colors={gradientColors}>
            <StyledPressable onPress={props.onPress}>
                <StyledIcon name={props.iconName} />
            </StyledPressable>
        </GradientSwipeButtonWrapper>
    ); 
};

export default SwipeButton;