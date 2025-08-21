import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import ButtonGradientView from "./ButtonGradientView";

export interface AddFolderButtonProps {
    onPress: () => void;
}

const AddFolderButton = ({ onPress }: AddFolderButtonProps) => {
    return (
        <StyledButtonView>
            <ButtonGradientView
                icon={MaterialCommunityIcons}
                iconName='folder-plus'
                iconSize={28}
                gradientVariant='BLUE'
                onPress={onPress}
            />
        </StyledButtonView>
    );
};

export default AddFolderButton;

const StyledButtonView = styled(View)`
    margin-right: 12px;
`;