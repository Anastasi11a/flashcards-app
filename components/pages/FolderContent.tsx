import type { FolderWithDecks } from "@/data/decks";
import FolderList from "../common/FolderList";
import { useFolderActions } from "@/hooks/useFolderActions";
import MenuPopupButton from "@/ui/buttons/MenuPopupButton";
import { ScreenContainer } from "@/ui/container/ScreenContainer";

interface Props {
    folder: FolderWithDecks;
    isMenuVisible: boolean;
    onCloseMenu: () => void;
}

const FolderContent = ({ folder, isMenuVisible, onCloseMenu }: Props) => {
    const { menuButtons } = useFolderActions(folder, onCloseMenu);

    return (
        <ScreenContainer>
            <MenuPopupButton
                isVisible={isMenuVisible}
                buttons={menuButtons}
                onClose={onCloseMenu}
            />
            <FolderList folderId={folder.id} />
        </ScreenContainer>
    );
};

export default FolderContent;