import { View, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

import CountBadge from "./CountBadge";
import { CHECKBOX } from "@/constants/colors/gradient";
import DeckBackground from "./buttons/DeckBackground";
import { TitleText } from "./common/TitleText";

export interface Props {
    title: string;
    cardCount?: number;
    onPress?: () => void;
    onLongPress?: () => void;
    
    showCheckbox?: boolean; 
    checked?: boolean;
    onToggleCheck?: () => void;
}

const DeckListView = ({ 
    title, 
    cardCount = 0,
    onPress, 
    onLongPress,
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
            <DeckBackground>
                <DirectionView>
                    <TitleContainer>
                        <DeckTitle numberOfLines={1} ellipsizeMode='tail'>
                            {title}
                        </DeckTitle>
                        
                        {cardCount > 0 && (
                            <CountBadge 
                                icon={MaterialCommunityIcons} 
                                iconName='card-multiple' 
                                count={cardCount} 
                            />
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
            </DeckBackground>
        </TouchableOpacity>
    );
};

export default DeckListView;

const DirectionView = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const TitleContainer = styled(View)`
    flex: 1;
`;

const DeckTitle = styled(TitleText)`
    padding-bottom: 6px;
`;

const CheckBoxIcon = styled(Ionicons).attrs<{ checked: boolean }>(({ checked }) => ({
    size: 32,
    color: checked ? CHECKBOX.CHECKED : CHECKBOX.UNCHECKED,
}))``;