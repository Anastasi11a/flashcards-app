import { useLocalSearchParams } from "expo-router";

import DeckDetailScreen from "@/components/DeckDetailScreen";
import useCustomHeader from "@/hooks/useCustomHeader";
import { useDecks } from "@/context/DeckContext";

const DeckScreen: React.FC = () => {
    const { id } = useLocalSearchParams<{ id: string }>();   
    const { decks } = useDecks(); 
    const deck = decks.find((d) => d.id === id);
    
    useCustomHeader({ title: deck?.title });
    return <DeckDetailScreen deckId={id} />;
};

export default DeckScreen;