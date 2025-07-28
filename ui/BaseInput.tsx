import { TextInput } from "react-native";
import styled from "styled-components/native";

const BaseInput = styled(TextInput).attrs({
    placeholderTextColor: "#808080",
    selectionColor: "#aaa",
})`
    padding: 12px 16px;
    line-height: 22px;
    letter-spacing: 0.4px;
    text-align-vertical: top;
`;

export default BaseInput;