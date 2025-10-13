import React, { Fragment } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

interface MenuOptionProps {
    isDestructive?: boolean;
    label?: string;
    icon?: React.ReactNode;
    onPress?: () => void;
}

interface Props {
    isVisible?: boolean;
    buttons: MenuOptionProps[];
    onClose?: () => void;
}

const MenuPopupButton = ({ isVisible, buttons, onClose }: Props) => {
    return (
        <Modal
            transparent
            visible={isVisible}
            animationType='fade'
            onRequestClose={onClose}>

            <Overlay onStartShouldSetResponder={() => (onClose?.(), true)}>
                <StyledMenuView>
                    {buttons.map((btn, i) => (
                        <Fragment key={btn.label ?? i}>
                            <StyledPressable
                                onPress={() => {
                                    onClose?.();
                                    btn.onPress?.();
                                }}>
                                    
                                <Label $destructive={btn.isDestructive}>
                                    {btn.label}
                                </Label>
                                {btn.icon}
                            </StyledPressable>
                            {i < buttons.length - 1 && <Divider />}
                        </Fragment>
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
    width: 240px;
    margin: 110px 10px 0 0;
    padding-vertical: 6px;
    border-radius: 12px;
    background-color: #25292e;
`;

const StyledPressable = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
`;

const Label = styled(Text)<{ $destructive?: boolean }>`
    flex: 1;
    font-size: 18px;
    color: ${({ $destructive }) => ($destructive ? "#ff4d4f" : "#e6e6e6")};
`;

const Divider = styled(View)`
    width: 90%;
    align-self: center;
    height: 0.6px;
    background-color: #808080;
`;