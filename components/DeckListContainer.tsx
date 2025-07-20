import { View, ViewProps } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import styled from "styled-components/native";

const DeckListContainer = ({ children, ...rest }: ViewProps) => {
    const headerHeight = useHeaderHeight();
    const paddingTop = headerHeight;

    return (
        <DeckListWrapper paddingTop={paddingTop} {...rest}>
            {children}
        </DeckListWrapper>
    );
};

export default DeckListContainer;

const DeckListWrapper = styled(View)<{ paddingTop: number }>`
    flex: 1;
    padding-top: ${({ paddingTop }) => paddingTop}px;
    background-color: #1a1c20;
`;