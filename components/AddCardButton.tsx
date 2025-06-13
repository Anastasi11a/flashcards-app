import { Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import styled from "styled-components";

interface AddCardButtonProps {
    label: string;
    onPress: () => void;
}

const AddCardButton = (props: AddCardButtonProps) => {
    return (
        <ButtonContainer onPress={props.onPress}>
            <StyledTouchable>
                <StyledTextButton>{props.label}</StyledTextButton>
            </StyledTouchable>
        </ButtonContainer>
    );
};

export default AddCardButton;

const ButtonContainer = styled(TouchableOpacity)`
    margin: 16px 0;
    border-radius: 24px;
    overflow: hidden;
`;

const StyledTouchable = styled(BlurView).attrs({
    tint: 'light',
    intensity: 50,
})`
    padding: 12px 0;
    align-items: center;
    justify-content: center;
`;

const StyledTextButton = styled(Text)`
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #e6e6e6;
`;