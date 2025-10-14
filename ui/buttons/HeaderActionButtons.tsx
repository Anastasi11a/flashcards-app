import { View } from "react-native";
import styled from "styled-components/native";

import GradientButton, { ButtonIconProps } from "./GradientButton";

interface HeaderAction extends ButtonIconProps{
    key: string;
    onPress: () => void;
}

const HeaderActionButtons = ({ buttons }: { buttons: HeaderAction[] }) => {
    return (
        <StyledButtonContainer>
            {buttons.map(({ key, onPress, ...iconProps }) => (
                <GradientButton
                    key={key}
                    {...iconProps}
                    onPress={onPress}
                />
            ))}
        </StyledButtonContainer>
    );
};

export default HeaderActionButtons;

const StyledButtonContainer = styled(View)`
    flex-direction: row;
    margin-right: 12px;
    gap: 12px;    
`;