import { TextInput } from "react-native";

import InputField from "./InputField";
import { AnswerInput, Divider, InputWrapper } from "@/ui/CardInputFields";
import QuestionInput from "@/ui/QuestionInput";

interface CardInputsProps {
    inputRef?: React.Ref<TextInput>;
    question: string;
    answer: string;
    onChangeQuestion: (text: string) => void;
    onChangeAnswer: (text: string) => void;
}

const CardInputs = ({ 
    inputRef, question, answer, onChangeQuestion, onChangeAnswer
}: CardInputsProps) => {
    return (        
        <InputWrapper>
            <InputField
                inputRef={inputRef}
                value={question}
                InputComponent={QuestionInput}
                placeholder='Type a question or something else'
                maxLengthHint={75}
                onChangeText={onChangeQuestion}
            />
            <Divider />
            <InputField
                value={answer}
                InputComponent={AnswerInput}
                placeholder='Type a description or something else'
                onChangeText={onChangeAnswer}
            />
        </InputWrapper>
    );
};

export default CardInputs;