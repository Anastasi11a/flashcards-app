import { View } from 'react-native';
import { Link } from 'expo-router';
import styled from 'styled-components';

export default function NotFoundScreen() {
    return (
        <StyledView>
            <StyledLink href='/'>Go back to Home screen!</StyledLink>
        </StyledView>
    );
}

const StyledView = styled(View)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    justify-content: center;
    align-items: center;
`;

const StyledLink = styled(Link)`
    font-size: 20px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
`;