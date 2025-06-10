import { View, Text, TextInput } from "react-native";
import styled from "styled-components/native";

interface AddDeckScreenProps {
    title: string;
    setTitle: (title: string) => void;
}

const AddDeckScreen = (props: AddDeckScreenProps) => {
    return (
        <StyledView>
            <StyledTitle>Deck Title</StyledTitle>
            <StyledInput
                value={props.title}
                placeholder='Enter deck title'
                placeholderTextColor='#aaa'
                onChangeText={props.setTitle}
            />
        </StyledView>
    );
};

export default AddDeckScreen;

const StyledView = styled(View)`
    flex: 1;
    padding: 24px;
    background-color: #25292e;
`;

const StyledTitle = styled(Text)`
    margin-bottom: 8px;
    font-size: 18px;
    color: #e6e6e6;
`;

const StyledInput = styled(TextInput)`
    margin-bottom: 16px;
    height: 48px;
    border-radius: 12px;
    padding: 12px;
    font-size: 16px;
    background-color: #1a1c20;
    color: #fff;
`;