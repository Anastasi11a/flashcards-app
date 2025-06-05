import { Text, View } from 'react-native';
import styled from 'styled-components';

export default function AboutScreen() {
    return (
        <StyledView>
            <StyledText>About screen</StyledText>
        </StyledView>
    );
}

const StyledView = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: '#25292e';
`;

const StyledText = styled(Text)`
    color: #808080;
`;