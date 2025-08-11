import { Text } from "react-native";
import styled from "styled-components/native";

interface HeaderTitleStyleProps {
    title: string;
}
const HeaderTitleStyle = ({ title }: HeaderTitleStyleProps) => (
    <StyledTitle>{title}</StyledTitle>
);

export default HeaderTitleStyle;

const StyledTitle = styled(Text)`
    margin-top: 10px;
    margin-start: 24px;
    font-size: 28px;
    font-weight: bold;
    color: #0a7ea4;
`;