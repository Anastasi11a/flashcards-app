import { useState, useEffect, useContext, createContext, ReactNode } from "react";
import uuid from "uuid-random";

import { Card, Deck } from "@/data/decks";
import { 
    initDatabase,
    importDeckToDB,
    getDecksWithCardsFromDB,
    addDeck as dbAddDeck,
    addCard as dbAddCard,
    deleteDeck as dbDeleteDeck,
    deleteCard as dbDeleteCard,
    editDeck as dbEditDeck,
    editCard as dbEditCard,
} from "@/data/db";

interface DeckContextProps {
    decks: Deck[];
    addDeck: (title: string, cards?: Card[]) => Promise<void>;
    addCard: (deckId: string, card: Card) => Promise<void>;
    deleteDeck: (deckId: string) => Promise<void>;
    deleteCard: (deckId: string, cardId: string) => Promise<void>;
    editDeck: (deckId: string, newTitle: string) => Promise<void>;
    editCard: (deckId: string, cardId: string, newQuestion: string, newAnswer: string) => Promise<void>;
    importDeck: (deck: Deck) => Promise<void>;
}

const DeckContext = createContext<DeckContextProps | undefined>(undefined);

export const DeckProvider = ({ children }: { children: ReactNode }) => {
    const [decks, setDecks] = useState<Deck[]>([]);

    useEffect(() => {
        const loadDecks = async () => {
            await initDatabase();
            const data = await getDecksWithCardsFromDB();
            setDecks(data);
        };
        loadDecks();
    }, []);

    const addDeck = async (title: string, cards: Card[] = []) => {
        const id = uuid();
        await dbAddDeck(id, title);
        for (const card of cards) {
            await dbAddCard(card, id);
        }
        setDecks(prev => [...prev, { id, title, cards }]);
    };

    const addCard = async (deckId: string, newCard: Card) => {
        await dbAddCard(newCard, deckId);
        setDecks(prev =>
            prev.map(deck =>
            deck.id === deckId
                ? { ...deck, cards: [newCard, ...deck.cards] }
                : deck
            )
        );
    };

    const editDeck = async (deckId: string, newTitle: string) => {
        await dbEditDeck(deckId, newTitle);
        setDecks(prev =>
            prev.map(deck =>
            deck.id === deckId ? { ...deck, title: newTitle } : deck
            )
        );
    };

    const editCard = async (
        deckId: string,
        cardId: string,
        newQuestion: string,
        newAnswer: string
    ) => {
        await dbEditCard(cardId, newQuestion, newAnswer);
        setDecks(prev =>
            prev.map(deck =>
            deck.id === deckId
                ? {
                    ...deck,
                    cards: deck.cards.map(card =>
                    card.id === cardId
                        ? { ...card, question: newQuestion, answer: newAnswer }
                        : card
                    ),
                }
                : deck
            )
        );
    };
    
    const deleteDeck = async (deckId: string) => {
        await dbDeleteDeck(deckId);
        setDecks(prev => prev.filter(deck => deck.id !== deckId));
    };

    const deleteCard = async (deckId: string, cardId: string) => {
        await dbDeleteCard(cardId);
        setDecks(prev =>
            prev.map(deck =>
            deck.id === deckId
                ? { ...deck, cards: deck.cards.filter(card => card.id !== cardId) }
                : deck
            )
        );
    };

    const importDeck = async (deck: Deck) => {
        await importDeckToDB(deck);
        const updatedDecks = await getDecksWithCardsFromDB();
        setDecks(updatedDecks);
    };

    return (
        <DeckContext.Provider value={{ decks, addDeck, addCard, deleteDeck, deleteCard, editDeck, editCard, importDeck }}>
            {children}
        </DeckContext.Provider>
    );
}

export const useDecks = () => {
    const context = useContext(DeckContext);
    if (!context) throw new Error('useDecks must be used within a DeckProvider');
    return context;
};