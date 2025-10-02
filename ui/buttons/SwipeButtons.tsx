import { View } from "react-native";
import styled from "styled-components/native";

import SwipeButtonView from "./SwipeButtonView";
import { GRADIENTS } from "@/constants/colors/gradient";

interface Props {
    isPressed?: boolean;
    isDeleteGradient?: boolean;
    onEdit?: () => void;
    onDelete: () => void;
}

const SwipeButtons = ({
    isPressed = false, 
    isDeleteGradient = true,
    onEdit, 
    onDelete 
}: Props) => {
    const deleteGradient = isDeleteGradient
        ? GRADIENTS.DELETE
        : isPressed
            ? GRADIENTS.DELETE
            : GRADIENTS.GRAY;

    return (
        <ButtonRowContainer>
            {onEdit && (
                <SwipeButtonView
                    label='Edit'
                    gradientColors={GRADIENTS.SWIPE}
                    onPress={onEdit}
                />
            )}
            <SwipeButtonView
                label='Delete'
                gradientColors={deleteGradient}
                onPress={onDelete}
            />
        </ButtonRowContainer>
    );
};

export default SwipeButtons;

const ButtonRowContainer = styled(View)`
    flex-direction: row;
`;