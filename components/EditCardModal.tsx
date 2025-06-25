import { View, Modal, ScrollView } from "react-native";
import styled from "styled-components";

import InputField from "./InputField";
import RowButton from "@/components/RowButton";
import StyledKeyboardAvoidingView from "@/ui/StyledKeyboardAvoidingView";
import { StyledInputWrapper, AnswerInput, QuestionInput, Divider } from "@/ui/CardInputFields";

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
            <StyledKeyboardAvoidingView>
                <StyledScrollView>
                    <ModalContainer>
                        <StyledInputWrapper>
                            <InputField
                                text={props.question}
                                InputComponent={QuestionInput}
                                onChangeText={props.onChangeQuestion}
                            />
                            <Divider />
                            <InputField
                                text={props.answer}
                                InputComponent={AnswerInput}
                                onChangeText={props.onChangeAnswer}
                            />
                        </StyledInputWrapper>

                        <ButtonContainer>
                            <RowButton buttonName='cancel' onPress={props.onClose} />
                            <RowButton buttonName='save' onPress={props.onSave} />
                        </ButtonContainer> 
                    </ModalContainer>
                </StyledScrollView>
            </StyledKeyboardAvoidingView>
        </Modal>
    );
};

export default EditCardModal;

const ModalContainer = styled(View)`
    flex: 1;
    justify-content: center;
    padding: 16px 10px;
    background-color: rgba(0, 0, 0, 0.7);
`;

const StyledScrollView = styled(ScrollView).attrs(() => ({
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'center',
    },
}))`
    flex: 1;
`;

const ButtonContainer = styled(View)`
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
    gap: 24px;
`;