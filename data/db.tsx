import * as SQLite from 'expo-sqlite';
import { Card, Deck, DeckRow, DBCard, Folder, FolderWithDecks } from './decks';

// import { File, Paths } from 'expo-file-system';
// const dbFile = new File(Paths.document, 'SQLite/flashcards.db');

let dbInstance: SQLite.SQLiteDatabase | null = null;

export const getDB = async () => {
    if (!dbInstance) {
        dbInstance = await SQLite.openDatabaseAsync('flashcards.db');
    }
    return dbInstance;
};

export const initDatabase = async () => {
    // const info = await dbFile.info();
    // if (info.exists) {
    //     await dbFile.delete();
    //     console.log('The old database has been deleted');
    // }

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
            position INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS folders (
            id TEXT PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            position INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS folder_decks (
            folder_id TEXT NOT NULL,
            deck_id TEXT NOT NULL,
            PRIMARY KEY (folder_id, deck_id),
            FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE,
            FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE
        );
    `);
};

// --- helpers ---
const buildDecks = (decks: DeckRow[], cards: DBCard[]): Deck[] =>
    decks.map(deckRow => ({
        id: deckRow.id,
        title: deckRow.title,
        cards: cards
        .filter(c => c.deck_id === deckRow.id)
        .map(({ id, question, answer }) => ({ id, question, answer })),
    })
);

// --- CRUD decks/cards ---
export const addDeck = async (id: string, title: string): Promise<void> => {
    const db = await getDB();
    await db.runAsync(`UPDATE decks SET position = position + 1`);
    await db.runAsync(
        `INSERT INTO decks (id, title, position) VALUES (?, ?, 0)`,
        id,
        title
    );
};

export const addCard = async (card: Card, deckId: string): Promise<void> => {
    const db = await getDB();
    const result = await db.getFirstAsync<{ minPos: number }>(
        `SELECT MIN(position) as minPos FROM cards WHERE deck_id = ?`,
        [deckId]
    );
    const newPosition = (result?.minPos != null) ? result.minPos - 1 : 0;
    await db.runAsync(
        `INSERT INTO cards ( 
            id, deck_id, question, answer, position 
        ) VALUES (?, ?, ?, ?, ?)`,
        card.id,
        deckId,
        card.question,
        card.answer,
        newPosition
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
    await db.runAsync(`DELETE FROM decks WHERE id = ?`, deckId);
};

export const deleteCard = async (cardId: string): Promise<void> => {
    const db = await getDB();
    await db.runAsync(`DELETE FROM cards WHERE id = ?`, cardId);
};

export const importDeckToDB = async (deck: Deck): Promise<void> => {
    const db = await getDB();
    await db.runAsync(`UPDATE decks SET position = position + 1`);
    await db.runAsync(
        `INSERT INTO decks (id, title, position) VALUES (?, ?, 0)`,
        deck.id,
        deck.title
    );
    for (const card of deck.cards) {
        await addCard(card, deck.id);
    }
};

export const updateDeckPositions = async (newOrder: Deck[]): Promise<void> => {
    const db = await getDB();
    const updatePromises = newOrder.map((deck, index) =>
        db.runAsync(`UPDATE decks SET position = ? WHERE id = ?`, index, deck.id)
    );
    await Promise.all(updatePromises);
};

export const getDecks = async (): Promise<Deck[]> => {
    const db = await getDB();
    const decksRaw = await db.getAllAsync<DeckRow>(
        `SELECT * FROM decks ORDER BY position ASC`
    );
    const cardsRaw = await db.getAllAsync<DBCard>(
        `SELECT * FROM cards ORDER BY position ASC`
    );
    return buildDecks(decksRaw, cardsRaw);
};

// --- sort cards ---
export const reorderCards = async (deckId: string, sortedCard: Card[]): Promise<void> => {
    const db = await getDB();
    const updatePromises = sortedCard.map((card, index) =>
        db.runAsync(
            `UPDATE cards SET position = ? WHERE id = ? AND deck_id = ?`,
            index,
            card.id,
            deckId
        )
    );
    await Promise.all(updatePromises);
};

// --- CRUD folders ---
export const addFolder = async (id: string, title: string): Promise<void> => {
    const db = await getDB();
    await db.runAsync(`UPDATE folders SET position = position + 1`);
    await db.runAsync(
        `INSERT INTO folders (id, title, position) VALUES (?, ?, 0)`,
        id,
        title
    );
};

export const addDeckToFolder = async (
    folderId: string, deckId: string
): Promise<void> => {
    const db = await getDB();
    await db.runAsync(
        `INSERT OR IGNORE INTO folder_decks (folder_id, deck_id) VALUES (?, ?)`,
        folderId,
        deckId
    );
};

export const removeFolder = async (folderId: string): Promise<void> => {
    const db = await getDB();
    await db.runAsync(`DELETE FROM folders WHERE id = ?`, folderId);
};

export const removeDeckFromFolder = async (
    folderId: string, deckId: string
): Promise<void> => {
    const db = await getDB();
    await db.runAsync(
        `DELETE FROM folder_decks WHERE folder_id = ? AND deck_id = ?`,
        [folderId, deckId]
    );
};

export const moveDecksToFolder = async (
    deckIds: string[],
    targetFolderId: string
): Promise<void> => {
    const db = await getDB();
    try {
        await db.execAsync("BEGIN");
        for (const deckId of deckIds) {
            await db.runAsync(
                `INSERT OR IGNORE INTO folder_decks (folder_id, deck_id) VALUES (?, ?)`,
                targetFolderId,
                deckId
            );
        }
        await db.execAsync("COMMIT");
    } catch (err) {
        await db.execAsync("ROLLBACK");
        throw err;
    }
};

export const updateFolderPositions = async (newOrder: Folder[]): Promise<void> => {
    const db = await getDB();
    const updatePromises = newOrder.map((folder, index) =>
        db.runAsync(`UPDATE folders SET position = ? WHERE id = ?`, index, folder.id)
    );
    await Promise.all(updatePromises);
};

export const getFoldersWithDecks = async (): Promise<FolderWithDecks[]> => {
    const db = await getDB();

    const folders = await db.getAllAsync<Folder>(
        `SELECT * FROM folders ORDER BY position ASC`
    );
    const folderDecks = await db.getAllAsync<{ folder_id: string; deck_id: string }>(
        `SELECT * FROM folder_decks`
    );
    const decksRaw = await db.getAllAsync<DeckRow>(`SELECT * FROM decks`);
    const cardsRaw = await db.getAllAsync<DBCard>(`SELECT * FROM cards`);

    const decks = buildDecks(decksRaw, cardsRaw);

    return folders.map(folder => {
        const deckIds = folderDecks
            .filter(fd => fd.folder_id === folder.id)
            .map(fd => fd.deck_id);

        return {
            ...folder,
            deckIds,
            decks: decks.filter(d => deckIds.includes(d.id)),
        };
    });
};