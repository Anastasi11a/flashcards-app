import { useState, useContext, createContext, ReactNode } from "react";
import { Card, Deck, initialDecks } from "@/data/decks";

interface DeckContextProps {
    decks: Deck[];
    addDeck: (title: string, cards?: Card[]) => void;
    deleteDeck: (deckId: string) => void;
    deleteCard: (deckId: string, cardId: string) => void;
    editDeck: (deckId: string, newTitle: string) => void;
    editCard: (deckId: string, cardId: string, newQuestion: string, newAnswer: string) => void;
}

const DeckContext = createContext<DeckContextProps | undefined>(undefined);

export const DeckProvider = ({ children }: { children: ReactNode }) => {
    const [decks, setDecks] = useState<Deck[]>(initialDecks);

    const addDeck = (title: string, cards: Card[] = []) => {
        const newDeck: Deck = {
            id: Date.now().toString(),
            title,
            cards,
        };
        setDecks(prev => [...prev, newDeck]);
    };

    const deleteDeck = (deckId: string) => {
        setDecks((prev) => prev.filter((deck) => deck.id !== deckId));
    };

    const deleteCard = (deckId: string, cardId: string) => {
        setDecks(prev =>
            prev.map(deck =>
                deck.id === deckId
                ? { ...deck, cards: deck.cards.filter(card => card.id !== cardId) }
                : deck
            )
        );
    };

    const editDeck = (deckId: string, newTitle: string) => {
        setDecks(prev =>
            prev.map(deck =>
                deck.id === deckId
                    ? { ...deck, title: newTitle }
                    : deck
            )
        );
    };

    const editCard = (deckId: string, cardId: string, newQuestion: string, newAnswer: string) => {
        setDecks(prev =>
            prev.map(deck => deck.id === deckId
                ? {
                    ...deck,
                    cards: deck.cards.map(card =>
                        card.id === cardId
                            ? { ...card, question: newQuestion, answer: newAnswer }
                            : card
                    )
                }
                : deck
            )
        );
    };

    return (
        <DeckContext.Provider value={{ decks, addDeck, deleteDeck, deleteCard, editDeck, editCard }}>
            {children}
        </DeckContext.Provider>
    );
}

export const useDecks = () => {
    const context = useContext(DeckContext);
    if (!context) throw new Error('useDecks must be used within a DeckProvider');
    return context;
};