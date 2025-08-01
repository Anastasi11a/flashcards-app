import { View, Text } from "react-native";
import styled from "styled-components/native";

const DeckListEmpty = () => (
    <StyledContainer>
        <StyledMessage>
            No cards yet. Start by adding one!
        </StyledMessage>
    </StyledContainer>
);

export default DeckListEmpty;

const StyledContainer = styled(View)`
    padding: 20px;
`;

const StyledMessage = styled(Text)`
    text-align: center;
    color: #aaaaaa;
`