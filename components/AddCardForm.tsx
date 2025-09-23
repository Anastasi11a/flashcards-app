import AddCardButton from "@/ui/buttons/AddCardButton";
import CardInputContainer from "@/ui/container/CardInputContainer";
import CardInputsView, { CardInputsProps } from "@/ui/input/CardInputsView";

interface AddCardFormProps extends CardInputsProps {
    onSave: () => void;
}

const AddCardForm  = ({ onSave, ...cardInputsProps }: AddCardFormProps) => {
    return (
        <CardInputContainer> 
            <CardInputsView {...cardInputsProps} />
            <AddCardButton label='Add Card' onPress={onSave} />
        </CardInputContainer>
    );
};

export default AddCardForm;