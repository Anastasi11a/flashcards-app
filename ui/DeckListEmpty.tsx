import { View, Text } from "react-native";
import styled from "styled-components/native";

interface Props {
    children: React.ReactNode;
}

const DeckListEmpty = ({ children }: Props) => (
    <StyledContainer>
        <StyledMessage>{children}</StyledMessage>
    </StyledContainer>
);

export default DeckListEmpty;

const StyledContainer = styled(View)`
    padding: 20px;
    align-items: center;
    justify-content: center;
`;

const StyledMessage = styled(Text)`
    text-align: center;
    color: #aaaaaa;
`