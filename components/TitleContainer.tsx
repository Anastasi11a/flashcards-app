import { View, KeyboardAvoidingView, Platform } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import styled from "styled-components/native";

interface TitleContainerProps {
    children: React.ReactNode;
    withHeaderPadding?: boolean;
}

const TitleContainer = ({ children, withHeaderPadding = false }: TitleContainerProps) => {
    const headerHeight = useHeaderHeight();
    const paddingTop = withHeaderPadding ? headerHeight + 16 : 16;

    return (
        <KeyboardAvoidingViewStyled behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ContentWrapper paddingTop={paddingTop}>
                {children}
            </ContentWrapper>
        </KeyboardAvoidingViewStyled>
    );
};

export default TitleContainer;

const KeyboardAvoidingViewStyled = styled(KeyboardAvoidingView)`
    flex: 1;
    background-color: #1a1c20;
`;

const ContentWrapper = styled(View)<{ paddingTop: number }>`
    flex: 1;
    padding-top: ${({ paddingTop }) => `${paddingTop}px`};
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0px;
`;