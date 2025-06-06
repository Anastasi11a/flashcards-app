import { useLocalSearchParams } from "expo-router";
import DeckDetailScreen from "@/components/DeckDetailScreen";

const DeckScreen: React.FC = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    return <DeckDetailScreen deckId={id} />
}

export default DeckScreen;