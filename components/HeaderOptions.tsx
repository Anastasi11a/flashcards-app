import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import GradientButton from "./GradientButton";
import { HeaderButtonContainer } from "@/ui/CardInputFields";

interface HeaderOptionsProps {
    onImport: () => void;
}

const HeaderOptions = (props: HeaderOptionsProps) => {
    const router = useRouter();

    return (
        <HeaderButtonContainer>
            <GradientButton
                icon={<Ionicons name='download-outline' size={24} color='#fff' />}
                colors={['#474f59', '#25292e']}
                onPress={props.onImport}
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