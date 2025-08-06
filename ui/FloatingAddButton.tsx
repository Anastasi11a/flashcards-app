import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import GradientButton from "./GradientButton";

interface Props {
    onPress: () => void;
}

const FloatingAddButton = ({ onPress }: Props) => {
    return (
        <Container>
            <GradientButton
                icon={
                    <MaterialCommunityIcons 
                        name='playlist-plus' 
                        size={28} 
                        color="#fff" 
                    />
                }
                size={52}
                colors={['#64d1f5', '#0a7ea4']}
                onPress={onPress}
            />
        </Container>
    );
};

export default FloatingAddButton;

const Container = styled(View)`
    position: absolute;
    right: 16px;
    bottom: 28px;
    z-index: 10;
`;