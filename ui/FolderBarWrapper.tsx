import { View } from "react-native";
import styled from "styled-components/native";

import { HEADER_HEIGHT } from "@/constants/height/header";

const FolderBarWrapper = styled(View)`
    position: absolute;
    top: ${HEADER_HEIGHT}px;
    left: 0;
    right: 0;
    padding-bottom: 12px;
    z-index: 5;
`;

export default FolderBarWrapper;