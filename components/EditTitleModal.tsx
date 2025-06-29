import InputField from "./InputField";
import StyledModal from "./StyledModal";
import { QuestionInput } from "@/ui/CardInputFields";

interface EditTitleModalProps { 
    visible: boolean;
    title: string;
    onChangeTitle: (text: string) => void;
    onSave: () => void;
    onClose: () => void;
    maxLengthHint?: number;
}

const EditTitleModal = (props: EditTitleModalProps) => {
    return (
        <StyledModal 
            visible={props.visible} 
            onSave={props.onSave} 
            onClose={props.onClose}>
                
            <InputField
                text={props.title}
                placeholder='Edit deck title'
                onChangeText={props.onChangeTitle}
                InputComponent={QuestionInput}
                maxLengthHint={props.maxLengthHint}
            />
        </StyledModal>
    );
};

export default EditTitleModal;