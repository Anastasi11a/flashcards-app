import type { FolderWithDecks } from "@/data/decks";
import { useMenu } from "@/context/MenuContext";
import FolderList from "../common/FolderList";
import { useMenuOptions } from "@/hooks/useMenuOptions";
import MenuPopupButton from "@/ui/buttons/MenuPopupButton";
import { ScreenContainer } from "@/ui/container/ScreenContainer";

const FolderContent = ({ entity: folder }: { entity: FolderWithDecks }) => {
    const { isMenuVisible, closeMenu } = useMenu();

    const { menuButtons } = useMenuOptions(folder, closeMenu);

    return (
        <ScreenContainer>
            <MenuPopupButton
                isVisible={isMenuVisible}
                buttons={menuButtons}
                onClose={closeMenu}
            />
            <FolderList folderId={folder.id} />
        </ScreenContainer>
    );
};

export default FolderContent;