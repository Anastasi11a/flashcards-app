import { KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components/native";

interface ScreenContainerProps {
    children: React.ReactNode;
}

const ScreenContainer = ({ children }: ScreenContainerProps) => {
    return (
        <KeyboardView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {children}
        </KeyboardView>
    );
};

export default ScreenContainer;

const KeyboardView = styled(KeyboardAvoidingView)`
    flex: 1;
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    background-color: #1a1c20;
`;