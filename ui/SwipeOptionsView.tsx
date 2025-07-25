import { View } from "react-native";
import styled from "styled-components/native";

import SwipeButton from "@/components/SwipeButton";

interface SwipeOptionsViewProps {
    showEdit: boolean;
    onDeletePress: () => void;
    onEditPress?: () => void;
}

const SwipeOptionsView = ({
    showEdit, onDeletePress, onEditPress
}: SwipeOptionsViewProps) => {
    return (
        <ButtonRowContainer>
            <SwipeButton
                iconName='delete-sweep'
                iconType='delete'
                onPress={onDeletePress}
            />
            {showEdit && onEditPress && (
                <SwipeButton
                    iconName='playlist-edit'
                    iconType='edit'
                    onPress={onEditPress}
                />
            )}
        </ButtonRowContainer>
    );
};

export default SwipeOptionsView;

const ButtonRowContainer = styled(View)`
    flex-direction: row;
`;