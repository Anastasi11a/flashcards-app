import { useDecks } from "@/context/DeckContext";
import SelectButtonView from "@/ui/SelectButtonView";

const SelectButtonContainer = () => {
    const { selectMode, setSelectMode, clearSelection } = useDecks();

    const handleSelectPressed = () => {
        if (selectMode) {
            clearSelection();
            setSelectMode(false);
        } else {
            setSelectMode(true);
        }
    };
    
    return (
        <SelectButtonView 
            isActive={selectMode} 
            onPress={handleSelectPressed} 
        />
    );
};

export default SelectButtonContainer;