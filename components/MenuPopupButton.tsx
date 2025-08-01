import MenuPopupView, { MenuPopupViewProps } from "@/ui/MenuPopupView";

type MenuPopupProps = MenuPopupViewProps;

const MenuPopupButton = (props: MenuPopupProps) => {
    return <MenuPopupView {...props} />;
};

export default MenuPopupButton;