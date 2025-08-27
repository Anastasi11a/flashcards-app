import { Text, TouchableOpacity,StyleProp, TextStyle } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

export interface RightButtonProps {
    onPress: () => void;
    label?: string;
    iconName?: keyof typeof SimpleLineIcons.glyphMap;
    textStyle?: StyleProp<TextStyle>;
}

const HeaderRightButton = ({ onPress, label, iconName, textStyle }: RightButtonProps) => {
    return (
        <TouchableOpacity hitSlop={12} onPress={onPress}>
            {iconName ? (
                <SimpleLineIcons name={iconName} size={18} color='#808080' />
            ) : (
                <StyledLabel style={textStyle}>{label}</StyledLabel>
            )}
        </TouchableOpacity>
    );
};

export default HeaderRightButton;

const StyledLabel = styled(Text)` 
    margin-right: 10px;
    padding-horizontal: 3px;
    font-size: 20px;
    font-weight: bold;
    color: #0a7ea4;
`;