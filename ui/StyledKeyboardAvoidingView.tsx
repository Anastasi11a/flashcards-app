import { KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components/native";

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView).attrs(() => ({
    behavior: Platform.OS === 'ios' ? 'padding' : 'height',
}))`
    flex: 1;
    background-color: #1a1c20;
`;

export default StyledKeyboardAvoidingView;