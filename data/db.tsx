import * as SQLite from 'expo-sqlite';
import { Card, Deck, DeckRow, DBCard } from './decks';

let dbInstance: SQLite.SQLiteDatabase | null = null;

export const getDB = async () => {
    if (!dbInstance) {
        dbInstance = await SQLite.openDatabaseAsync('flashcards.db');
    }
    return dbInstance;
};

export const initDatabase = async () => {
    const db = await getDB();
    await db.execAsync(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS decks (
            id TEXT PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            position INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS cards (
            id TEXT PRIMARY KEY NOT NULL,
            deck_id TEXT NOT NULL,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS favorites (
            id TEXT PRIMARY KEY NOT NULL,
            added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id) REFERENCES decks(id) ON DELETE CASCADE
        );
    `);
};

export const addDeck = async (id: string, title: string): Promise<void> => {
    const db = await getDB();

    const result = await db.getFirstAsync<{ count: number }>(
        `SELECT COUNT(*) as count FROM decks`
    );
    const count = result?.count ?? 0;

    await db.runAsync(
        `INSERT INTO decks (id, title, position) VALUES (?, ?, ?)`,
        id,
        title,
        count
    );
};

export const addCard = async (card: Card, deckId: string): Promise<void> => {
    const db = await getDB();
    await db.runAsync(
        `INSERT INTO cards (id, deck_id, question, answer) VALUES (?, ?, ?, ?)`,
        card.id,
        deckId,
        card.question,
        card.answer,
    );
};

export const editDeck = async (deckId: string, newTitle: string): Promise<void> => {
    const db = await getDB();
    await db.runAsync(
        `UPDATE decks SET title = ? WHERE id = ?`,
        newTitle,
        deckId
    );
};

export const editCard = async (
    cardId: string,
    newQuestion: string,
    newAnswer: string
): Promise<void> => {
    const db = await getDB();
    await db.runAsync(
        `UPDATE cards SET question = ?, answer = ? WHERE id = ?`,
        newQuestion, newAnswer, cardId
    );
};

export const deleteDeck = async (deckId: string): Promise<void> => {
    const db = await getDB();
    await db.runAsync(
        `DELETE FROM decks WHERE id = ?`,
        deckId
    );
};

export const deleteCard = async (cardId: string): Promise<void> => {
    const db = await getDB();
    await db.runAsync(
        `DELETE FROM cards WHERE id = ?`,
        cardId
    );
};

export const importDeckToDB = async (deck: Deck): Promise<void> => {
    await addDeck(deck.id, deck.title);

    for (const card of deck.cards) {
        await addCard(card, deck.id);
    }
};

export const saveDeckAsFavorite = async (deckId: string): Promise<void> => {
    const db = await getDB();

    const existing = await db.getFirstAsync<{ count: number }>(
        `SELECT COUNT(*) as count FROM favorites WHERE id = ?`,
        deckId
    );

    if (existing?.count === 0) {
        await db.runAsync(
            `INSERT INTO favorites (id) VALUES (?)`,
            deckId
        );
    }
};

export const getFavoriteDeckIds = async (): Promise<string[]> => {
    const db = await getDB();
    const rows = await db.getAllAsync<{ id: string }>(
        `SELECT id FROM favorites ORDER BY datetime(added_at) DESC`
    );
    return rows.map(row => row.id);
};

export const removeDeckFromFavoritesInDB = async (deckId: string): Promise<void> => {
    const db = await getDB();
    await db.runAsync(
        `DELETE FROM favorites WHERE id = ?`,
        deckId
    );
};

export const getDecksWithCardsFromDB = async (): Promise<Deck[]> => {
    try {
        const db = await getDB();
        
        const decksRaw = await db.getAllAsync<DeckRow>(
            `SELECT * FROM decks ORDER BY position ASC`
        );

        const cardsRaw = await db.getAllAsync<DBCard>(
            `SELECT * FROM cards ORDER BY datetime(created_at) DESC`
        );

        const decks: Deck[] = decksRaw.map((deckRow) => ({
            id: deckRow.id,
            title: deckRow.title,
            cards: cardsRaw
                .filter((card) => card.deck_id === deckRow.id)
                .map(({ id, question, answer }) => ({ id, question, answer })),
        }));

        return decks;
    } catch (error) {
        console.log('Error fetching decks from the database:', error);
        return [];
    }
};