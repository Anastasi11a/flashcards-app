import { useCallback } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import EditCardModal from "@/components/EditCardModal";
import { useDecks } from "@/context/DeckContext";
import useCardEditor from "@/hooks/useCardEditor";
import DeckList from "../DecksList";
import MenuPopupButton from "../MenuPopupButton";

interface DeckDetailScreenProps {
    deckId?: string;
    isMenuVisible: boolean;
    onCloseMenu: () => void;
}

const DeckDetailScreen = (props: DeckDetailScreenProps) => {
    const router = useRouter();
    const { decks, deleteDeck, deleteCard, addCard, editCard } = useDecks();
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

    const handleDeleteCard = (deckId: string, cardId: string) => {
        deleteCard(deckId, cardId);
    };

    const handleAddPressed = () => { 
        startAdding();
        props.onCloseMenu();
    };

    const handleEditPressed = () => {
        console.log('Edit Deck title pressed');
        props.onCloseMenu();
    };
    
    const handleDeleteDeck = (deckId: string) => {
        props.onCloseMenu();

        Alert.alert(
            "Delete Deck",
            "Are you sure you want to delete this deck?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive",
                    onPress: () => {
                        deleteDeck(deckId);
                        router.replace('/');
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const menuButtons = useCallback(() => {
        return [
            {
                label: 'Add new card',
                icon: <MaterialIcons name='playlist-add' size={24} color='#0a7ea4' />,
                onPress: handleAddPressed,
            },
            {
                label: 'Edit collection name',
                icon: <MaterialIcons name='edit-note' size={24} color='#0a7ea4' />,
                onPress: handleEditPressed,
            },
            {
                label: 'Delete Deck',
                icon: <MaterialIcons name='delete-sweep' size={24} color='#0a7ea4' />,
                onPress: () => handleDeleteDeck(props.deckId!),
            },
        ]
    }, [props.deckId]);

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
        </>
    );
};

export default DeckDetailScreen;