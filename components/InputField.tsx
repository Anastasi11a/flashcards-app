import InputWrapper, { InputWrapperProps } from "@/ui/InputWrapper";
import QuestionInput from "@/ui/QuestionInput";

const InputField = (props: InputWrapperProps) => {
    const { inputRef, InputComponent } = props;
    const refToUse = InputComponent === QuestionInput ? inputRef : undefined;

    return (
        <InputWrapper
            {...props}
            inputRef={refToUse}
        />
    );
};

export default InputField;