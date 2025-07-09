import { useState, useCallback } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import uuid from "uuid-random";

import { useDecks } from "@/context/DeckContext";
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

const DeckDetailScreen = ({ deckId, isMenuVisible, onCloseMenu }: DeckDetailScreenProps) => {
    const { decks, deleteCard, addCard, editCard, editDeck } = useDecks();
    const deck = decks.find((d) => d.id === deckId);
 
    const confirmDeleteDeck = useConfirmDeleteDeck();
    const headerHeight = useHeaderHeight();

    const [isEditingCard, setIsEditingCard] = useState(false);
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [editingCardId, setEditingCardId] = useState<string | null>(null);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [newTitle, setNewTitle] = useState(deck?.title ?? '');

    if (!deck || !deckId) return null;

    const handleEditCard = (cardId: string) => {
        const card = deck.cards.find((c) => c.id === cardId);
        if (card) {
            setEditingCardId(cardId);
            setQuestion(card.question);
            setAnswer(card.answer);
            setIsEditingCard(true);
        }
    };

    const handleSaveEditedCard = () => {
        if (editingCardId && question.trim() && answer.trim()) {
            editCard(deckId, editingCardId, question.trim(), answer.trim());
            resetCardModal();
        }
    };

    const handleSaveNewCard = () => {
        if (question.trim() && answer.trim()) {
            addCard(deckId, {
                id: uuid(),
                question: question.trim(),
                answer: answer.trim(),
            });
            resetCardModal();
        }
    };

    const resetCardModal = () => {
        setEditingCardId(null);
        setQuestion('');
        setAnswer('');
        setIsEditingCard(false);
        setIsAddingCard(false);
    };

    const handleDeleteCard = (deckId: string, cardId: string) => {
        deleteCard(deckId, cardId);
    };

    const handleAddPressed = () => { 
        resetCardModal();
        setIsAddingCard(true);
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
                onEdit={(_, cardId) => handleEditCard(cardId)}
            />
            <EditCardModal
                visible={isAddingCard || isEditingCard}
                question={question}
                answer={answer}
                onChangeQuestion={setQuestion}
                onChangeAnswer={setAnswer}
                onSave={isEditingCard ? handleSaveEditedCard : handleSaveNewCard}
                onClose={resetCardModal}
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