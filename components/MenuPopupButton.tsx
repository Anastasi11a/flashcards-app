import MenuPopupView, { MenuOptionProps } from "@/ui/MenuPopupView";

interface MenuPopupProps {
    isVisible?: boolean;
    buttons: MenuOptionProps[];
    onClose?: () => void;
}

const MenuPopupButton = ({ isVisible, buttons, onClose }: MenuPopupProps) => {
    return (
        <MenuPopupView
            isVisible={isVisible}
            buttons={buttons}
            onClose={onClose}
        />
    );
};

export default MenuPopupButton;