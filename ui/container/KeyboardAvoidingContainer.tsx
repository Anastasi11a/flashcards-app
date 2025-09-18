import { KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components/native";

interface Props  {
    children: React.ReactNode;
}

const KeyboardAvoidingContainer = ({ children }: Props ) => {
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {children}
        </Container>
    );
};

export default KeyboardAvoidingContainer;

const Container = styled(KeyboardAvoidingView)`
    flex: 1;
    background-color: #1a1c20;
`;