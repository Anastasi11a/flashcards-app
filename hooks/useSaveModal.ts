import { useRouter } from "expo-router";

export type SaveHandler = () => Promise<boolean> | boolean;

export function useSaveModal(save: SaveHandler) {
    const router = useRouter();

    const onSave = async () => {
        const result = await save();
        if (result) {
            router.back();
        }
    };

    return { onSave };
};