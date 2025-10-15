import React, { ReactNode } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

const CardInputContainer = ({ children }: { children: ReactNode }) => {
    return <CardInputsWrapper>{children}</CardInputsWrapper>;
};

export default CardInputContainer;

const CardInputsWrapper = styled(View)`
    padding: 10px;
`;