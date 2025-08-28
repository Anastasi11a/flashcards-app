import { View, TouchableOpacity, Text } from "react-native";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons";
import styled from "styled-components/native";

import ButtonGradientView from "./ButtonGradientView";
import { BUTTON_LABEL } from "@/constants/colors/gradient";

interface ActionButtonsBarViewProps {
    insets: { bottom: number };
    hasSelection: boolean;
    onCopy: () => void;
    onMove: () => void;
    onSaveEmptyFolder: () => void;
}

const ActionButtonsBarView = ({
    insets, 
    hasSelection,
    onCopy,
    onMove,
    onSaveEmptyFolder
}: ActionButtonsBarViewProps) => {
    return (
        <BarWrapper paddingBottomInset={insets.bottom}>
            <ButtonsRow>
                <ActionButton onPress={onCopy}>
                    <ButtonGradientView
                        icon={Ionicons}
                        iconName='copy-outline'
                        gradientVariant={hasSelection ? 'BLUE' : 'GRAY'}
                        buttonSize={38}
                        borderRadius={10}
                        onPress={onCopy}
                    />
                    <BtnLabel $disabled={!hasSelection}>Copy</BtnLabel>
                </ActionButton>

                <ActionButton onPress={onMove}>
                    <ButtonGradientView
                        icon={MaterialCommunityIcons}
                        iconName='folder-move'
                        gradientVariant={hasSelection ? 'BLUE' : 'GRAY'}
                        buttonSize={38}
                        borderRadius={10}
                        onPress={onMove}
                    />
                    <BtnLabel $disabled={!hasSelection}>Move</BtnLabel>
                </ActionButton>
            </ButtonsRow>

            <ActionButton onPress={onSaveEmptyFolder}>
                <ButtonGradientView
                    icon={Entypo}
                    iconName='folder'
                    gradientVariant='GRAY'
                    buttonSize={38}
                    borderRadius={10}
                    onPress={onSaveEmptyFolder}
                />
                <BtnLabel>Save Empty Folder</BtnLabel>
            </ActionButton>
        </BarWrapper>
    );
};

export default ActionButtonsBarView;

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
    gap: 8px;
    flex-direction: row;
    justify-content: space-between;
    padding-vertical: 8px;
`;

const ActionButton = styled(TouchableOpacity)<{ disabled?: boolean }>`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    border-radius: 12px;
    background-color: #2a2e34;
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const BtnLabel = styled(Text)<{ $disabled?: boolean }>`
    font-weight: 600;
    color: ${({ $disabled }) =>
        $disabled ? BUTTON_LABEL.DISABLED : BUTTON_LABEL.ACTIVE};
`;