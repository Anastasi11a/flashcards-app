import { useState, useEffect, useContext, createContext, ReactNode } from "react";
import uuid from "uuid-random";

import { Card, Deck } from "@/data/decks";
import { 
    getDB,
    initDatabase,
    importDeckToDB,
    getDecksWithCardsFromDB,
    addDeck as dbAddDeck,
    addCard as dbAddCard,
    deleteDeck as dbDeleteDeck,
    deleteCard as dbDeleteCard,
    editDeck as dbEditDeck,
    editCard as dbEditCard,
    saveDeckAsFavorite,
    getFavoriteDeckIds,
    removeDeckFromFavoritesInDB,
} from "@/data/db";

interface DeckContextProps {
    decks: Deck[];
    savedDecks: Deck[];
    selectedDeckId: string | null;
    setSelectedDeckId: (id: string | null) => void;
    addDeck: (title: string, cards?: Card[]) => Promise<string>;
    addCard: (deckId: string, card: Card) => Promise<void>;
    deleteDeck: (deckId: string) => Promise<void>;
    deleteCard: (deckId: string, cardId: string) => Promise<void>;
    editDeck: (deckId: string, newTitle: string) => Promise<void>;
    editCard: (
        deckId: string, 
        cardId: string, 
        newQuestion: string, 
        newAnswer: string
    ) => Promise<void>;
    importDeck: (deck: Deck) => Promise<void>;
    reorderDecks: (newOrder: Deck[]) => void;
    saveDeckToFavorites: (deckId: string) => Promise<void>;
    removeDeckFromFavorites: (deckId: string) => Promise<void>;
    isDeckFavorite: (deckId: string) => boolean;
}

const DeckContext = createContext<DeckContextProps | undefined>(undefined);

export const DeckProvider = ({ children }: { children: ReactNode }) => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
    const [favoriteDeckIds, setFavoriteDeckIds] = useState<string[]>([]);

    useEffect(() => {
        const loadDecks = async () => {
            await initDatabase();
            const [allDecks, favoriteIds] = await Promise.all([
                getDecksWithCardsFromDB(),
                getFavoriteDeckIds()
            ]);

            setDecks(allDecks);
            setFavoriteDeckIds(favoriteIds);
        };
        loadDecks();
    }, []);

    const addDeck = async (title: string, cards: Card[] = []) => {
        const id = uuid();
        await dbAddDeck(id, title);
        for (const card of cards) {
            await dbAddCard(card, id);
        }
        setDecks(prev => [{ id, title, cards }, ...prev]);
        return id;
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

    const reorderDecks = async (newOrder: Deck[]) => {
        const db = await getDB();
        const updatePromises = newOrder.map((deck, index) =>
            db.runAsync(`UPDATE decks SET position = ? WHERE id = ?`, index, deck.id)
        );
        await Promise.all(updatePromises);

        setDecks(newOrder);
    };

    const saveDeckToFavorites = async (deckId: string) => {
        if (!favoriteDeckIds.includes(deckId)) {
            await saveDeckAsFavorite(deckId);
            setFavoriteDeckIds(prev => [deckId, ...prev]);
        }
    };

    const removeDeckFromFavorites = async (deckId: string) => {
        if (favoriteDeckIds.includes(deckId)) {
            await removeDeckFromFavoritesInDB(deckId);
            setFavoriteDeckIds(prev => prev.filter(id => id !== deckId));
        }
    };

    const isDeckFavorite = (deckId: string) => favoriteDeckIds.includes(deckId);
    const savedDecks = favoriteDeckIds
        .map(id => decks.find(deck => deck.id === id))
        .filter((d): d is Deck => !!d)

    return (
        <DeckContext.Provider value={{ 
            decks,
            savedDecks, 
            selectedDeckId, 
            setSelectedDeckId, 
            addDeck, 
            addCard, 
            deleteDeck, 
            deleteCard, 
            editDeck, 
            editCard, 
            importDeck,
            reorderDecks,
            saveDeckToFavorites,
            isDeckFavorite,
            removeDeckFromFavorites,
        }}>
            {children}
        </DeckContext.Provider>
    );
}

export const useDecks = () => {
    const context = useContext(DeckContext);
    if (!context) throw new Error('useDecks must be used within a DeckProvider');
    return context;
};