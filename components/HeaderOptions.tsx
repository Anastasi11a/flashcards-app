import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import GradientButton from "../ui/GradientButton";
import { HeaderButtonContainer } from "@/ui/CardInputFields";

interface HeaderOptionsProps {
    onImport: () => void;
}

const HeaderOptions = ({ onImport }: HeaderOptionsProps) => {
    const router = useRouter();

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
                onPress={() => router.push('/create/add-deck-title')}
            />
        </HeaderButtonContainer>
    );
};

export default HeaderOptions;