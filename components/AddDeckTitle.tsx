import { View, Text, TextInput } from "react-native";
import styled from "styled-components/native";

interface AddDeckTitleProps {
    title: string;
    setTitle: (title: string) => void;
}

const AddDeckTitle = (props: AddDeckTitleProps) => {
    return (
        <StyledView>
            <StyledInput
                value={props.title}
                placeholder='Enter deck title'
                onChangeText={props.setTitle}
            />
        </StyledView>
    );
};

export default AddDeckTitle;

const StyledView = styled(View)`
    flex: 1;
    padding: 20px 10px;
    background-color: #25292e;
`;

const StyledInput = styled(TextInput).attrs({
    placeholderTextColor: '#aaa',
})`
    margin-bottom: 16px;
    height: 48px;
    border-radius: 12px;
    padding: 12px;
    font-size: 16px;
    background-color: #1a1c20;
    color: #fff;
`;