import { View, TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";

import ClearButton from "./ClearButton";
import { BaseContainer } from "@/constants/containers/BaseContainer";
import { baseTextStyles } from "@/constants/text/textStyles";

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

const InputContainer = styled(BaseContainer)`
    width: 220px;
`;

const StyledInput = styled(TextInput).attrs({
    selectionColor: '#aaa',
})`
    ${baseTextStyles}
    width: 100%;
    height: 100%;
    padding: 12px 36px 12px 16px;
`;

const ClearButtonWrapper = styled(View)`
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-12px);
`;