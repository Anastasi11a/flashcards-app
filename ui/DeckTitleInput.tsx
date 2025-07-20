import { View, TextInput } from "react-native";
import styled from "styled-components/native";

import InputField from "@/components/InputField";
import QuestionInput from "@/ui/QuestionInput";

interface DeckTitleInputProps {
    inputRef: React.Ref<TextInput>;
    title: string;
    placeholder: string;
    onChangeText: (text: string) => void;
}

const DeckTitleInput = ({ 
    inputRef, title, placeholder, onChangeText 
}: DeckTitleInputProps) => {
    return (
        <InputContainer>
            <InputField
                inputRef={inputRef}
                text={title}
                placeholder={placeholder}
                onChangeText={onChangeText}
                maxLengthHint={35}
                InputComponent={QuestionInput}
            />
        </InputContainer>
    );
};

export default DeckTitleInput;

const InputContainer = styled(View)`
    border-radius: 16px;
    background-color: #25292e;
`;