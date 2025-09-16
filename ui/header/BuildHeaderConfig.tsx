import { Text } from "react-native";
import styled from "styled-components/native";

import BlurBackground from "@/ui/background/BlurBackground";
import { headerStyle } from "@/utils/navigationStyles";

export type ScreenHeaderOptions = {
    title: string;
    rightComponent?: React.ReactNode;
};

export const buildHeaderConfig = ({ title, rightComponent }: ScreenHeaderOptions) => ({
    headerTitle: () => <StyledTitle>{title}</StyledTitle>,
    headerTitleAlign: 'left' as const,
    headerTransparent: true,
    headerStyle,
    headerBackground: () => <BlurBackground />,
    headerRight: rightComponent ? () => rightComponent : undefined,
});

const StyledTitle = styled(Text)`
    margin-top: 10px;
    margin-start: 10px;
    font-size: 28px;
    font-weight: 500;
    letter-spacing: 0.3px;
    color: #0a7ea4;
`;