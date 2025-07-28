import { KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components/native";

interface KeyboardBehaviorProps  {
    children: React.ReactNode;
}

const KeyboardBehavior = ({ children }: KeyboardBehaviorProps ) => {
    return (
        <KeyboardAvoidingViewStyled 
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
                
            {children}
        </KeyboardAvoidingViewStyled>
    );
};

export default KeyboardBehavior;

const KeyboardAvoidingViewStyled = styled(KeyboardAvoidingView)`
    flex: 1;
    background-color: #1a1c20;
`;