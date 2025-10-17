import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface MenuContextValue {
    isMenuVisible: boolean;
    openMenu: () => void;
    closeMenu: () => void;
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const openMenu = useCallback(() => setMenuVisible(true), []);
    const closeMenu = useCallback(() => setMenuVisible(false), []);

    return (
        <MenuContext.Provider value={{ isMenuVisible, openMenu, closeMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu must be used within a MenuProvider");
    }
    return context;
};