import { View } from "react-native";
import styled from "styled-components/native";

import SwipeButtonView from "./SwipeButtonView";
import { GRADIENTS } from "@/constants/colors/gradient";

interface Props {
    onEdit?: () => void;
    onDelete: () => void;
}

const SwipeButtons = ({ onEdit, onDelete }: Props) => {
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
                gradientColors={GRADIENTS.DELETE}
                onPress={onDelete}
            />
        </ButtonRowContainer>
    );
};

export default SwipeButtons;

const ButtonRowContainer = styled(View)`
    flex-direction: row;
`;