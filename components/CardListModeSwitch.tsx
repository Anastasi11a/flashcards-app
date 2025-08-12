import { useDecks } from "@/context/DeckContext";
import CardListButtonSwitch from "@/ui/CardListButtonSwitch";

const CardListModeSwitch = () => {
    const { viewSettings } = useDecks();
    const { viewMode, setViewMode } = viewSettings;

    const toggleMode = () => {
        setViewMode(viewMode === 'grid' ? 'list' : 'grid');
    };

    return (
        <CardListButtonSwitch
            iconName={viewMode === 'grid' ? 'list' : 'grid'}
            onPress={toggleMode}
        />
    );
};

export default CardListModeSwitch;