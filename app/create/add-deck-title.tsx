import { useRouter } from "expo-router";
import { Alert } from "react-native";

import { useDecks } from "@/context/DeckContext";
import AddTitle from "@/components/screens/AddTitle";
import useCustomHeader from "@/hooks/useCustomHeader";

const AddDeckTitleScreen = () => {
    const { actions, draftTitle } = useDecks();
    const router = useRouter();

    const handleNextPressed = async () => {
        const trimmedTitle = draftTitle.value.trim();

        if (trimmedTitle === '') {
            Alert.alert('Please enter a deck title');
            return;
        }

        const deckId = await actions.addDeck(trimmedTitle);
        draftTitle.clear();

        router.push({ 
            pathname: '/create/add-deck-cards', 
            params: { title: trimmedTitle, deckId } 
        });
    };

    useCustomHeader({
        title: 'Deck Title',
        rightButton: {
            label: 'Next',
            onPress: handleNextPressed,
        },
    });

    return (
        <AddTitle 
            title={draftTitle.value} 
            setTitle={draftTitle.set} 
        />
    );
};

export default AddDeckTitleScreen;