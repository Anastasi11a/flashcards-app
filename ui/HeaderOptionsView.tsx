import { View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import GradientButton from "../ui/GradientButton";

interface HeaderOptionsViewProps {
    onImport: () => void;
    onCreate: () => void;
}

const HeaderOptionsView = ({ onImport, onCreate }: HeaderOptionsViewProps) => {
    return (
        <HeaderButtonContainer>
            <GradientButton
                icon={<Ionicons name='download-outline' size={24} color='#fff' />}
                colors={['#474f59', '#25292e']}
                onPress={onImport}
            />
            <GradientButton
                icon={<MaterialIcons name='add' size={24} color="#fff" />}
                colors={['#64d1f5', '#0a7ea4']}
                onPress={onCreate}
            />
        </HeaderButtonContainer>
    );
};

export default HeaderOptionsView;

const HeaderButtonContainer = styled(View)`
    flex-direction: row;
    margin-right: 12px;
    gap: 12px;    
`;