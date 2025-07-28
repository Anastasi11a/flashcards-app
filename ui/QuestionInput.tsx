import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";

import BaseInput from "./BaseInput";

const QuestionInput = forwardRef<TextInput, TextInputProps>((props, ref) => (
    <StyledQuestionInput ref={ref} {...props} />
));

export default QuestionInput;

const StyledQuestionInput = styled(BaseInput)`
    font-size: 18px;
    font-weight: bold;
    color: #0a7ea4;
`; 