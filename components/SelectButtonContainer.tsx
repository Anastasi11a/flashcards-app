import { useDecks } from "@/context/DeckContext";
import SelectButtonView from "@/ui/SelectButtonView";

const SelectButtonContainer = () => {
    const { selectMode, setSelectMode } = useDecks();

    const handleSelectPressed = () => {
        setSelectMode(!selectMode);
    };
    
    return (
        <SelectButtonView 
            isActive={selectMode} 
            onPress={handleSelectPressed} 
        />
    );
};

export default SelectButtonContainer;