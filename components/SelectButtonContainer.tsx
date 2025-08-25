import { useDecks } from "@/context/DeckContext";
import SelectButtonView from "@/ui/SelectButtonView";

interface Props {
    allIds: string[];
}

const SelectButtonContainer = ({ allIds }: Props) => {
    const { selection } = useDecks();

    const handlePressed = () => {
        selection.toggleAll(allIds);
    };

    return (
        <SelectButtonView 
            isActive={selection.allMode} 
            onPress={handlePressed} 
        />
    );
};

export default SelectButtonContainer;