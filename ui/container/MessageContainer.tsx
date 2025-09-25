import { View, Text } from "react-native";
import styled from "styled-components/native";

const MessageContainer = ({ children }: { children: React.ReactNode }) => (
    <StyledContainer>
        <StyledMessage>{children}</StyledMessage>
    </StyledContainer>
);

export default MessageContainer;

const StyledContainer = styled(View)`
    padding: 20px;
    align-items: center;
    justify-content: center;
`;

const StyledMessage = styled(Text)`
    text-align: center;
    color: #aaaaaa;
`