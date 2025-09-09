import { Text, TextInput, View } from "react-native";
import styled from "styled-components/native";

import ClearButton from "../ClearButton";
import { titleText } from "@/constants/text/textStyles";

export interface TitleInputProps {
    title: string;
    setTitle: (value: string) => void;
}

interface Props extends TitleInputProps {
    inputRef?: React.Ref<TextInput>;
    hintLimit?: number;
}

const TitleInputView = ({ inputRef, title, setTitle, hintLimit = 20 }: Props) => {
    return (
        <CenteredWrapper>
            <InputContainer>
                <StyledInput
                    {...(inputRef ? { ref: inputRef } : {})}
                    value={title}
                    multiline
                    onChangeText={setTitle}
                />
                {title.length > 0 && (
                    <ClearButtonWrapper>
                        <ClearButton onPress={() => setTitle('')} />
                    </ClearButtonWrapper>
                )}
            </InputContainer>

            {title.length >= hintLimit && (
                <HintText>
                    {title.length} characters - recommend to keep max {hintLimit}
                </HintText>
            )}
        </CenteredWrapper>
    );
};

export default TitleInputView;

const CenteredWrapper = styled(View)`
    width: 100%;
    align-items: center;
`;

const InputContainer = styled(View)`
    position: relative;
    width: 100%;
    min-height: 48px;
    justify-content: center;
    border-radius: 10px;
    background-color: #25292e;
`;

const StyledInput = styled(TextInput).attrs({
    selectionColor: '#aaa',
    textAlignVertical: 'top',
})`
    ${titleText}
    width: 100%;
    min-height: 48px;
    padding: 12px 36px 12px 16px;
`;

const ClearButtonWrapper = styled(View)`
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-12px);
`;

const HintText = styled(Text)`
    align-self: flex-start;
    margin-top: 6px;
    margin-left: 4px;
    font-size: 12px;
    font-style: italic;
    color: #aaa;
`;