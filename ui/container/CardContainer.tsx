import { Pressable, Text } from "react-native";
import styled from "styled-components/native";

import GradientContainer from "./GradientContainer";

interface Props {
    isAnswerVisible: boolean;
    question: string;
    answer: string;
    onPress: () => void;
}

const CardContainer = ({ isAnswerVisible, question, answer, onPress }: Props) => (
    <GradientContainer>
        <Pressable onPress={onPress}>
            <StyledInput $variant='question'>{question}</StyledInput>
            {isAnswerVisible && (
                <StyledInput $variant='answer'>{answer}</StyledInput>
            )}
        </Pressable>
    </GradientContainer>
);

export default CardContainer;

const StyledInput = styled(Text)<{ $variant: 'question' | 'answer' }>`
    padding: 12px;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.3px;
    text-align-vertical: top;

    font-weight: ${({ $variant }) => ($variant === 'question' ? '700' : '500')};
    color: ${({ $variant }) => ($variant === 'question' ? '#4da6ffea' : '#e6e6e6')};
`;