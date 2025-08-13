import { Text, Pressable, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import styled from "styled-components/native";

export interface DeckListItemProps {
    title: string;
    onPress: () => void;
    onLongPress?: () => void;
    isActive?: boolean;
    isFavorite?: boolean;
    isBookmarksPage?: boolean;
    showBookmarkIcon?: boolean;
}

const DeckListItem = ({ 
    title, 
    onPress, 
    onLongPress, 
    isActive, 
    isFavorite,
    isBookmarksPage = false,
    showBookmarkIcon = true
}: DeckListItemProps) => (
    <DeckContainer 
        onPress={onPress}
        onLongPress={onLongPress}
        $isActive={isActive}
    >
        <DirectionView>
            {isFavorite && showBookmarkIcon ? (
                <BookmarkIcon name='bookmark' />
            ) : (
                <BookmarkPlaceholder $isBookmarksPage={isBookmarksPage} />
            )}
            
            <DeckTitle numberOfLines={1} ellipsizeMode='tail'>
                {title}
            </DeckTitle>
        </DirectionView>
    </DeckContainer>
);

export default DeckListItem;

const DeckContainer = styled(Pressable)<{ $isActive?: boolean }>`
    padding: 12px 6px;
    border-radius: 10px;
    background-color: ${({ $isActive }) => 
        $isActive ? '#2f343a' : '#25292e'};
`;

const DirectionView = styled(View)`
    flex-direction: row;
    align-items: center;
`;

const DeckTitle = styled(Text)`
    flex: 1;
    font-size: 18px;
    font-weight: bold;
    color: #e6e6e6;
`;

const BookmarkIcon = styled(Entypo).attrs({
    size: 20, 
    color: '#64d1f5',
})`
    margin-right: 4px;
`;

const BookmarkPlaceholder = styled(View)<{ $isBookmarksPage?: boolean }>`
    width: ${({ $isBookmarksPage }) =>
        $isBookmarksPage ? '10px' : '20px'};  
`;