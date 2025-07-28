import { TextInputProps } from "react-native";
import styled from "styled-components/native";

import BaseInput from "./BaseInput";

const AnswerInput = (props: TextInputProps) => {
    return <StyledAnswerInput {...props} />;
};

export default AnswerInput;

const StyledAnswerInput = styled(BaseInput)`
    font-size: 16px;
    color: #e6e6e6;
`;