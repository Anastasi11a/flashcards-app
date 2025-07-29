import {  
    Text, 
    TouchableOpacity,
    StyleProp, 
    ViewStyle, 
    TextStyle 
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

export interface HeaderRightButtonProps {
    onPress: () => void;
    label?: string;
    iconName?: keyof typeof SimpleLineIcons.glyphMap;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const HeaderRightButton = ({ 
    onPress, label, iconName, style, textStyle 
}: HeaderRightButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={style}
            hitSlop={{ top: 10, bottom: 10, left: 20, right: 10 }}>

            {iconName ? (
                <SimpleLineIcons name={iconName} size={18} color="#808080" />
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