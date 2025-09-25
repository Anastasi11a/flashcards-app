import { BlurView } from "expo-blur";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

import { BUTTON_LABEL } from "@/constants/colors/gradient";
import GradientButton, { ButtonIconProps } from "./GradientButton";

interface Props extends ButtonIconProps {
    key: string;
    label: string;
    disabled?: boolean;
}

const FolderActionButtons = ({ 
    insets, buttons 
}: { 
    insets: { bottom: number };
    buttons: Props[];
}) => {
    return (
        <BarWrapper paddingBottomInset={insets.bottom}>
            <ButtonsRow>
                {buttons.map(
                    ({ key, label, disabled, ...buttonProps }) => (
                        <ActionButton 
                            key={key} 
                            disabled={disabled} 
                            onPress={buttonProps.onPress}
                        >
                            <GradientButton
                                {...buttonProps}
                                containerSize={38}
                                borderRadius={10}
                            />
                            <BtnLabel $disabled={disabled}>{label}</BtnLabel>
                        </ActionButton>
                    )
                )}
            </ButtonsRow>
        </BarWrapper>
    );
};

export default FolderActionButtons;

const BarWrapper = styled(BlurView).attrs({
    intensity: 20,
    tint: 'dark',
})<{ paddingBottomInset: number }>`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding-horizontal: 10px;
    padding-bottom: ${({ paddingBottomInset }) => paddingBottomInset}px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    overflow: hidden;
`;

const ButtonsRow = styled(View)`
    gap: 10px;
    flex-direction: row;
    justify-content: space-between;
    padding-vertical: 10px;
`;

const ActionButton = styled(TouchableOpacity)<{ disabled?: boolean }>`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px;
    border-radius: 12px;
    background-color: #25292e;
    opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
`;

const BtnLabel = styled(Text)<{ $disabled?: boolean }>`
    font-weight: 600;
    color: ${({ $disabled }) =>
        $disabled ? BUTTON_LABEL.DISABLED : BUTTON_LABEL.ACTIVE};
`;