import { Text, Pressable } from "react-native";
import styled from "styled-components/native";

interface DeckListItemProps {
    title: string;
    onPress: () => void;
    onLongPress?: () => void;
    isActive?: boolean;
}

const DeckListItem = ({ title, onPress, onLongPress, isActive }: DeckListItemProps) => (
    <DeckContainer 
        onPress={onPress}
        onLongPress={onLongPress}
        $isActive={isActive}>

        <DeckTitle numberOfLines={1} ellipsizeMode='tail'>
            {title}
        </DeckTitle>
    </DeckContainer>
);

export default DeckListItem;

const DeckContainer = styled(Pressable)<{ $isActive?: boolean }>`
    padding: 12px 16px;
    border-radius: 10px;
    background-color: ${({ $isActive }) => ($isActive ? '#2f343a' : '#25292e')};
`;

const DeckTitle = styled(Text)`
    font-size: 18px;
    font-weight: bold;
    color: #0a7ea4;
`;