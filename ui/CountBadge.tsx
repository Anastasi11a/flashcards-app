import { View, Text } from "react-native";
import styled from "styled-components/native";

interface Props {
    icon: React.ElementType;
    iconName: string;
    iconSize?: number;
    iconColor?: string;
    style?: object;
    count: number;
}

const CountBadge = ({ 
    icon: Icon, 
    iconName,
    iconSize = 14, 
    iconColor = '#b3b3b3',
    style,
    count
}: Props) => {
    return (
        <CountRow style={style}>
            <Icon name={iconName} size={iconSize} color={iconColor} />
            <CountText>{count}</CountText>
        </CountRow>
    );
};

export default CountBadge;

const CountRow = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
`;

const CountText = styled(Text)`
    font-size: 12px;
    color: #b3b3b3;
`;