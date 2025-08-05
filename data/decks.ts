export type Deck = {
    id: string;
    title: string;
    cards: Card[];
};

export type DeckRow = Omit<Deck, 'cards'>;

export type Card = {
    id: string;
    question: string;
    answer: string;
};

export type DBCard = Card & {
    deck_id: string;
};