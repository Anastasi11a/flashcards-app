import { KeyboardAvoidingView, Platform } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import styled from "styled-components/native";

interface ScreenContainerProps {
    children: React.ReactNode;
    withHeaderPadding?: boolean;
}

const ScreenContainer = ({ 
    children, withHeaderPadding = false 
}: ScreenContainerProps) => {
    const headerHeight = useHeaderHeight();
    const paddingTop = withHeaderPadding ? headerHeight + 16 : 20;

    return (
        <KeyboardView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            paddingTop={paddingTop}>

            {children}
        </KeyboardView>
    );
};

export default ScreenContainer;

const KeyboardView = styled(KeyboardAvoidingView)<{ paddingTop: number }>`
    flex: 1;
    padding-top: ${({ paddingTop }) => `${paddingTop}px`};
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    background-color: #1a1c20;
`;