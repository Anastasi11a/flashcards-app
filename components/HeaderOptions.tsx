import { useRouter } from "expo-router";

import HeaderOptionsView from "@/ui/HeaderOptionsView";

interface HeaderOptionsProps {
    onImport: () => void;
}

const HeaderOptions = ({ onImport }: HeaderOptionsProps) => {
    const router = useRouter();

    const handleCreate = () => router.push('/create/add-deck-title');

    return <HeaderOptionsView onImport={onImport} onCreate={handleCreate} />;
};

export default HeaderOptions;