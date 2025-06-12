import { useState } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

import useCustomHeader from "@/hooks/useCustomHeader";
import AddDeckTitle from "@/components/AddDeckTitle";

const AddDeckTitleScreen = () => {
    const [title, setTitle] = useState('');
    const router = useRouter();

    const handleNextPressed = () => {
        if (title.trim() === '') {
            Alert.alert('Please enter a deck title.');
            return;
        }

        router.push({ pathname: '/create/add-deck-cards', params: { title } });
    };

    useCustomHeader({
        title: 'Add Deck Title',
        rightButton: {
            label: 'Next',
            onPress: handleNextPressed,
        },
    });

    return <AddDeckTitle title={title} setTitle={setTitle} />
};

export default AddDeckTitleScreen;
