import { ColorManager } from "./ColorManager";

export const getTheme = (theme: 'dark' | 'light') => ({
    colors: ColorManager.getTheme(theme),
});