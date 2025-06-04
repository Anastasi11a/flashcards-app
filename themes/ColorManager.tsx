export enum ColorKeys {
    Background = 'background',
    Container = 'container',
    TextColor = 'textColor',
}

type ThemeName = 'dark' | 'light';
type ThemeColors = Record<ColorKeys, string>;

const fallbackColor = '#0a84ff';

const themes: Record<ThemeName, ThemeColors> = {
    dark: {
        [ColorKeys.Background]: '#1A1C20',
        [ColorKeys.Container]: '#25282E',
        [ColorKeys.TextColor]: '#e6e6e6',
    },
    light: {
        [ColorKeys.Background]: '#ffffff',
        [ColorKeys.Container]: '#cccccc',
        [ColorKeys.TextColor]: '#1A1C20',
    },
};

export const ColorManager = {
    getColor(theme: ThemeName, key: ColorKeys): string {
        const themeColors = themes[theme];
        const color = themeColors?.[key];

        if (!color) {
            console.warn(`Color "${key}" not found for theme "${theme}".`);
            return fallbackColor;
        }
        return color;
    },
    getTheme(theme: ThemeName): ThemeColors {
        return themes[theme] ?? themes.dark;
    },
};
