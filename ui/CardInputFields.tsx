import { View, Text, TextInput, Pressable, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import StyledKeyboardAvoidingView from "./StyledKeyboardAvoidingView";

export const ScreenView = styled(View)`
    position: relative;
    flex: 1;
    padding: 16px 10px;
    background-color: #1a1c20;
`;

export const DeckContainer = styled(Pressable)`
    padding: 12px 16px;
    border-radius: 10px;
    background-color: #25292e;
`;

export const DeckTitle = styled(Text)`
    font-size: 18px;
    font-weight: bold;
    color: #0a7ea4;
`;

export const HeaderButtonContainer = styled(View)`
    flex-direction: row;
    margin-right: 12px;
    gap: 12px;    
`;

//
export const StyledView = styled(StyledKeyboardAvoidingView)`
    padding: 16px 10px 0;
`;

export const StyledEAddScreenView = styled(View)`
    padding: 20px 10px 10px;
    background-color: #1a1c20;
`;

export const StyledAddCardView = styled(View)`
    padding-horizontal: 10px;
    margin-top: 20px;
`;

export const StyledInput = styled(TextInput).attrs({
    placeholderTextColor: '#808080',
    selectionColor: '#aaa',
})`
    padding: 12px 16px;
    line-height: 22px;
    letter-spacing: 0.4px;
    text-align-vertical: top;
`; 

export const QuestionInput = styled(StyledInput)`
    font-size: 18px;
    font-weight: bold;
    color: #0a7ea4;
`;

export const AnswerInput = styled(StyledInput)`
    font-size: 16px;
    color: #e6e6e6;
`;

export const InputWrapper = styled(View)`
    border-radius: 16px;
    background-color: #25292e;
`;

export const StyledInputWrapper = styled(InputWrapper)`
    margin-top: 30px;
`;

export const Divider = styled(View)`
    width: 92%;
    height: 1px;
    align-self: center;
    background-color: #1a1c20;
`;

export const HintText = styled(Text)`
    margin: 4px 16px;
    font-size: 12px;
    font-style: italic;
    color: #aaaaaa;
`;

export const HintCounter = styled(Text)`
    align-self: flex-end;
    padding-top: 4px;
    margin-bottom: -12px;
    margin-right: 16px;
    font-size: 12px;
    font-style: italic;
    color: #aaaaaa;
`;

export const InputContainer = styled(View)`
    position: relative;
    padding-right: 20px;
`;

export const StyledClearButton = styled(View)`
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-10px);
`;

// Swipe Button
export const StyledPressable = styled(TouchableOpacity)`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

export const StyledIcon = styled(MaterialCommunityIcons)`
    font-size: 24px;
    color: #e6e6e6;
`;

export const ButtonRowContainer = styled(View)`
    flex-direction: row;
`;

// Gradient
export const GradientOverlay = styled(LinearGradient)`
    width: 46px;
    height: 46px;
    border-radius: 16px;
    justify-content: center;
    align-items: center;
`;

export const GradientSwipeButtonWrapper = styled(LinearGradient)`
    width: 64px;
    margin-left: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;