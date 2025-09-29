import { LinearGradient } from 'expo-linear-gradient';
import styled from "styled-components/native";

interface Props {
    children: React.ReactNode;
    padded?: boolean;
}

const GradientContainer = ({ children, padded = false }: Props) => {
    return (
        <GradientOverlay 
            padded={padded} 
            colors={['#2f343a', '#25292e']}
        >
            {children}
        </GradientOverlay>
    );
};

export default GradientContainer;

const GradientOverlay = styled(LinearGradient)<{ padded: boolean }>`
    padding: ${({ padded }) => (padded ? '10px 12px 8px' : '0')};
    border-radius: 10px;
    overflow: hidden;
`;