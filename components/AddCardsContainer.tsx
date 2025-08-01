import AddCardButton from "@/ui/AddCardButton";
import AddCardsView from "@/ui/layout/CardContainer";
import CardInputsView, { CardInputsProps } from "@/ui/CardInputsView";

interface AddCardsContainerProps extends CardInputsProps {
    onSave: () => void;
}

const AddCardsContainer  = ({ onSave, ...cardInputsProps }: AddCardsContainerProps) => {
    return (
        <AddCardsView> 
            <CardInputsView {...cardInputsProps} />
            <AddCardButton label='Add Card' onPress={onSave} />
        </AddCardsView>
    );
};

export default AddCardsContainer;