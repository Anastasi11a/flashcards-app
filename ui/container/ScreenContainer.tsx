import { View, KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components/native";

interface Props {
    children: React.ReactNode;
    padded?: boolean;
}

export const ScreenContainer = ({ children, padded = false }: Props) => {
    return <Container padded={padded}>{children}</Container>
};

export const KeyboardScreenContainer = ({ children, padded = true }: Props) => {
    return (
        <Container
            as={KeyboardAvoidingView}  
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            padded={padded}
        >
            {children}
        </Container>
    );
};

const Container = styled(View)<{ padded: boolean }>`
    flex: 1;
    padding: ${({ padded }) => (padded ? '20px 10px 10px' : '0')};
    background-color: #1a1c20;
`;