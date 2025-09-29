import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import GradientButton from "./GradientButton";

const FloatingAddButton = ({ onPress }: { onPress: () => void }) => {
    return (
        <Container>
            <GradientButton
                icon={MaterialCommunityIcons}
                iconName='playlist-plus'
                iconSize={28}
                variant='BLUE'
                containerSize={52}
                onPress={onPress}
            />
        </Container>
    );
};

export default FloatingAddButton;

const Container = styled(View)`
    position: absolute;
    right: 18px;
    bottom: 36px;
    z-index: 10;
`;