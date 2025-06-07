import { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import DeckDetailScreen, { getDeckTitleById } from "@/components/DeckDetailScreen";

const DeckScreen: React.FC = () => {
    const { id } = useLocalSearchParams<{ id: string }>();    
    const navigation = useNavigation();

    useLayoutEffect(() => {
        if (id) {
            navigation.setOptions({
                title: getDeckTitleById(id),
                headerStyle: {
                    backgroundColor: "#25292e",
                },
                headerBackTitle: "Back",
                headerTintColor: "#ffd33d", 
                headerTitleStyle: {
                    color: "#e6e6e6",
                    fontSize: 20,
                    fontWeight: "bold",
                },
            });
        }
    }, [navigation, id]);

    return <DeckDetailScreen deckId={id} />;
}

export default DeckScreen;