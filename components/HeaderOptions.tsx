import { useRouter } from "expo-router";

import { useDecks } from "@/context/DeckContext";
import { handleImportDeck } from "@/utils/handleImportDeck";
import HeaderOptionsView from "@/ui/header/HeaderOptionsView";

const HeaderOptions = () => {
    const { actions } = useDecks();
    const router = useRouter();

    const handleImport = () => handleImportDeck(actions.importDeck)
    const handleCreate = () => router.push('/(modals)/add-deck-title');

    return (
        <HeaderOptionsView 
            onImport={handleImport} 
            onCreate={handleCreate} 
        />
    );
};

export default HeaderOptions;