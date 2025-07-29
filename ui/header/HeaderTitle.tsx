import { Text, View, Dimensions } from "react-native";
import styled from "styled-components/native";

interface Props {
    title: string;
}

const HeaderTitle = ({ title }: Props) => {
    const screenWidth = Dimensions.get('window').width;

    return (
        <TitleContainer style={{ maxWidth: screenWidth - 146 }}>
            <StyledTitle numberOfLines={2}>{title}</StyledTitle>
        </TitleContainer>
    );
};

export default HeaderTitle;

const TitleContainer = styled(View)`
    align-items: center;
    justify-content: center;
`;

const StyledTitle = styled(Text)`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    line-height: 22px;
    letter-spacing: 0.4px;
    color: #e6e6e6;
`;