import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

import { useDecks } from "@/context/DeckContext";
import { useDeckMenuButtons } from "@/hooks/useDeckMenuButtons";
import { useConfirmDeleteDeck } from "@/hooks/useConfirmDeleteDeck";
import { showExportOptions } from "@/utils/showExportOptions";
import DeckList from "../DecksList";
import MenuPopupButton from "../MenuPopupButton";
import EditTitleModal from "../EditTitleModal";

interface DeckDetailScreenProps {
    deckId?: string;
    isMenuVisible: boolean;
    onCloseMenu: () => void;
}

const DeckDetailScreen = ({ deckId, isMenuVisible, onCloseMenu }: DeckDetailScreenProps) => {
    const { decks, addCard, editDeck, deleteCard } = useDecks();
    const deck = decks.find((d) => d.id === deckId);
    const router = useRouter();
    const headerHeight = useHeaderHeight();
    const confirmDeleteDeck = useConfirmDeleteDeck();

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [newTitle, setNewTitle] = useState(deck?.title ?? '');

    if (!deck || !deckId) return null;

    const handleEditCardPressed = (cardId: string) => {
        router.push({
            pathname: '/(modals)/edit-card',
            params: { deckId, cardId },
        });
    };

    const handleDeleteCard = (deckId: string, cardId: string) => {
        deleteCard(deckId, cardId);
    };

    const handleAddPressed = () => { 
        onCloseMenu();
        router.push({
            pathname: '/(modals)/add-new-card',
            params: { deckId },
        });
    };

    const handleEditTitlePressed = () => {
        setNewTitle(deck.title);
        setIsEditingTitle(true);
        onCloseMenu();
    };

    const handleExportDeck = useCallback(() => {
        if (deck) showExportOptions(deck, onCloseMenu);
    }, [deck]);

    const handleDeleteDeck = (deckId: string) => {
        onCloseMenu();
        confirmDeleteDeck(deckId);
    };

    const menuButtons = useDeckMenuButtons({
        deckId,
        onAdd: handleAddPressed,
        onEdit: handleEditTitlePressed,
        onExport: handleExportDeck,
        onDelete: handleDeleteDeck,
    });

    return (
        <>
            <MenuPopupButton
                isVisible={isMenuVisible}
                buttons={menuButtons()} 
                onClose={onCloseMenu}
            />
            <DeckList 
                deckId={deckId}
                cards={deck.cards}
                paddingTop={headerHeight}
                onDelete={handleDeleteCard}
                onEdit={(_, cardId) => handleEditCardPressed(cardId)}
            />
            <EditTitleModal
                visible={isEditingTitle}
                title={newTitle}
                maxLengthHint={25}
                onChangeTitle={setNewTitle}
                onSave={() => {
                    if (newTitle.trim()) {
                        editDeck(deckId, newTitle.trim());
                    }
                    setIsEditingTitle(false);
                }}
                onClose={() => setIsEditingTitle(false)}
            />
        </>
    );
};

export default DeckDetailScreen;