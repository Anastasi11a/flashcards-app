import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import AddDeckTitle from "@/components/screens/AddDeckTitle";
import useCustomHeader from "@/hooks/useCustomHeader";

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
        title: 'Deck Title',
        rightButton: {
            label: 'Next',
            onPress: handleNextPressed,
        },
    });

    return <AddDeckTitle title={title} setTitle={setTitle} />
};

export default AddDeckTitleScreen;