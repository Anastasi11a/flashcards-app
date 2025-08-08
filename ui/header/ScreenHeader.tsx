import HeaderTitleStyle from "@/ui/header/HeaderTitleStyle";
import BlurBackground from "@/ui/BlurBackground";
import { headerStyle } from "@/utils/navigationStyles";

export type ScreenHeaderOptions = {
    title: string;
    rightComponent?: React.ReactNode;
};

export const createScreenHeader = ({ title, rightComponent }: ScreenHeaderOptions) => ({
    headerTitle: () => <HeaderTitleStyle title={title} />,
    headerTitleAlign: "left" as const,
    headerTransparent: true,
    headerStyle,
    headerBackground: () => <BlurBackground />,
    headerRight: rightComponent ? () => rightComponent : undefined,
});