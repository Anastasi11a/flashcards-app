import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import GradientButton from "./GradientButton";
import { CHECKLIST } from "@/constants/colors/gradient";

interface SelectButtonViewProps {
    isActive: boolean;
    onPress: () => void;
}

const SelectButtonView = ({ isActive, onPress }: SelectButtonViewProps) => {
    return (
        <StyledButtonView>
            <GradientButton
                icon={<CheckListIcon name='checklist-rtl' />}
                colors={isActive ? CHECKLIST.INACTIVE : CHECKLIST.ACTIVE}
                onPress={onPress}
            />
        </StyledButtonView>
    );
};

export default SelectButtonView;

const StyledButtonView = styled(View)`
    margin-right: 12px;
`;

const CheckListIcon = styled(MaterialIcons).attrs({
    size: 24,
    color: '#fff',
})``;