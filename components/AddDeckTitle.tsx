import { View, TextInput } from "react-native";
import styled from "styled-components/native";

import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import StyledKeyboardAvoidingView from "@/ui/StyledKeyboardAvoidingView";

interface AddDeckTitleProps {
    title: string;
    setTitle: (title: string) => void;
}

const AddDeckTitle = (props: AddDeckTitleProps) => {
    const inputRef = useKeyboardVisibility();

    return (
        <StyledKeyboardAvoidingView>
            <StyledView>
                <StyledInput
                    ref={inputRef}
                    value={props.title}
                    placeholder='Enter deck title'
                    onChangeText={props.setTitle}
                />
            </StyledView>
        </StyledKeyboardAvoidingView>
    );
};

export default AddDeckTitle;

const StyledView = styled(View)`
    flex: 1;
    padding: 20px 10px;
    background-color: #25292e;
`;

const StyledInput = styled(TextInput).attrs({
    placeholderTextColor: '#808080',
    selectionColor: '#aaa',
})`
    margin-bottom: 16px;
    height: 48px;
    border-radius: 12px;
    padding: 12px;
    font-size: 16px;
    background-color: #1a1c20;
    color: #e6e6e6;
`;