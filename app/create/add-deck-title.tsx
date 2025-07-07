import { useState } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

import { useDecks } from "@/context/DeckContext";
import AddDeckTitle from "@/components/screens/AddDeckTitle";
import useCustomHeader from "@/hooks/useCustomHeader";

const AddDeckTitleScreen = () => {
    const { addDeck } = useDecks();
    const [title, setTitle] = useState('');
    const router = useRouter();

    const handleNextPressed = async () => {
        const trimmedTitle = title.trim();

        if (trimmedTitle === '') {
            Alert.alert('Please enter a deck title.');
            return;
        }

        const deckId = await addDeck(title);
        router.push({ 
            pathname: '/create/add-deck-cards', 
            params: { title, deckId } 
        });
    };

    useCustomHeader({
        title: 'Deck Title',
        rightButton: {
            label: 'Next',
            onPress: handleNextPressed,
        },
    });

    return <AddDeckTitle title={title} setTitle={setTitle} />
};

export default AddDeckTitleScreen;