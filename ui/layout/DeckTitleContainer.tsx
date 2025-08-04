import { View } from "react-native";
import styled from "styled-components/native";

interface DeckTitleInputProps {
    children: React.ReactNode;
}

const DeckTitleContainer = ({ children }: DeckTitleInputProps) => {
    return <InputContainer>{children}</InputContainer>;
};

export default DeckTitleContainer;

const InputContainer = styled(View)`
    border-radius: 16px;
    background-color: #25292e;
`;