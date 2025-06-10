import { useState, useContext, createContext, ReactNode } from "react";
import { Deck, initialDecks } from "@/data/decks";

interface DeckContextProps {
    decks: Deck[];
    addDeck: (title: string) => void;
    deleteDeck: (deckId: string) => void;
}

const DeckContext = createContext<DeckContextProps | undefined>(undefined);

export const DeckProvider = ({ children }: { children: ReactNode }) => {
    const [decks, setDecks] = useState<Deck[]>(initialDecks);

    const addDeck = (title: string) => {
        const newDeck: Deck = {
            id: Date.now().toString(),
            title,
            cards: [],
        };
        setDecks(prev => [...prev, newDeck]);
    };

    const deleteDeck = (deckId: string) => {
        setDecks((prev) => prev.filter((deck) => deck.id !== deckId));
    };

    return (
        <DeckContext.Provider value={{ decks, addDeck, deleteDeck }}>
            {children}
        </DeckContext.Provider>
    );
}

export const useDecks = () => {
    const context = useContext(DeckContext);
    if (!context) throw new Error('useDecks must be used within a DeckProvider');
    return context;
};