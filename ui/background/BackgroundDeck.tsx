import { LinearGradient } from 'expo-linear-gradient';
import styled from "styled-components/native";

interface Props {
    children: React.ReactNode;
}
const BackgroundDeck = ({ children }: Props) => {
    return (
        <GradientOverlay colors={['#2f343a', '#25292e']}>
            {children}
        </GradientOverlay>
    );
};

export default BackgroundDeck;

const GradientOverlay = styled(LinearGradient)`
    padding: 10px 12px 8px;
    border-radius: 10px;
    overflow: hidden;
`;