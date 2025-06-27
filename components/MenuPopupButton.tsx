import { Text, View, Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface MenuOptionProps {
    label?: string;
    icon?: React.ReactNode;
    onPress?: () => void;
}

interface MenuPopupProps {
    isVisible?: boolean;
    buttons: MenuOptionProps[];
    onClose?: () => void;
}

const MenuPopupButton = (props: MenuPopupProps) => {
    return (
        <Modal
            transparent 
            visible={props.isVisible} 
            animationType='fade' 
            onRequestClose={props.onClose}>

            <Overlay onStartShouldSetResponder={() => (props.onClose?.(), true)}>
                <StyledMenuView>
                    {props.buttons.map((btn, i) => (
                        <StyledPressable key={i} onPress={btn.onPress}>
                            {btn.icon && <IconWrapper>{btn.icon}</IconWrapper>}
                            <Label>{btn.label}</Label>
                        </StyledPressable>
                    ))}
                </StyledMenuView>
            </Overlay>
        </Modal>
    );
};

export default MenuPopupButton;

const Overlay = styled(View)`
    flex: 1;
    justify-content: flex-start;
    align-items: flex-end;
    background-color: rgba(0, 0, 0, 0.7);
`;

const StyledMenuView = styled(View)`
    flex-grow: 0;
    align-items: stretch;
    margin: 110px 10px 0 0;
    padding: 14px;
    border-radius: 16px;
    background-color: #25292e;
`;

const StyledPressable = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    padding: 12px;
`;

const IconWrapper = styled(View)`
    margin-right: 8px;
`;

const Label = styled(Text)`
    font-size: 16px;
    color: #e6e6e6;
`;