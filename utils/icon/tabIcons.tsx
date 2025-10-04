import { Ionicons } from "@expo/vector-icons";

type IoniconName = keyof typeof Ionicons.glyphMap;

type TabIconProps = {
    color: string;
    focused: boolean;
    size: number;
};

export const tabIcon = (
    defaultIcon: IoniconName, 
    focusedIcon: IoniconName
) => {
    return ({ color, focused, size }: TabIconProps) => (
        <Ionicons
            name={focused ? focusedIcon : defaultIcon}
            color={color}
            size={size}
        />
    );
};