import { useRouter } from "expo-router";
import { Alert } from "react-native";

import { useDecks } from "@/context/DeckContext";
import useCustomHeader from "@/hooks/useCustomHeader";
import AddTitle from "@/components/screens/AddTitle";

const CreateFolder = () => {    
    const { draftTitle, folder } = useDecks();
    const router = useRouter();

    const handleConfirmPressed = async () => {
        const trimmedTitle = draftTitle.value.trim();

        if (!trimmedTitle) {
            Alert.alert('Please enter a folder title');
            return;
        }

        const folderId = await folder.addFolder(trimmedTitle).catch(() => null);
        if (!folderId) return;
        draftTitle.clear();

        router.push({
            pathname: '/folder/select',
            params: { folderId },
        });
    };

    useCustomHeader({
        title: 'Folder Title',
        rightButton: {
            label: 'Next',
            onPress: handleConfirmPressed,
        },
    });

    return (
        <AddTitle 
            title={draftTitle.value} 
            setTitle={draftTitle.set} 
        />
    );
};

export default CreateFolder;