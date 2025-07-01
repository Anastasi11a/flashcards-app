import { useState, useCallback } from "react";

import EditCardModal from "@/components/EditCardModal";
import EditTitleModal from "../EditTitleModal";
import { useDecks } from "@/context/DeckContext";
import useCardEditor from "@/hooks/useCardEditor";
import { useDeckMenuButtons } from "@/hooks/useDeckMenuButtons";
import { useConfirmDeleteDeck } from "@/hooks/useConfirmDeleteDeck";
import { showExportOptions } from "@/utils/showExportOptions";
import DeckList from "../DecksList";
import MenuPopupButton from "../MenuPopupButton";

interface DeckDetailScreenProps {
    deckId?: string;
    isMenuVisible: boolean;
    onCloseMenu: () => void;
}

const DeckDetailScreen = (props: DeckDetailScreenProps) => {
    const { decks, deleteDeck, deleteCard, addCard, editCard, editDeck } = useDecks();
    const deck = decks.find((d) => d.id === props.deckId);
    
    if (!deck || !props.deckId) return null;
    const {
        isAddingNewCard, newQuestion, newAnswer,
        setNewQuestion, setNewAnswer, startAdding, saveNewCard, resetNewCard, 
        editingCardId, editQuestion, editAnswer, 
        setEditQuestion, setEditAnswer, startEditing, saveEdit, resetEditor
    } = useCardEditor(
        {
            initialCards: deck?.cards ?? [],
            onUpdateCards: (updatedCards) => {
                const updatedCard = updatedCards.find(card => card.id === editingCardId);
                if (updatedCard && editingCardId) {
                    editCard(props.deckId!, updatedCard.id, updatedCard.question, updatedCard.answer);
                } else if (updatedCards.length > deck.cards.length) {
                    const [newCard] = updatedCards.filter(c => !deck.cards.find(dc => dc.id === c.id));
                    if (newCard) addCard(props.deckId!, newCard);
                }
            },
        }
    );
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [newTitle, setNewTitle] = useState(deck?.title ?? '');
    const confirmDeleteDeck = useConfirmDeleteDeck();

    const handleDeleteCard = (deckId: string, cardId: string) => {
        deleteCard(deckId, cardId);
    };

    const handleAddPressed = () => { 
        startAdding();
        props.onCloseMenu();
    };

    const handleEditPressed = () => {
        if (!deck) return;
        setNewTitle(deck.title);
        setIsEditingTitle(true);
        props.onCloseMenu();
    };

    const handleExportDeck = useCallback(() => {
        if (deck) {
            showExportOptions(deck, props.onCloseMenu)
        }
    }, [deck, props]);

    const handleDeleteDeck = (deckId: string) => {
        props.onCloseMenu();
        confirmDeleteDeck(deckId);
    };

    const menuButtons = useDeckMenuButtons({
        deckId: props.deckId!,
        onAdd: handleAddPressed,
        onEdit: handleEditPressed,
        onExport: handleExportDeck,
        onDelete: handleDeleteDeck,
    });

    return (
        <>
            <MenuPopupButton
                isVisible={props.isMenuVisible}
                buttons={menuButtons()} 
                onClose={props.onCloseMenu}
            />
            <DeckList 
                deckId={props.deckId}
                cards={deck.cards} 
                onDelete={handleDeleteCard} 
                onEdit={(_, cardId) => startEditing(cardId)}
            />
            <EditCardModal
                visible={editingCardId !== null}
                question={editQuestion}
                answer={editAnswer}
                onChangeQuestion={setEditQuestion}
                onChangeAnswer={setEditAnswer}
                onSave={saveEdit}
                onClose={resetEditor}
            />
            <EditCardModal
                visible={isAddingNewCard}
                question={newQuestion}
                answer={newAnswer}
                onChangeQuestion={setNewQuestion}
                onChangeAnswer={setNewAnswer}
                onSave={saveNewCard}
                onClose={resetNewCard}
            />
            <EditTitleModal
                visible={isEditingTitle}
                title={newTitle}
                maxLengthHint={25}
                onChangeTitle={setNewTitle}
                onSave={() => {
                    if (props.deckId && newTitle.trim()) {
                        editDeck(props.deckId, newTitle.trim());
                    }
                    setIsEditingTitle(false);
                }}
                onClose={() => setIsEditingTitle(false)}
            />
        </>
    );
};

export default DeckDetailScreen;