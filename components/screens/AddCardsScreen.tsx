import { useDecks } from "@/context/DeckContext";
import { useCardModalManager } from "@/hooks/useCardModalManager";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import AddCardButton from "../AddCardButton";
import DeckList from "../DecksList";
import InputField from "../InputField";
import EditCardModal from "@/components/EditCardModal";
import StyledKeyboardAvoidingView from "@/ui/StyledKeyboardAvoidingView";
import { 
    StyledEAddScreenView, 
    AnswerInput, 
    Divider, 
    InputWrapper, 
    QuestionInput 
} from "@/ui/CardInputFields";

interface AddCardsScreenProps {
    deckId: string;
}

const AddCardsScreen = ({ deckId }: AddCardsScreenProps) => {
    const { inputRef, focusInput } = useKeyboardVisibility();
    const { decks, addCard, editCard, deleteCard } = useDecks();

    const deck = decks.find((d) => d.id === deckId);
    const cards = deck?.cards || [];

    const { 
        question, answer, setQuestion, setAnswer,
        isModalVisible, isEditing,
        startAdding, startEditing, save, reset,
    } = useCardModalManager({
        deckId, 
        initialCards: cards,
        onAdd: addCard,
        onEdit: editCard,
        focusInput,
    });

    const handleDeleteCard = async (cardId: string) => {
        await deleteCard(deckId, cardId);
    };

    return (
        <StyledKeyboardAvoidingView>
            <StyledEAddScreenView>         
                <InputWrapper>
                    <InputField
                        ref={inputRef}
                        text={question}
                        InputComponent={QuestionInput}
                        placeholder='Type a question or something else'
                        maxLengthHint={75}
                        onChangeText={setQuestion}
                    />
                    <Divider />
                    <InputField
                        text={answer}
                        InputComponent={AnswerInput}
                        placeholder='Type a description or something else'
                        onChangeText={setAnswer}
                    />
                </InputWrapper>
                <AddCardButton label='Add Card' onPress={save} />
            </StyledEAddScreenView>
            
            <DeckList 
                deckId={deckId} 
                cards={cards} 
                onDelete={(_, cardId) => handleDeleteCard(cardId)}
                onEdit={(_, id) => startEditing(id)}
            />

            <EditCardModal
                visible={isModalVisible}
                question={question}
                answer={answer}
                onChangeQuestion={setQuestion}
                onChangeAnswer={setAnswer}
                onSave={save}
                onClose={reset}
            />
        </StyledKeyboardAvoidingView>
    );
};

export default AddCardsScreen;