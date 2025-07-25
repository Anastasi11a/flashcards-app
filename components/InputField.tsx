import InputWrapper, { InputWrapperProps } from "@/ui/InputWrapper";
import QuestionInput from "@/ui/QuestionInput";

const InputField = ({ 
    inputRef, value, placeholder, maxLengthHint, InputComponent, onChangeText
}: InputWrapperProps) => {
    const refToUse = InputComponent === QuestionInput ? inputRef : undefined;

    return (
        <InputWrapper
            inputRef={refToUse}
            value={value}
            placeholder={placeholder}
            maxLengthHint={maxLengthHint}
            InputComponent={InputComponent}
            onChangeText={onChangeText}
        />
    );
};

export default InputField;