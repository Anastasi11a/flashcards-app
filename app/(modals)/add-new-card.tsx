import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useDecks } from "@/context/DeckContext";
import { useCardModalManager } from "@/hooks/useCardModalManager";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import useCustomHeader from "@/hooks/useCustomHeader";
import InputField from "@/components/InputField";
import {
    StyledEAddScreenView,
    QuestionInput,
    AnswerInput,
    Divider,
    InputWrapper
} from "@/ui/CardInputFields";
import StyledKeyboardAvoidingView from "@/ui/StyledKeyboardAvoidingView";

const AddNewCard = () => {
    const { deckId } = useLocalSearchParams<{ deckId: string }>();
    const router = useRouter();

    const { addCard, decks } = useDecks();
    const currentDeck = decks.find((d) => d.id === deckId);
    const cards = currentDeck?.cards || [];

    const { inputRef, focusInput } = useKeyboardVisibility();

    const {
        question, answer, setQuestion, setAnswer, save, reset
    } = useCardModalManager({
        deckId: deckId!,
        initialCards: cards,
        onAdd: addCard,
        onEdit: () => {},
        focusInput,
    });

    useCustomHeader({
        title: 'Add New Card',
        headerTransparent: false,
        rightButton: {
            label: 'Save',
            onPress: async () => {
                save();
                reset();
                router.back();
            },
        },
    });

    useEffect(() => {
        focusInput();
    }, []);

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
            </StyledEAddScreenView>
        </StyledKeyboardAvoidingView>
    );
};

export default AddNewCard;