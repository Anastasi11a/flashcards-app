import { useRouter } from "expo-router";
import AddFolderButton from "@/ui/AddFolderButton";

const FavoriteHeaderAction = () => {
    const router = useRouter();
    const handleCreate = () => router.push('/create/add-folder');

    return <AddFolderButton onPress={handleCreate} />;
};

export default FavoriteHeaderAction;