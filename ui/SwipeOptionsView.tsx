import { View } from "react-native";
import styled from "styled-components/native";

import SwipeButtonView from "./buttons/SwipeButtonView";
import { GRADIENTS } from "@/constants/colors/gradient";

interface Props {
    onDelete: () => void;
    onEdit?: () => void;
}

const SwipeOptionsView = ({ onDelete, onEdit }: Props) => {
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

export default SwipeOptionsView;

const ButtonRowContainer = styled(View)`
    flex-direction: row;
`;