import { Text, View, useWindowDimensions } from "react-native";
import styled from "styled-components/native";

import { titleText } from "@/constants/text/textStyles";

const HeaderTitle = ({ title }: { title: string }) => {
    const { width } = useWindowDimensions();

    return (
        <TitleContainer $maxWidth={width - 146}>
            <StyledTitle numberOfLines={2}>{title}</StyledTitle>
        </TitleContainer>
    );
};

export default HeaderTitle;

const TitleContainer = styled(View)<{ $maxWidth: number }>`
    align-items: center;
    justify-content: center;
    max-width: ${({ $maxWidth }) => $maxWidth}px;
`;

const StyledTitle = styled(Text)`
    ${titleText}
    text-align: center;
    line-height: 21px;
`;