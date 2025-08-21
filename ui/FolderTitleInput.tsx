import { View, TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";

import ClearButton from "./ClearButton";

interface Props extends TextInputProps {
    inputRef?: React.Ref<TextInput>;
    value: string;
    onChangeText: (text: string) => void;
}

const FolderTitleInput = ({ inputRef, value, onChangeText, ...rest }: Props) => {
    return (
        <CenteredWrapper>
            <InputContainer>
                <StyledInput
                    {...(inputRef ? { ref: inputRef } : {})}
                    value={value}
                    onChangeText={onChangeText}
                    multiline
                    {...rest}
                />
                {value.length > 0 && (
                    <ClearButtonWrapper>
                        <ClearButton onPress={() => onChangeText("")} />
                    </ClearButtonWrapper>
                )}
            </InputContainer>
        </CenteredWrapper>
    );
};

export default FolderTitleInput;

const CenteredWrapper = styled(View)`
    align-items: center;
    margin-bottom: 4px;
`;

const InputContainer = styled(View)`
    width: 220px;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #2f343a;
`;

const StyledInput = styled(TextInput).attrs({
    selectionColor: '#aaa',
})`
    width: 100%;
    height: 100%;
    padding: 12px 36px 12px 16px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0.2px;
    color: #fff;
`;

const ClearButtonWrapper = styled(View)`
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-12px);
`;