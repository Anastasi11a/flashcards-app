import { useState, useCallback } from "react";
import { useHeaderHeight } from "@react-navigation/elements";

import { useDecks } from "@/context/DeckContext";
import { useCardModalManager } from "@/hooks/useCardModalManager";
import { useDeckMenuButtons } from "@/hooks/useDeckMenuButtons";
import { useConfirmDeleteDeck } from "@/hooks/useConfirmDeleteDeck";
import { showExportOptions } from "@/utils/showExportOptions";
import DeckList from "../DecksList";
import MenuPopupButton from "../MenuPopupButton";
import EditCardModal from "@/components/EditCardModal";
import EditTitleModal from "../EditTitleModal";

interface DeckDetailScreenProps {
    deckId?: string;
    isMenuVisible: boolean;
    onCloseMenu: () => void;
}

const DeckDetailScreen = ({ 
    deckId, isMenuVisible, onCloseMenu 
}: DeckDetailScreenProps) => {
    const { decks, addCard, editCard, editDeck, deleteCard } = useDecks();
    const deck = decks.find((d) => d.id === deckId);

    const confirmDeleteDeck = useConfirmDeleteDeck();
    const headerHeight = useHeaderHeight();

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [newTitle, setNewTitle] = useState(deck?.title ?? '');

    const { 
        question, answer, setQuestion, setAnswer,
        isModalVisible, isEditing,
        startAdding, startEditing, save, reset,
    } = useCardModalManager({
        deckId: deckId!, 
        initialCards: deck?.cards || [],
        onAdd: addCard,
        onEdit: editCard,
    });

    if (!deck || !deckId) return null;
    
    const handleDeleteCard = (deckId: string, cardId: string) => {
        deleteCard(deckId, cardId);
    };

    const handleAddPressed = () => { 
        reset();
        startAdding();
        onCloseMenu();
    };

    const handleEditPressed = () => {
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
        onEdit: handleEditPressed,
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
                onEdit={(_, cardId) => startEditing(cardId)}
            />
            <EditCardModal
                visible={isModalVisible}
                question={question}
                answer={answer}
                onChangeQuestion={setQuestion}
                onChangeAnswer={setAnswer}
                onSave={save}
                onClose={reset}
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