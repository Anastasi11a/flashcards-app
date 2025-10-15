import { Alert } from 'react-native';
import uuid from 'uuid-random';

import { Deck, Card } from '@/data/decks';
import { importDeck as pickDeckFile } from './importDeck';

function isDuplicateTitle(existingDecks: Deck[], title: string): boolean {
    const normalized = title.trim();
    return existingDecks.some((d) => d.title.trim() === normalized);
};

export async function handleImportDeck(
    importDeck: (deck: Deck) => Promise<void>,
    existingDecks: Deck[]
): Promise<void> {
    try {
        const deck = await pickDeckFile();
        if (!deck) return;

        const trimmedTitle = deck.title.trim();

        if (isDuplicateTitle(existingDecks, trimmedTitle)) {
            Alert.alert(
                'Duplicate Deck Title',
                `A deck named '${trimmedTitle}' already exists.`,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Rename',
                        onPress: () => showRenameDialog(deck, importDeck),
                    },
                ]
            );
            return;
        }

        await importWithNewIds(deck, importDeck);
    } catch (err) {
        console.error('Failed to import deck:', err);
        Alert.alert(
            'Import Failed',
            'Could not import the deck. Make sure the file is valid.'
        );
    }
}

async function importWithNewIds(deck: Deck, importDeck: (deck: Deck) => Promise<void>) {
    const newDeckId = uuid();

    const cardsWithNewIds: Card[] = (deck.cards ?? []).map((card) => ({
        id: uuid(),
        question: card.question,
        answer: card.answer,
    }));

    const deckToImport: Deck = {
        id: newDeckId,
        title: deck.title.trim(),
        cards: cardsWithNewIds,
    };

    await importDeck(deckToImport);
}

function showRenameDialog(originalDeck: Deck, importDeck: (deck: Deck) => Promise<void>) {
    Alert.prompt(
        'Rename Deck',
        'Please enter a new title for this deck:',
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Import',
                onPress: async (newTitle?: string) => {
                    const trimmed = newTitle?.trim();
                    if (!trimmed) return;

                    const renamedDeck: Deck = {
                        ...originalDeck,
                        title: trimmed,
                    };

                    await importWithNewIds(renamedDeck, importDeck);
                },
            },
        ],
        'plain-text',
        originalDeck.title
    );
}