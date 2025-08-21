import { View, Text } from "react-native";
import styled from "styled-components/native";

interface Props {
    title: string;
}

const FolderContainer = ({ title }: Props) => {
    return (
        <FolderView>
            <FolderTitle numberOfLines={2} ellipsizeMode='tail'>
                {title}
            </FolderTitle>
        </FolderView>
    );
};

export default FolderContainer;

const FolderView = styled(View)`
    width: 160px;
    height: 70px;
    margin-right: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #2f343a;  
`;

const FolderTitle = styled(Text)`
    width: 100%;
    padding: 12px 16px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0.2px;
    color: #fff;
    text-align: center;
`;