import { Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from 'expo-linear-gradient';
import styled from "styled-components";

interface AddCardButtonProps {
    label: string;
    onPress: () => void;
}

const AddCardButton = (props: AddCardButtonProps) => {
    return (
        <ButtonContainer onPress={props.onPress}>
            <GradientOverlay colors={['#464C55', '#25282e', '#464C55']}>
                <StyledTouchable>
                    <StyledTextButton>{props.label}</StyledTextButton>
                </StyledTouchable>
            </GradientOverlay>
        </ButtonContainer>
    );
};

export default AddCardButton;

const ButtonContainer = styled(TouchableOpacity)`
    margin: 16px 0 0;
    border-radius: 24px;
    overflow: hidden;
`;

const StyledTouchable = styled(BlurView).attrs({
    tint: 'light',
    intensity: 30,
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

const GradientOverlay = styled(LinearGradient)`
    align-items: center,
`;