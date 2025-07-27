import { View } from "react-native";
import styled from "styled-components/native";

interface AddCardsViewProps {
   children: React.ReactNode;
}

const AddCardsView = ({ children }: AddCardsViewProps) => {
    if (!children) return null;
    return <CardInputsWrapper>{children}</CardInputsWrapper>;
};

export default AddCardsView;

const CardInputsWrapper = styled(View)`
    padding: 20px 10px 10px;
    background-color: #1a1c20;
`;