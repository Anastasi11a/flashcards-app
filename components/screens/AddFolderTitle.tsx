import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import AddFolderWrapper from "@/ui/layout/AddFolderWrapper";
import FolderTitleInput from "@/ui/FolderTitleInput";
import FolderTitleCounter from "@/ui/FolderTitleCounter";

interface AddFolderTitleProps {
    title: string;
    setTitle: (title: string) => void;
}

const AddFolderTitle = ({ title, setTitle }: AddFolderTitleProps) => {
    const { inputRef } = useAutoFocusInput();

    return (
        <ScreenContainer>
            <AddFolderWrapper>
                <FolderTitleInput
                    inputRef={inputRef}
                    value={title}
                    maxLength={38}
                    onChangeText={setTitle}
                />
                <FolderTitleCounter count={title.length} max={38} />
            </AddFolderWrapper>
        </ScreenContainer>
    );
};

export default AddFolderTitle;