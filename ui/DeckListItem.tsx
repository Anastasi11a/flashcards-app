import { Text, Pressable, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import styled from "styled-components/native";

interface DeckListItemProps {
    title: string;
    onPress: () => void;
    onLongPress?: () => void;
    isActive?: boolean;
    isFavorite?: boolean;
}

const DeckListItem = ({ 
    title, onPress, onLongPress, isActive, isFavorite 
}: DeckListItemProps) => (
    <DeckContainer 
        onPress={onPress}
        onLongPress={onLongPress}
        $isActive={isActive}>

        <DirectionView>
            {isFavorite ? (
                <BookmarkIcon name='bookmark' />
            ) : (
                <BookmarkPlaceholder />
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
    background-color: ${({ $isActive }) => ($isActive ? '#2f343a' : '#25292e')};
`;

const DirectionView = styled(View)`
    flex-direction: row;
    align-items: center;
`;

const DeckTitle = styled(Text)`
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

const BookmarkPlaceholder = styled(View)`
    width: 20px;
    margin-right: 4px;
`;