import CardInputsView, { CardInputsViewProps } from "@/ui/CardInputsView";

const CardInputs = ({ 
    inputRef, question, answer, onChangeQuestion, onChangeAnswer
}: CardInputsViewProps) => {
    return (    
        <CardInputsView
            inputRef={inputRef}
            question={question}
            answer={answer}
            onChangeQuestion={onChangeQuestion}
            onChangeAnswer={onChangeAnswer}
        /> 
    );
};

export default CardInputs;