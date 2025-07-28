import { View } from "react-native";
import styled from "styled-components/native";

interface CardContainerProps {
    children: React.ReactNode;
}

const CardContainer = ({ children }: CardContainerProps) => {
    return <CardInputsWrapper>{children}</CardInputsWrapper>;
};

export default CardContainer;

const CardInputsWrapper = styled(View)`
    padding: 20px 10px 10px;
    background-color: #1a1c20;
`;