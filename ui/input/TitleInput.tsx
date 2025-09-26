import { forwardRef } from "react";
import { Text, TextInput, View } from "react-native";
import styled from "styled-components/native";

import GradientContainer from "../container/GradientContainer";
import ClearButton from "../buttons/ClearButton";
import { inputText } from "@/constants/text/textStyles";

interface Props {
    title: string;
    setTitle: (value: string) => void;
    hintLimit?: number;
}

const TitleInput = forwardRef<TextInput, Props>(
    ({ title, setTitle, hintLimit = 24 }, ref) => {
        return (
            <Wrapper>
                <GradientContainer>
                    <InputContainer>
                        <StyledInput
                            ref={ref}
                            value={title}
                            multiline
                            onChangeText={setTitle}
                        />
                        {title.length > 0 && (
                            <ClearButton onPress={() => setTitle('')} />
                        )}
                    </InputContainer>
                </GradientContainer>

                {title.length >= hintLimit && (
                    <HintText>
                        {title.length} characters - recommend to keep max {hintLimit}
                    </HintText>
                )}
            </Wrapper>  
        );
    }
);

export default TitleInput;

const Wrapper = styled(View)`
    width: 100%;
`;

const InputContainer = styled(View)`
    position: relative;
    width: 100%;
`;

const StyledInput = styled(TextInput).attrs({
    selectionColor: '#aaa',
    textAlignVertical: 'top',
})`
    ${inputText}
    width: 100%;
    font-weight: 500;
    color: #f2f2f2;
`;

const HintText = styled(Text)`
    align-self: flex-start;
    margin-top: 6px;
    margin-left: 4px;
    font-size: 12px;
    font-style: italic;
    color: #aaa;
`;