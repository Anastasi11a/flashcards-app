import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import styled from "styled-components";

import { initialDecks } from "@/data/decks";

interface Props {
    deckId?: string;
}

const DeckDetailScreen: React.FC<Props> = ({ deckId }) => {
    const deck = initialDecks.find((deck) => deck.id === deckId);

    if (!deck) {
        return (
            <NotFoundDeckView>
                <NotFoundDeckText>Deck not found</NotFoundDeckText>
            </NotFoundDeckView>
        );
    }

    return (
        <StyledView>
            <StyledTitle>{deck.title}</StyledTitle>
            <CardCount>{deck.cards.length}</CardCount>
        </StyledView>
    );
}

export default DeckDetailScreen;

const StyledView = styled(View)`
    flex: 1;
    padding: 20px;
    background-color: #25292e;
`;

const StyledTitle = styled(Text)`
    font-size: 28px;
    font-weight: bold;
    color: #e6e6e6;
`;

const CardCount = styled(Text)`
    font-size: 16px;
    margin-top: 8px;
    color: #808080;
`;

const NotFoundDeckView = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #808080;
`;
const NotFoundDeckText = styled(Text)`
    font-size: 16px;
    color: #e6e6e6;
`;