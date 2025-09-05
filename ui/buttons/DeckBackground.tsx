import { ViewProps } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import styled from "styled-components";

const DeckBackground = ({ children }: ViewProps) => {
    return (
        <GradientOverlay colors={['#353c48', '#1c1f26']}>
            {children}
        </GradientOverlay>
    );
};

export default DeckBackground;

const GradientOverlay = styled(LinearGradient)`
    padding: 10px 12px 8px;
    border-radius: 10px;
    overflow: hidden;
`;