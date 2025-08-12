import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import GradientButton from "./GradientButton";

interface CardListButtonSwitchProps {
    iconName: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
}

const CardListButtonSwitch = ({ iconName, onPress }: CardListButtonSwitchProps) => {
    return (
        <StyledButtonView>
            <GradientButton
                icon={<Ionicons name={iconName} size={20} color="#fff" />}
                colors={['#474f59', '#25292e']}
                onPress={onPress}
            />
        </StyledButtonView>
    );
};

export default CardListButtonSwitch;

const StyledButtonView = styled(View)`
    margin-right: 12px;
`;