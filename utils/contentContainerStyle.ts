import { ViewStyle } from "react-native";
import { headerStyle } from "./navigationStyles";

const HEADER_HEIGHTS = {
    DEFAULT: (headerStyle.height as number) ?? 120,
    REGULAR: 100,
    FOLDER_CONTENT: 110,
};

const TOKENS = {
    gap: 6,
    paddingHorizontal: 10,
    marginVertical: 16,
    paddingBottom: 140,
};

const base = (paddingTop: number): ViewStyle => ({
    gap: TOKENS.gap,
    paddingHorizontal: TOKENS.paddingHorizontal,
    paddingTop,
    flexGrow: 1,
    justifyContent: 'flex-start'
});

const makeStyle = (paddingTop: number, withDeckList = true): ViewStyle => ({
    ...base(paddingTop),
    ...(withDeckList && {
        marginVertical: TOKENS.marginVertical,
        paddingBottom: TOKENS.paddingBottom,
    }),
});

const memo = new Map<string, ViewStyle>();
const getMemoizedStyle = (key: string, creator: () => ViewStyle): ViewStyle => {
    const cached = memo.get(key);
    if (cached) return cached;

    const style = creator();
    memo.set(key, style);
    return style;
};

type FlatListStyles = {
    appDecks: () => ViewStyle;
    deckList: (variant: 'regular' | 'transparent') => ViewStyle;
    selectFolder: () => ViewStyle;
    folderDetail: () => ViewStyle;
};

export const flatListStyles: FlatListStyles = {
    appDecks: () => 
        getMemoizedStyle('appDecks', () => makeStyle(HEADER_HEIGHTS.DEFAULT)),

    deckList: (variant) => {
        const key = `deckList_${variant}`;
        return getMemoizedStyle(key, () =>
            makeStyle(variant === 'transparent' ? HEADER_HEIGHTS.REGULAR : 0),
        );
    },
        
    selectFolder: () => 
        getMemoizedStyle('selectFolder', () => makeStyle(HEADER_HEIGHTS.REGULAR)),

    folderDetail: () => 
        getMemoizedStyle('folderDetail', () => makeStyle(
            HEADER_HEIGHTS.FOLDER_CONTENT, 
            false
        )),
};