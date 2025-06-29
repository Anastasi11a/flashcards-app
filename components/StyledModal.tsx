import { View, Modal, ScrollView } from "react-native";
import styled from "styled-components";

import RowButton from "@/components/RowButton";
import StyledKeyboardAvoidingView from "@/ui/StyledKeyboardAvoidingView";
import { StyledInputWrapper } from "@/ui/CardInputFields";

interface StyledModalProps { 
    children: React.ReactNode;
    visible: boolean;
    onSave: () => void;
    onClose: () => void;
}

const StyledModal = (props: StyledModalProps) => {
    return (
        <Modal 
            transparent 
            visible={props.visible} 
            animationType='fade' 
            onRequestClose={props.onClose}>
                
            <StyledKeyboardAvoidingView>
                <StyledScrollView>
                    <ModalContainer>
                        <StyledInputWrapper>{props.children}</StyledInputWrapper>
                        <ButtonContainer>
                            <RowButton buttonName="cancel" onPress={props.onClose} />
                            <RowButton buttonName="save" onPress={props.onSave} />
                        </ButtonContainer> 
                    </ModalContainer>
                </StyledScrollView>
            </StyledKeyboardAvoidingView>
        </Modal>
    );
};

export default StyledModal;

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