import { Text, Pressable } from "react-native";
import styled from "styled-components/native";

interface Props {
    isAnswerVisible: boolean;
    question: string;
    answer: string;
    onPress: () => void;
}

const DeckCardItem = ({ isAnswerVisible, question, answer, onPress }: Props) => (
    <DeckContainer onPress={onPress}>
        <StyledQuestion>{question}</StyledQuestion>
        {isAnswerVisible && (
            <StyledAnswer>{answer}</StyledAnswer>
        )}
    </DeckContainer>
);

export default DeckCardItem;

const DeckContainer = styled(Pressable)`
    padding: 12px 16px;
    border-radius: 10px;
    background-color: #252930;
`;

const BaseText = styled(Text)`
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.3px;
    text-align-vertical: top;
`; 

const StyledQuestion = styled(BaseText)`
    font-weight: 600;
    color: #4da6ff;
`;

const StyledAnswer = styled(BaseText)`
    margin-top: 12px;
    font-weight: 400;
    color: #e6e6e6;
`;