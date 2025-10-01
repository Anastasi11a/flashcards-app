import SelectFolders from "@/components/pages/SelectFolders";
import useCustomHeader from "@/hooks/useCustomHeader";

const SelectFolder = () => {
    useCustomHeader({
        title: 'Select Folders',
        headerTransparent: true,
        headerBlurEffect: 'dark',
    });

    return <SelectFolders />;
};

export default SelectFolder;