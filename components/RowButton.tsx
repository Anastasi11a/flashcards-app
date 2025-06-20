import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

type ButtonName = 'cancel' | 'save';

interface SwipeEditProps {
    buttonName: ButtonName;
    label?: string;
    onPress: () => void;
}

const RowButton = (props: SwipeEditProps) => {
    const defaultLabels: Record<ButtonName, string> = {
        cancel: 'Cancel',
        save: 'Save',
    };

    return (
        <StyledPressable onPress={props.onPress} btnName={props.buttonName}>
            <ButtonLabel>
                {props.label ?? defaultLabels[props.buttonName]}
            </ButtonLabel>
        </StyledPressable>
    ); 
};

export default RowButton;

const StyledPressable = styled(TouchableOpacity)<{ btnName: ButtonName }>`
    width: 46%;
    height: 42px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background-color: ${({ btnName }) => 
        btnName === 'cancel' ? '#464C55' : '#0C860E'
    };
`;

const ButtonLabel = styled(Text)`
    font-weight: 700;
    font-size: 18px;
    color: #e6e6e6;
`;