import { View } from "react-native";
import styled from "styled-components/native";

interface Props {
    children: React.ReactNode;
}

const DeckTitleContainer = ({ children }: Props) => {
    return <InputContainer>{children}</InputContainer>;
};

export default DeckTitleContainer;

const InputContainer = styled(View)`
    border-radius: 10px;
    background-color: #25292e;
`;