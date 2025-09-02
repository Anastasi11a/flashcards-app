import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import CountBadge from "./CountBadge";
import { BaseContainer } from "@/constants/containers/BaseContainer";
import { baseTextStyles } from "@/constants/text/textStyles";

interface Props {
    title: string;
    count?: number;
    onPress: () => void;
}

const FolderContainer = ({ title, count = 0, onPress }: Props) => {
    return (
        <FolderButton onPress={onPress}>
            <FolderTitle numberOfLines={2} ellipsizeMode='tail'>
                {title}
            </FolderTitle>

            <CountBadgeWrapper 
                icon={Ionicons} 
                iconName='albums' 
                count={count} 
            />
        </FolderButton>
    );
};

export default FolderContainer;

const FolderButton = styled(BaseContainer).attrs({
    as: TouchableOpacity,
})`
    position: relative;
    width: 160px;
    margin-right: 8px;
    align-items: flex-start;
    
`;

const FolderTitle = styled(Text)`
    ${baseTextStyles}
    width: 100%;
    text-align: left;
    padding: 4px 20px 16px;
`;

const CountBadgeWrapper = styled(CountBadge)`
    position: absolute;
    bottom: 6px;
    left: 20px;
`;