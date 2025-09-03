import { ViewStyle } from "react-native";
import { headerStyle } from "./navigationStyles";

export const HEADER_DEFAULT = (headerStyle.height as number) ?? 120;
const HEADER_SELECT_FOLDER = 110;
const HEADER_REGULAR = 100;

const FOLDER_ITEM_HEIGHT = 80;
const FOLDER_BAR_PADDING_BOTTOM = 12;
const FOLDER_BAR_HEIGHT = FOLDER_ITEM_HEIGHT + FOLDER_BAR_PADDING_BOTTOM;

const NO_FOLDERS_EXTRA = 10;

const TOKENS = {
    gap: 4,
    folderBarPaddingTop: 12,
    paddingHorizontal: 10,
    deckListPaddingBottom: 140,
    deckListMarginVertical: 16,
};

const base = (paddingTop: number): ViewStyle => ({
    gap: TOKENS.gap,
    paddingHorizontal: TOKENS.paddingHorizontal,
    paddingTop,
    flexGrow: 1,
    justifyContent: 'flex-start'
});

export const flatListStyles = {
    appDecks: (): ViewStyle => ({
        ...base(HEADER_DEFAULT),
        marginVertical: TOKENS.deckListMarginVertical,
        paddingBottom: TOKENS.deckListPaddingBottom,
    }),

    bookmarks: (hasFolders: boolean): ViewStyle => {
        const pt =
            HEADER_DEFAULT + (hasFolders ? FOLDER_BAR_HEIGHT : NO_FOLDERS_EXTRA);
        return base(pt);
    },

    selectFolder: (): ViewStyle => base(HEADER_SELECT_FOLDER),
    folderDetail: (): ViewStyle => base(HEADER_SELECT_FOLDER),

    deckList: (isHeaderTransparent = false): ViewStyle => ({
        ...base(isHeaderTransparent ? HEADER_REGULAR : 0),
        marginVertical: TOKENS.deckListMarginVertical,
        paddingBottom: TOKENS.deckListPaddingBottom,
    }),

    folderBar: (): ViewStyle => ({
        paddingHorizontal: TOKENS.paddingHorizontal,
        paddingTop: TOKENS.folderBarPaddingTop,
    }),
};