import { View } from "react-native";
import styled from "styled-components/native";

import ButtonGradientView, { IconProps } from "./ButtonGradientView";

interface HeaderAction extends IconProps{
    key: string;
    onPress: () => void;
}

interface HeaderActionsViewProps {
    actions: HeaderAction[];
}

const HeaderActionsView = ({ actions }: HeaderActionsViewProps) => {
    return (
        <HeaderButtonContainer>
            {actions.map(({ key, onPress, ...iconProps }) => (
                <ButtonGradientView
                    key={key}
                    {...iconProps}
                    onPress={onPress}
                />
            ))}
        </HeaderButtonContainer>
    );
};

export default HeaderActionsView;

const HeaderButtonContainer = styled(View)`
    flex-direction: row;
    margin-right: 12px;
    gap: 12px;    
`;