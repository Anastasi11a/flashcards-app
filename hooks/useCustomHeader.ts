import { createElement, useLayoutEffect } from "react";
import { useNavigation } from "expo-router";

import HeaderTitle from "@/ui/header/HeaderTitle";
import HeaderLeftButton, { LeftButtonProps } from "@/ui/header/HeaderLeftButton";
import HeaderRightButton, { RightButtonProps} from "@/ui/header/HeaderRightButton";

interface CustomHeaderProps {
    title?: string | null;
    enabled?: boolean;
    headerTransparent?: boolean;
    headerBlurEffect?: 'regular';
    leftButton?: LeftButtonProps | (() => React.ReactNode);
    rightButton?: RightButtonProps | (() => React.ReactNode);
}

const useCustomHeader = ({ 
    title, enabled = true, headerTransparent, headerBlurEffect, leftButton, rightButton 
}: CustomHeaderProps) => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        if (!enabled || !title) return;

        const headerLeft = typeof leftButton === "function"
            ? leftButton
            : leftButton != null
            ? () => createElement(HeaderLeftButton, {...(leftButton as LeftButtonProps)})
            : undefined;
 
        navigation.setOptions({
            title: '',
            headerTransparent,
            headerBlurEffect,
            headerStyle: headerTransparent
                ? undefined
                : { backgroundColor: "#1a1c20" },
            headerBackTitleVisible: false,
            headerLeft: headerLeft ? headerLeft : () => createElement(HeaderLeftButton),
            headerTitle: () => createElement(HeaderTitle, { title }),
            headerRight: rightButton
                ? typeof rightButton === 'function'
                    ? rightButton
                    : () => createElement(HeaderRightButton, { ...rightButton })
                : undefined,
        });
    }, [ 
        navigation, 
        title, 
        enabled, 
        headerTransparent, 
        headerBlurEffect, 
        leftButton, 
        rightButton
    ]);
};

export default useCustomHeader;