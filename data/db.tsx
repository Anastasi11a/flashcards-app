import * as SQLite from 'expo-sqlite';
import { Card, Deck, DeckRow, DBCard } from './decks';

const getDB = async () => {
    return await SQLite.openDatabaseAsync('flashcards.db', {
        useNewConnection: true
    });
};

export const initDatabase = async () => {
    const db = await getDB();
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS decks (
            id TEXT PRIMARY KEY NOT NULL,
            title TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS cards (
            id TEXT PRIMARY KEY NOT NULL,
            deck_id TEXT NOT NULL,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE
        );
    `);
};


export const addDeck = async (
    id: string, title: string
): Promise<void> => {
    const db = await getDB();
    await db.runAsync(
        `INSERT INTO decks (id, title) VALUES (?, ?)`,
        id,
        title
    );
};

export const addCard = async (
    card: Card, deckId: string
): Promise<void> => {
    const db = await getDB();
    await db.runAsync(
        `INSERT INTO cards (id, deck_id, question, answer) VALUES (?, ?, ?, ?)`,
        card.id,
        deckId,
        card.question,
        card.answer,
    );
};

export const editDeck = async (
    deckId: string, newTitle: string
): Promise<void> => {
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

export const deleteDeck = async (
    deckId: string
): Promise<void> => {
    const db = await getDB();
    await db.runAsync(
        `DELETE FROM decks WHERE id = ?`,
        deckId
    );
};

export const deleteCard = async (
    cardId: string
): Promise<void> => {
    const db = await getDB();
    await db.runAsync(
        `DELETE FROM cards WHERE id = ?`,
        cardId
    );
};

export const getDecksWithCardsFromDB = async (): Promise<Deck[]> => {
    try {
        const db = await getDB();
        const decksRaw = await db.getAllAsync<DeckRow>(`SELECT * FROM decks`);
        const cardsRaw = await db.getAllAsync<DBCard>(`SELECT * FROM cards`);

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