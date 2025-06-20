import { View, Modal } from "react-native";
import styled from "styled-components";

import RowButton from "@/components/RowButton";
import { InputWrapper, AnswerInput, QuestionInput, Divider } from "@/ui/CardInputFields";

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
        <Modal 
            transparent 
            visible={props.visible} 
            animationType='fade' 
            onRequestClose={props.onClose}>
            <ModalContainer>
                <InputWrapper>
                    <QuestionInput
                        value={props.question}
                        placeholder='Edit question'
                        onChangeText={props.onChangeQuestion}
                    />
                    <Divider />
                    <AnswerInput
                        value={props.answer}
                        placeholder='Edit answer'
                        onChangeText={props.onChangeAnswer}
                    />
                </InputWrapper>

                <ButtonContainer>
                    <RowButton buttonName='cancel' onPress={props.onClose} />
                    <RowButton buttonName='save' onPress={props.onSave} />
                </ButtonContainer> 
            </ModalContainer>
        </Modal>
    );
};

export default EditCardModal;

const ModalContainer = styled(View)`
    flex: 1;
    justify-content: center;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.8);
`;

const ButtonContainer = styled(View)`
    flex-direction: row;
    justify-content: center;
    margin-top: 42px;
    gap: 24px;
`;