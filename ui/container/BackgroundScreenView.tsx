import { View, ViewProps } from "react-native";
import styled from "styled-components/native";

const BackgroundScreenView = ({ children, ...rest }: ViewProps) => {
    return <DeckListWrapper {...rest}>{children}</DeckListWrapper>;
};

export default BackgroundScreenView;

const DeckListWrapper = styled(View)`
    flex: 1;
    background-color: #1a1c20;
`;