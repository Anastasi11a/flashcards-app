import { TextInput } from "react-native";

import CardInputs from "./CardInputs";
import AddCardButton from "@/ui/AddCardButton";
import AddCardsView from "@/ui/layout/CardContainer";

interface AddCardsContainerProps {
    inputRef: React.Ref<TextInput>;
    question: string;
    answer: string;
    onChangeQuestion: (text: string) => void;
    onChangeAnswer: (text: string) => void;
    onSave: () => void;
}

const AddCardsContainer  = ({ 
    inputRef, question, answer, onChangeQuestion, onChangeAnswer, onSave, 
}: AddCardsContainerProps) => {
    return (
        <AddCardsView> 
            <CardInputs
                inputRef={inputRef}
                question={question}
                answer={answer}
                onChangeQuestion={onChangeQuestion}
                onChangeAnswer={onChangeAnswer}
            />
            <AddCardButton label='Add Card' onPress={onSave} />
        </AddCardsView>
    );
};

export default AddCardsContainer;