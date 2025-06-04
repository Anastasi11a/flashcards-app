export interface ThemeColors {
    background: string
    text: string
    primary: string
    card: string
    tabIconDefault?: string
    tabIconSelected?: string
}

export const lightTheme: ThemeColors = {
    background: '#ffffff',
    text: '#333333',
    primary: '#0a7ea4',
    card: '#f2f2f2',
    tabIconDefault: '#918E89',
    tabIconSelected: '#0a7ea4',
};

export const darkTheme: ThemeColors = {
    background: '#1c1c1e',
    text: '#ffffff',
    primary: '#0a84ff',
    card: '#2c2c2e',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#0a7ea4',
};

export type ThemeType = typeof lightTheme;