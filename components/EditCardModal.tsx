import StyledModal from "./StyledModal";
import InputField from "./InputField";
import { AnswerInput, QuestionInput, Divider } from "@/ui/CardInputFields";

interface EditCardModalProps { 
    visible: boolean;
    question: string;
    answer: string;
    onChangeQuestion: (text: string) => void;
    onChangeAnswer: (text: string) => void;
    onSave: () => void;
    onClose: () => void;
}

const EditCardModal = (props: EditCardModalProps) => {
    return (
        <StyledModal
            visible={props.visible} 
            onSave={props.onSave} 
            onClose={props.onClose}>

            <InputField
                text={props.question}
                InputComponent={QuestionInput}
                maxLengthHint={75}
                onChangeText={props.onChangeQuestion}
            />
            <Divider />
            <InputField
                text={props.answer}
                InputComponent={AnswerInput}
                onChangeText={props.onChangeAnswer}
            />
        </StyledModal>
    );
};

export default EditCardModal;