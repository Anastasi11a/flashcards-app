import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import ButtonGradientView from "./ButtonGradientView";

interface SelectButtonViewProps {
    isActive: boolean;
    onPress: () => void;
}

const SelectButtonView = ({ isActive, onPress }: SelectButtonViewProps) => {
    return (
        <StyledButtonView>
            <ButtonGradientView
                icon={MaterialIcons}
                iconName='checklist-rtl'
                buttonSize={42}
                borderRadius={10}
                gradientVariant={isActive ? 'BLUE' : 'GRAY'}
                onPress={onPress}
            />
        </StyledButtonView>
    );
};

export default SelectButtonView;

const StyledButtonView = styled(View)`
    margin-right: -6px;
    margin-bottom: 12px;
`;