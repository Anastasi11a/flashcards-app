import { Text, Pressable } from "react-native";
import styled from "styled-components/native";

interface DeckListItemProps {
    title: string;
    onPress: () => void;
}

const DeckListItem = ({ title, onPress }: DeckListItemProps) => (
    <DeckContainer onPress={onPress}>
        <DeckTitle numberOfLines={1} ellipsizeMode='tail'>
            {title}
        </DeckTitle>
    </DeckContainer>
);

export default DeckListItem;

const DeckContainer = styled(Pressable)`
    padding: 12px 16px;
    border-radius: 10px;
    background-color: #25292e;
`;

const DeckTitle = styled(Text)`
    font-size: 18px;
    font-weight: bold;
    color: #0a7ea4;
`;