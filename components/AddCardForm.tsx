import AddCardButton from "@/ui/buttons/AddCardButton";
import CardInputsView, { CardInputsProps } from "@/ui/CardInputsView";
import CardInputContainer from "@/ui/container/CardInputContainer";

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