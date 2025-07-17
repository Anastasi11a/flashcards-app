import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import CardInputs from "@/components/CardInputs";
import { useDecks } from "@/context/DeckContext";
import { useCardModalManager } from "@/hooks/useCardModalManager";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import useCustomHeader from "@/hooks/useCustomHeader";
import { StyledEAddScreenView } from "@/ui/CardInputFields";
import StyledKeyboardAvoidingView from "@/ui/StyledKeyboardAvoidingView";

const AddNewCard = () => {
    const { deckId } = useLocalSearchParams<{ deckId: string }>();
    if (!deckId) return null;

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
                <CardInputs
                    inputRef={inputRef}
                    question={question}
                    answer={answer}
                    onChangeQuestion={setQuestion}
                    onChangeAnswer={setAnswer}
                />
            </StyledEAddScreenView>
        </StyledKeyboardAvoidingView>
    );
};

export default AddNewCard;