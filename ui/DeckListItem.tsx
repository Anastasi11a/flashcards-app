import { Text, Pressable, View } from "react-native";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import CountBadge from "./CountBadge";
import { DECK_CONTAINER, CHECKBOX } from "@/constants/colors/gradient";

export interface DeckListItemProps {
    title: string;
    onPress?: () => void;
    onLongPress?: () => void;
    cardCount?: number;
    isActive?: boolean;
    isFavorite?: boolean;
    isBookmarksPage?: boolean;
    showBookmarkIcon?: boolean;
    showCheckbox?: boolean; 
    checked?: boolean;
    onToggleCheck?: () => void;
}

const DeckListItem = ({ 
    title, 
    onPress, 
    onLongPress,
    cardCount,
    isActive, 
    isFavorite,
    isBookmarksPage = false,
    showBookmarkIcon = true,
    showCheckbox = false,
    checked = false,
    onToggleCheck
}: DeckListItemProps) => {
    const handlePress = () => {
        if (showCheckbox) {
            onToggleCheck?.();
        } else {
            onPress?.();
        }
    };

    return (
        <DeckContainer 
            onPress={handlePress}
            onLongPress={onLongPress}
            $isActive={isActive}
            $isBookmarksPage={isBookmarksPage}
        >
            <DirectionView>
                <LeftSection>
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
                            <CountBadge 
                                icon={MaterialCommunityIcons} 
                                iconName='card-multiple' 
                                count={cardCount} 
                            />
                        )}
                    </TitleContainer>
                </LeftSection>

                {showCheckbox && (
                    <Pressable hitSlop={12} onPress={onToggleCheck}>
                        <CheckBoxIcon 
                            checked={checked} 
                            name={checked ? 'checkbox' : 'square-outline'} 
                        />
                    </Pressable>
                )}
            </DirectionView>
        </DeckContainer>
    );
};

export default DeckListItem;

const DeckContainer = styled(Pressable)<{ 
    $isActive?: boolean;
    $isBookmarksPage?: boolean; 
}>`
    padding: ${({ $isBookmarksPage }) => 
        $isBookmarksPage ? '10px 6px' : '12px 6px'};
    border-radius: 10px;
    background-color: ${({ $isActive }) => 
        $isActive ? DECK_CONTAINER.ACTIVE : DECK_CONTAINER.INACTIVE};
`;

const DirectionView = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const TitleContainer = styled(View)`
    flex: 1;
`;

const LeftSection = styled(View)`
    flex: 1;
    flex-direction: row;
    margin-right: 6px;
    align-items: center;
`;

const DeckTitle = styled(Text)`
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: #e6e6e6;
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

const CheckBoxIcon = styled(Ionicons).attrs<{ checked: boolean }>(({ checked }) => ({
    size: 32,
    color: checked ? CHECKBOX.CHECKED : CHECKBOX.UNCHECKED,
}))``;