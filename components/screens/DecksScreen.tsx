import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";

import { Deck } from "@/data/decks";
import { useDecks } from "@/context/DeckContext";
import DeckContainer from "@/ui/container/DeckContainer";
import { navigateToCards } from "@/utils/navigation/navigation";
import { flatListStyles } from "@/utils/contentContainerStyle";

const DecksScreen = () => {
    const { decks, actions } = useDecks();

    const handlePress = (deckId: string) => {
        navigateToCards(deckId);
    };

    const renderDeckItem = ({ item, drag }: RenderItemParams<Deck>) => (
        <DeckContainer
            title={item.title}
            cardCount={item.cards.length}
            onPress={() => handlePress(item.id)}
            onLongPress={drag}
        />
    );

    return (
        <DraggableFlatList
            data={decks}
            keyExtractor={(item) => item.id}
            renderItem={renderDeckItem}
            onDragEnd={({ data }) => actions.reorderDecks(data)}
            contentContainerStyle={flatListStyles.appDecks()}
        />
    );
};

export default DecksScreen;