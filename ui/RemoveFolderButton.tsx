import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ButtonGradientView from "./ButtonGradientView";

interface Props {
    reset?: boolean;
    onPress: () => void;
}

const RemoveFolderButton = ({ reset = false, onPress }: Props) => {
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        if (reset) {
            setPressed(false);
        }
    }, [reset]);

    const handlePress = () => {
        setPressed(true);
        onPress?.();
    };

    return (
        <ButtonGradientView
            icon={MaterialCommunityIcons}
            iconName='folder-remove'
            buttonSize={42}
            borderRadius={16}
            gradientVariant={pressed ? 'DELETE' : 'GRAY'}
            onPress={handlePress}
        />
    );
};

export default RemoveFolderButton;