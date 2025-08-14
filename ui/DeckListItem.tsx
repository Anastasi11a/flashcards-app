import { Text, Pressable, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import styled from "styled-components/native";

export interface DeckListItemProps {
    title: string;
    onPress: () => void;
    onLongPress?: () => void;
    cardCount?: number;
    isActive?: boolean;
    isFavorite?: boolean;
    isBookmarksPage?: boolean;
    showBookmarkIcon?: boolean;
}

const DeckListItem = ({ 
    title, 
    onPress, 
    onLongPress,
    cardCount,
    isActive, 
    isFavorite,
    isBookmarksPage = false,
    showBookmarkIcon = true
}: DeckListItemProps) => (
    <DeckContainer 
        onPress={onPress}
        onLongPress={onLongPress}
        $isActive={isActive}
        $isBookmarksPage={isBookmarksPage}
    >
        <DirectionView>
            {isFavorite && showBookmarkIcon ? (
                <BookmarkIcon name='bookmark' />
            ) : (
                <BookmarkPlaceholder $isBookmarksPage={isBookmarksPage} />
            )}

            <TitleContainer>
                <DeckTitle numberOfLines={1} ellipsizeMode='tail'>
                    {title}
                </DeckTitle>

                {isBookmarksPage && cardCount != null && (
                    <CardCount>
                        {cardCount} {cardCount === 1 ? 'card' : 'cards'}
                    </CardCount>
                )}
            </TitleContainer>
        </DirectionView>
    </DeckContainer>
);

export default DeckListItem;

const DeckContainer = styled(Pressable)<{ 
    $isActive?: boolean;
    $isBookmarksPage?: boolean; 
}>`
    padding: ${({ $isBookmarksPage }) => 
        $isBookmarksPage ? '10px 6px' : '12px 6px'};
    border-radius: 10px;
    background-color: ${({ $isActive }) => 
        $isActive ? '#2f343a' : '#25292e'};
`;

const DirectionView = styled(View)`
    flex-direction: row;
    align-items: center;
`;

const TitleContainer = styled(View)`
    flex: 1;
`;

const DeckTitle = styled(Text)`
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: #e6e6e6;
`;

const CardCount = styled(Text)`
    margin-top: 4px;
    font-size: 10px;
    color: #b3b3b3;
`;

const BookmarkIcon = styled(Entypo).attrs({
    size: 20, 
    color: '#64d1f5',
})`
    margin-right: 4px;
`;

const BookmarkPlaceholder = styled(View)<{ 
    $isBookmarksPage?: boolean;
}>`
    width: ${({ $isBookmarksPage }) => 
        $isBookmarksPage ? '10px' : '20px'}; 
    margin-right: 4px;
`;