import { Text, Pressable } from "react-native";
import styled from "styled-components/native";

interface DeckCardItemProps {
    isAnswerVisible: boolean;
    question: string;
    answer: string;
    onPress: () => void;
}

const DeckCardItem = ({ 
    isAnswerVisible, question, answer, onPress 
}: DeckCardItemProps) => (
    <DeckContainer onPress={onPress}>
        <StyledQuestion>{question}</StyledQuestion>
        {isAnswerVisible && 
            <StyledAnswer>{answer}</StyledAnswer>
        }
    </DeckContainer>
);

export default DeckCardItem;

const DeckContainer = styled(Pressable)`
    padding: 12px 16px;
    border-radius: 10px;
    background-color: #25292e;
`;

const StyledInput = styled(Text)`
    line-height: 22px;
    letter-spacing: 0.4px;
    text-align-vertical: top;
`; 

const StyledQuestion = styled(StyledInput)`
    font-size: 18px;
    font-weight: bold;
    color: #0a7ea4;
`;

const StyledAnswer = styled(StyledInput)`
    margin-top: 10px;
    font-size: 16px;
    color: #e6e6e6;
`;