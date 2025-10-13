import React, { createContext, useContext, useEffect, useState } from "react";
import { Deck, Card, Folder, FolderWithDecks } from "@/data/decks";
import * as db from "@/data/db";

type DeckContextType = {
    decks: Deck[];
    folders: FolderWithDecks[];
    actions: {
        addDeck: (id: string, title: string) => Promise<void>;
        editDeck: (deckId: string, newTitle: string) => Promise<void>;
        deleteDeck: (deckId: string) => Promise<void>;
        addCard: (card: Card, deckId: string) => Promise<void>;
        editCard: (
            cardId: string, newQuestion: string, newAnswer: string
        ) => Promise<void>;
        deleteCard: (cardId: string) => Promise<void>;
        importDeck: (deck: Deck) => Promise<void>;
        reorderDecks: (newOrder: Deck[]) => Promise<void>;
        reorderCards: (deckId: string, sortedCards: Card[]) => Promise<void>;
    };
    folderActions: {
        addFolder: (id: string, title: string) => Promise<void>;
        addDeckToFolder: (folderId: string, deckId: string) => Promise<void>;
        editFolder: (folderId: string, newTitle: string) => Promise<void>;
        removeFolder: (folderId: string) => Promise<void>;
        removeDeckFromFolder: (folderId: string, deckId: string) => Promise<void>;
        moveDecksToFolder: (deckIds: string[], targetFolderId: string) => Promise<void>;
        reorderFolders: (newOrder: Folder[]) => Promise<void>;
    };
    reload: () => Promise<void>;
};

const DeckContext = createContext<DeckContextType | undefined>(undefined);

export const DeckProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [folders, setFolders] = useState<FolderWithDecks[]>([]);

    const loadData = async () => {
        const [decksFromDb, foldersFromDb] = await Promise.all([
            db.getDecks(),
            db.getFoldersWithDecks(),
        ]);
        setDecks(decksFromDb);
        setFolders(foldersFromDb);
    };

    useEffect(() => {
        (async () => {
            await db.initDatabase();
            await loadData();
        })();
    }, []);

    // --- Decks ---
    const addDeck = async (id: string, title: string) => {
        await db.addDeck(id, title);
        await loadData();
    };

    const editDeck = async (deckId: string, newTitle: string) => {
        await db.editDeck(deckId, newTitle);
        await loadData();
    };

    const deleteDeck = async (deckId: string) => {
        await db.deleteDeck(deckId);
        await loadData();
    };

    const addCard = async (card: Card, deckId: string) => {
        await db.addCard(card, deckId);
        await loadData();
    };

    const editCard = async (cardId: string, newQuestion: string, newAnswer: string) => {
        await db.editCard(cardId, newQuestion, newAnswer);
        await loadData();
    };

    const deleteCard = async (cardId: string) => {
        await db.deleteCard(cardId);
        await loadData();
    };

    const importDeck = async (deck: Deck) => {
        await db.importDeckToDB(deck);
        await loadData();
    };

    const reorderDecks = async (newOrder: Deck[]) => {
        await db.updateDeckPositions(newOrder);
        await loadData();
    };

    const reorderCards = async (deckId: string, sortedCards: Card[]) => {
        await db.reorderCards(deckId, sortedCards);
        await loadData();
    };

    // --- Folders ---
    const addFolder = async (id: string, title: string) => {
        await db.addFolder(id, title);
        await loadData();
    };

    const addDeckToFolder = async (folderId: string, deckId: string) => {
        await db.addDeckToFolder(folderId, deckId);
        await loadData();
    };

    const editFolder = async (folderId: string, newTitle: string) => {
        await db.editFolder(folderId, newTitle);
        await loadData();
    };

    const removeFolder = async (folderId: string) => {
        await db.removeFolder(folderId);
        await loadData();
    };

    const removeDeckFromFolder = async (folderId: string, deckId: string) => {
        await db.removeDeckFromFolder(folderId, deckId);
        await loadData();
    };

    const moveDecksToFolder = async (deckIds: string[], targetFolderId: string) => {
        await db.moveDecksToFolder(deckIds, targetFolderId);
        await loadData();
    };

    const reorderFolders = async (newOrder: Folder[]) => {
        await db.updateFolderPositions(newOrder);
        await loadData();
    };

    return (
        <DeckContext.Provider
            value={{
                decks,
                folders,
                actions: {
                    addDeck,
                    editDeck,
                    deleteDeck,
                    addCard,
                    editCard,
                    deleteCard,
                    importDeck,
                    reorderDecks,
                    reorderCards,
                },
                folderActions: {
                    addFolder,
                    addDeckToFolder,
                    editFolder,
                    removeFolder,
                    removeDeckFromFolder,
                    moveDecksToFolder,
                    reorderFolders,
                },
                reload: loadData,
            }}
        >
        {children}
        </DeckContext.Provider>
    );
};

export const useDecks = (): DeckContextType => {
    const context = useContext(DeckContext);
    if (!context) {
        throw new Error("useDecks must be used within a DeckProvider");
    }
    return context;
};