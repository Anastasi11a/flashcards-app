import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { StyledInput } from "./CardInputFields";

const QuestionInput = forwardRef<TextInput, TextInputProps>((props, ref) => (
    <StyledInput
        ref={ref}
        style={{ 
            fontSize: 18, 
            fontWeight: "bold", 
            color: "#0a7ea4" 
        }}
        {...props}
    />
));

export default QuestionInput;