import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import HeaderActionsView from "./header/HeaderActionsView";

interface HeaderOptionsViewProps {
    onImport: () => void;
    onCreate: () => void;
}

const HeaderOptionsView = ({ onImport, onCreate }: HeaderOptionsViewProps) => {
    
    return (
        <HeaderActionsView
            actions={[
                {
                    key: 'import',
                    icon: Ionicons,
                    iconName: 'download-outline',
                    gradientVariant: 'GRAY',
                    onPress: onImport,
                },
                {
                    key: 'create',
                    icon: MaterialIcons,
                    iconName: 'add',
                    gradientVariant: 'BLUE',
                    onPress: onCreate,
                },
            ]}
        />
    );
};

export default HeaderOptionsView;