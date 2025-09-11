import { useRouter } from "expo-router";

export function useSaveModal(save: () => void) {
    const router = useRouter();

    const onSave = () => {
        save();
        router.back();
    };

    return { onSave };
};