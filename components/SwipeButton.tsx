import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;
type IconType = 'edit' | 'delete';

interface SwipeEditProps {
    iconName: IconName;
    iconType: IconType;
    onPress: () => void;
}

const SwipeButton = (props: SwipeEditProps) => {
    return (
        <StyledPressable onPress={props.onPress} iconType={props.iconType}>
            <IconComponent name={props.iconName} />
        </StyledPressable>
    ); 
};

export default SwipeButton;

const StyledPressable = styled(TouchableOpacity)<{ iconType: IconType }>`
    width: 64px;
    margin-left: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background-color: ${({ iconType }) => 
        iconType === 'delete' ? '#d11a2a' : '#0C860E'
    };
`;

const IconComponent = styled(MaterialCommunityIcons)`
    font-size: 24px;
    color: #e6e6e6;
`;