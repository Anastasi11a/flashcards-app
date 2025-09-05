import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import styled from "styled-components/native";

import ButtonGradientView from "../ButtonGradientView";

interface Props {
    onPress: () => void;
}

const FloatingAddButton = ({ onPress }: Props) => {
    return (
        <Container>
            <ButtonGradientView
                icon={MaterialCommunityIcons}
                iconName='playlist-plus'
                iconSize={28}
                gradientVariant='BLUE'
                buttonSize={52}
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