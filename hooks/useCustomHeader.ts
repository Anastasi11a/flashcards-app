import { createElement, useLayoutEffect } from "react";
import { useNavigation } from "expo-router";

import HeaderTitle from "@/ui/header/HeaderTitle";
import HeaderLeftButton from "@/ui/header/HeaderLeftButton";
import HeaderRightButton, { RightButtonProps} from "@/ui/header/HeaderRightButton";

interface CustomHeaderProps {
    title?: string | null;
    enabled?: boolean;
    headerTransparent?: boolean;
    headerBlurEffect?: 'regular';
    rightButton?: RightButtonProps;
}

const useCustomHeader = ({ 
    title, enabled = true, headerTransparent, headerBlurEffect, rightButton 
}: CustomHeaderProps) => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        if (!enabled || !title) return;
 
        navigation.setOptions({
            title: '',
            headerTransparent,
            headerBlurEffect,
            headerStyle: headerTransparent
                ? undefined
                : { backgroundColor: "#1a1c20" },
            headerBackTitleVisible: false,
            headerLeft: () => createElement(HeaderLeftButton),
            headerTitle: () => createElement(HeaderTitle, { title }),
            headerRight: rightButton
                ? () => createElement(HeaderRightButton, { ...rightButton })
                : undefined,
        });
    }, [ navigation, title, enabled, headerTransparent, headerBlurEffect, rightButton]);
};

export default useCustomHeader;