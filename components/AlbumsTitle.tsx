import { useRouter } from "expo-router";
import AddFolderButton from "@/ui/AddFolderButton";

const AlbumsTitle = () => {
    const router = useRouter();
    const handleCreate = () => {
        router.push({
            pathname: '/(modals)/title',
            params: { mode: 'create-folder' },
        });
    };

    return <AddFolderButton onPress={handleCreate} />;
};

export default AlbumsTitle;