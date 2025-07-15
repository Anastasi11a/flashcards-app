import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { SimpleLineIcons } from "@expo/vector-icons";

export const useLoadFont = () => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        async function loadAssets() {
            await Font.loadAsync({
                ...SimpleLineIcons.font,
            });
            setReady(true);
        }

        loadAssets();
    }, []);

    return ready;
};