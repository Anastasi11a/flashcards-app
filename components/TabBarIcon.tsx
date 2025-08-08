import { Ionicons } from "@expo/vector-icons";

export type IoniconName = keyof typeof Ionicons.glyphMap;

export type TabIconProps = {
    color: string;
    focused: boolean;
    size: number;
};

const createTabIcon = (defaultIcon: IoniconName, focusedIcon: IoniconName) => {
    return ({ color, focused, size }: TabIconProps) => (
        <Ionicons
            name={focused ? focusedIcon : defaultIcon}
            color={color}
            size={size}
        />
    );
};

export default createTabIcon;