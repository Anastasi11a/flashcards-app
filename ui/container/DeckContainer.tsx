import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

import GradientContainer from "./GradientContainer";
import { CHECKBOX } from "@/constants/colors/gradient";
import { titleText } from "@/constants/text/textStyles";

interface Props {
    title: string;
    cardCount?: number;
    onPress?: () => void;
    onLongPress?: () => void;
    isDeck?: boolean;
    showCountBadge?: boolean;
    showCheckbox?: boolean; 
    checked?: boolean;
    onToggleCheck?: () => void;
}

const DeckContainer = ({ 
    title, 
    cardCount = 0,
    onPress, 
    onLongPress,
    isDeck = true,
    showCountBadge = true,
    showCheckbox = false,
    checked = false,
    onToggleCheck
}: Props) => {
    const handlePress = () => {
        if (showCheckbox) {
            onToggleCheck?.();
        } else {
            onPress?.();
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} onLongPress={onLongPress}>
            <GradientContainer padded={true}>
                <DirectionView>
                    <TitleContainer>
                        <DeckTitle numberOfLines={1} ellipsizeMode='tail'>
                            {title}
                        </DeckTitle>
                        
                        {showCountBadge && (
                            <CountRow>
                                {isDeck ? (
                                    <BadgeMaterialIcon name='card-multiple' />
                                ) : (
                                    <BadgeIonIcon name='albums' />
                                )}
                                <CountText>{cardCount}</CountText>
                            </CountRow>
                        )}
                    </TitleContainer>

                    {showCheckbox && (
                        <TouchableOpacity hitSlop={20} onPress={onToggleCheck}>
                            <CheckBoxIcon 
                                checked={checked} 
                                name={checked ? 'checkbox' : 'square-outline'} 
                            />
                        </TouchableOpacity>
                    )}
                </DirectionView>
            </GradientContainer>
        </TouchableOpacity>
    );
};

export default DeckContainer;

const DirectionView = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const TitleContainer = styled(View)`
    flex: 1;
`;

const DeckTitle = styled(Text)`
    ${titleText}
    padding-bottom: 6px;
`;

const CountRow = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
`;

const CountText = styled(Text)`
    font-size: 12px;
    color: #aaa;
`;

const BadgeMaterialIcon = styled(MaterialCommunityIcons).attrs({
    size: 14,
    color: '#aaa',
})``;

const BadgeIonIcon = styled(Ionicons).attrs({
    size: 14,
    color: '#aaa',
})``;

const CheckBoxIcon = styled(Ionicons).attrs<{ checked: boolean }>(
    ({ checked }) => ({
    size: 32,
    color: checked ? CHECKBOX.CHECKED : CHECKBOX.UNCHECKED,
}))``;