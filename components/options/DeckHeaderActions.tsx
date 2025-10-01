import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { useDecks } from "@/context/DeckContext";
import HeaderActionButtons from "@/ui/buttons/HeaderActionButtons";
import { handleImportDeck } from "@/utils/handleImportDeck";
import { navigateToCreateDeck } from "@/utils/navigation/navigation";

const DeckHeaderActions = () => {
    const { actions } = useDecks();
    const handleImport = () => handleImportDeck(actions.importDeck);

    return (
        <HeaderActionButtons
            buttons={[
                {
                    key: 'import',
                    icon: Ionicons,
                    iconName: 'download-outline',
                    variant: 'GRAY',
                    onPress: handleImport,
                },
                {
                    key: 'create',
                    icon: MaterialIcons,
                    iconName: 'add',
                    variant: 'BLUE',
                    onPress: navigateToCreateDeck,
                },
            ]}
        />
    );
};

export default DeckHeaderActions;