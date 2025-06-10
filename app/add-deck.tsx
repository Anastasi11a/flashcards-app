import { useState } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

import AddDeckScreen from "@/components/AddDeckScreen";
import useCustomHeader from "@/hooks/useCustomHeader";
import { useDecks } from "@/context/DeckContext";

const AddDeck = () => {
    const [title, setTitle] = useState('');
    const router = useRouter();
    const { addDeck } = useDecks();

    const handleAdd = () => {
        if (title.trim() === '') {
            Alert.alert("Validation", "Please enter a deck title.");
            return;
        }
        addDeck(title);
        router.back();
    };

    useCustomHeader({ 
        title: 'Add New Deck',
        rightButton: {
            onPress: handleAdd,
            label: 'Save',
        },
    });

    return <AddDeckScreen title={title} setTitle={setTitle} />
};

export default AddDeck;