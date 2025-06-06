import { Text, View, FlatList } from "react-native";
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
            <FlatList
                data={deck.cards}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 12, paddingTop: 16 }}
                renderItem={({ item }) => (
                    <CardStyledContainer>
                        <StyledQuestion>{item.question}</StyledQuestion>
                        <StyledAnswer>{item.answer}</StyledAnswer>
                    </CardStyledContainer>
                )}
            />
        </StyledView>
    );
}

export default DeckDetailScreen;

export const getDeckTitleById = (id?: string): string => {
    const deck = initialDecks.find((deck) => deck.id === id);
    return deck?.title ?? '';
};

const StyledView = styled(View)`
    flex: 1;
    padding: 16px 10px;
    background-color: #25292e;
`;

const CardStyledContainer = styled(View)`
    padding: 16px;
    border-radius: 12px;
    background-color: #1a1c20;
`;

const StyledQuestion = styled(Text)`
    font-size: 16px;
    font-weight: bold;
    color: #0a7ea4;
`;

const StyledAnswer = styled(Text)`
    margin-top: 4px;
    font-size: 14px;
    color: #e6e6e6;
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