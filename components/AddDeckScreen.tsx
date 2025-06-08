import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, Button, Alert } from "react-native";
import styled from "styled-components/native";

import { useDecks } from "@/context/DeckContext";

const AddDeckScreen = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const { addDeck } = useDecks();

    const handleAdd = () => {
        if (title.trim() === '') {
            Alert.alert("Validation", "Please enter a deck title.");
            return;
        }
        addDeck(title);
        router.back();
    };

    return (
        <StyledView>
            <StyledTitle>Deck Title</StyledTitle>
            <StyledInput
                value={title}
                placeholder='Enter deck title'
                placeholderTextColor='#aaa'
                onChangeText={setTitle}
            />
            <Button title='Add Deck' onPress={handleAdd} />
        </StyledView>
    );
};

export default AddDeckScreen;

const StyledView = styled(View)`
    flex: 1;
    padding: 24px;
    background-color: #25292e;
`;

const StyledTitle = styled(Text)`
    margin-bottom: 8px;
    font-size: 18px;
    color: #e6e6e6;
`;

const StyledInput = styled(TextInput)`
    margin-bottom: 16px;
    height: 48px;
    border-radius: 12px;
    padding: 12px;
    font-size: 16px;
    background-color: #1a1c20;
    color: #fff;
`;