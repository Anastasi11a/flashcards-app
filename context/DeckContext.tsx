import { createContext, useContext, useEffect, useState, useCallback } from "react";
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
        editFolder: (folderId: string, newTitle: string) => Promise<void>;
        removeFolder: (folderId: string) => Promise<void>;
        removeDeckFromFolder: (folderId: string, deckId: string) => Promise<void>;
        moveDecksToFolder: (deckIds: string[], targetFolderId: string) => Promise<void>;
        reorderFolders: (newOrder: Folder[]) => Promise<void>;
        updateFolderDeckOrder: (folderId: string, sortedDecks: Deck[]) => Promise<void>;
    };
    reload: () => Promise<void>;
};

const DeckContext = createContext<DeckContextType | undefined>(undefined);

export const DeckProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [folders, setFolders] = useState<FolderWithDecks[]>([]);

    const reload = useCallback(async (): Promise<void> => {
        const [allDecks, allFolders] = await Promise.all([
            db.getDecks(),
            db.getFoldersWithDecks(),
        ]);
        setDecks(allDecks);
        setFolders(allFolders);
    }, []);

    useEffect(() => {
        (async () => {
            await db.initDatabase();
            await reload();
        })();
    }, [reload]);

    // --- Decks ---
    const actions = {
        addDeck: useCallback(async (
            id: string, title: string
        ) => {
            await db.addDeck(id, title);
            await reload();
        }, [reload]),

        editDeck: useCallback(async (
            deckId: string, newTitle: string
        ) => {
            await db.editDeck(deckId, newTitle);
            await reload();
        }, [reload]),

        deleteDeck: useCallback(async (
            deckId: string
        ) => {
            await db.deleteDeck(deckId);
            await reload();
        }, [reload]),

        addCard: useCallback(async (
            card: Card, deckId: string
        ) => {
            await db.addCard(card, deckId);
            await reload();
        }, [reload]),

        editCard: useCallback(async (
            cardId: string, newQuestion: string, newAnswer: string
        ) => {
            await db.editCard(cardId, newQuestion, newAnswer);
            await reload();
        }, [reload]),

        deleteCard: useCallback(async (
            cardId: string
        ) => {
            await db.deleteCard(cardId);
            await reload();
        }, [reload]),

        importDeck: useCallback(async (
            deck: Deck
        ) => {
            await db.importDeckToDB(deck);
            await reload();
        }, [reload]),

        reorderDecks: useCallback(async (
            newOrder: Deck[]
        ) => {
            await db.updateDeckPositions(newOrder);
            await reload();
        }, [reload]),

        reorderCards: useCallback(async (
            deckId: string, sortedCards: Card[]
        ) => {
            await db.reorderCards(deckId, sortedCards);
            await reload();
        }, [reload]),
    };

    // --- Folders ---
    const folderActions = {
        addFolder: useCallback(async (
            id: string, title: string
        ) => {
            await db.addFolder(id, title);
            await reload();
        }, [reload]),

        editFolder: useCallback(async (
            folderId: string, newTitle: string
        ) => {
            await db.editFolder(folderId, newTitle);
            await reload();
        }, [reload]),

        removeFolder: useCallback(async (
            folderId: string
        ) => {
            await db.removeFolder(folderId);
            await reload();
        }, [reload]),

        removeDeckFromFolder: useCallback(async (
            folderId: string, deckId: string
        ) => {
            await db.removeDeckFromFolder(folderId, deckId);
            await reload();
        }, [reload]),

        moveDecksToFolder: useCallback(async (
            deckIds: string[], targetFolderId: string
        ) => {
            await db.moveDecksToFolder(deckIds, targetFolderId);
            await reload();
        }, [reload]),

        reorderFolders: useCallback(async (
            newOrder: Folder[]
        ) => {
            await db.updateFolderPositions(newOrder);
            await reload();
        }, [reload]),

        updateFolderDeckOrder: useCallback(async (
            folderId: string, sortedDecks: Deck[]
        ) => { 
            await db.updateFolderDeckOrder(folderId, sortedDecks); 
            await reload(); 
        }, [reload]),
    };

    return (
        <DeckContext.Provider value={{ decks, folders, actions, folderActions, reload }}>
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