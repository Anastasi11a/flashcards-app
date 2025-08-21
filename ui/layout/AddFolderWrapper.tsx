import { View } from "react-native";
import styled from "styled-components/native";

interface Props {
    children: React.ReactNode;
}

const AddFolderWrapper = ({ children }: Props) => {
    return (
        <CenteredWrapper>
            <InnerWrapper>{children}</InnerWrapper>
        </CenteredWrapper>
    );
};

export default AddFolderWrapper;

const CenteredWrapper = styled(View)`
    flex: 1;
    align-items: center;
`;

const InnerWrapper = styled(View)`
    align-items: flex-start;
`;