import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import GradientButton from "./GradientButton";

const AddFolderButton = ({ onPress }: { onPress: () => void }) => {
    return (
        <StyledButtonView>
            <GradientButton
                icon={MaterialCommunityIcons}
                iconName='folder-plus'
                iconSize={28}
                variant='BLUE'
                onPress={onPress}
            />
        </StyledButtonView>
    );
};

export default AddFolderButton;

const StyledButtonView = styled(View)`
    margin-right: 12px;
`;