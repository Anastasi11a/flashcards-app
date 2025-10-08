import { router } from "expo-router";

export type TitleParams = {
    deckId?: string;
    mode: 'edit' | 'create-deck' | 'create-folder';
    presentation?: 'modal' | 'card';
};

export type FolderParams = {
    folderId?: string;
    fromCreate?: string;
};

export const navigateToDecks = () => {
    router.push('/(tabs)');
};

export const navigateToCreateDeck = () => {
    router.push({
        pathname: '/(modals)/title',
        params: { mode: 'create-deck' },
    });
};

export const navigateToAddCard = (deckId: string) => {
    router.push({
        pathname: '/(modals)/card',
        params: { deckId },
    });
};

export const navigateToCards = (deckId: string) => {
    router.push({
        pathname: '/deck/deck-detail',
        params: { deckId },
    })
};

export const navigateToEditCard = (deckId: string, cardId: string) => {
    router.push({
        pathname: '/(modals)/card',
        params: { deckId, cardId },
    });
};

export const navigateToEditTitle = (deckId: string) => {
    router.push({
        pathname: '/(modals)/title',
        params: { deckId, mode: 'edit', presentation: 'modal' },
    });
};

export const navigateToAddFolder = () => {
    router.push({
        pathname: '/(modals)/title',
        params: { mode: 'create-folder' },
    });
};

export const navigateToFolder = (folderId: string, fromCreate = false) => {
    router.push({
        pathname: '/folder/folder-detail',
        params: { 
            folderId,
            fromCreate: fromCreate ? 'true' : 'false',
        },
    });
};

export const navigateBackToFolders = () => {
    router.replace('/(tabs)/about');
};