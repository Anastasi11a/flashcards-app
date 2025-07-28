import { Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from 'expo-linear-gradient';
import styled from "styled-components";

interface AddCardButtonProps {
    label: string;
    onPress: () => void;
}

const AddCardButton = ({ label, onPress }: AddCardButtonProps) => {
    return (
        <ButtonContainer onPress={onPress}>
            <GradientBackground colors={['#464C55', '#25282e', '#464C55']} />
            <BlurOverlay tint='light' intensity={20}>
                <StyledTextButton>{label}</StyledTextButton>
            </BlurOverlay>
        </ButtonContainer>
    );
};

export default AddCardButton;

const ButtonContainer = styled(TouchableOpacity)`
    position: relative;
    width: 100%;
    margin: 16px 0 0;
    border-radius: 24px;
    overflow: hidden;
    min-height: 48px;
`;

const GradientBackground = styled(LinearGradient)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 24px;
`;

const BlurOverlay = styled(BlurView)`
    width: 100%;
    height: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
    border-radius: 24px;
`;

const StyledTextButton = styled(Text)`
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #e6e6e6;
`;