import { Text } from "react-native";
import styled from "styled-components/native";

interface Props {
    count: number;
    max: number;
}

const FolderTitleCounter = ({ count, max }: Props) => {
    return <CounterText>{count}/{max} characters</CounterText>;
};

export default FolderTitleCounter;

const CounterText = styled(Text)`
    margin-top: 6px;
    margin-left: 4px;
    font-size: 12px;
    color: #aaaaaa;
`;