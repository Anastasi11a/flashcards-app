import { useState } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

import { useDecks } from "@/context/DeckContext";
import AddFolderTitle from "@/components/screens/AddFolderTitle";
import useCustomHeader from "@/hooks/useCustomHeader";

const CreateFolder = () => {
    const { addFolder } = useDecks();
    const [title, setTitle] = useState('');
    const router = useRouter();

    const handleConfirmPressed = async () => {
        const trimmedTitle = title.trim();

        if (trimmedTitle === '') {
            Alert.alert('Please enter a folder title');
            return;
        }

        try {
            await addFolder(trimmedTitle);
            router.back();
        } catch (error) {
            console.error('Error creating folder:', error);
            Alert.alert('Failed to create folder');
        }
    };

    useCustomHeader({
        title: 'Folder Title',
        rightButton: {
            label: 'Confirm',
            onPress: handleConfirmPressed,
        },
    });

    return <AddFolderTitle title={title} setTitle={setTitle} />
};

export default CreateFolder;