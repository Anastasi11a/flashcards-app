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
            <StyledQuestion>{question}</StyledQuestion>
            {isAnswerVisible && (
                <StyledAnswer>{answer}</StyledAnswer>
            )}
        </Pressable>
    </GradientContainer>
);

export default CardContainer;

const BaseText = styled(Text)`
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 0.3px;
    text-align-vertical: top;
`;

const StyledQuestion = styled(BaseText)`
    font-weight: 700;
    color: #4da6ffea;
`;

const StyledAnswer = styled(BaseText)`
    margin-top: 12px;
    font-weight: 500;
    color: #e6e6e6;
`;