import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import { useEditTitleState } from "@/hooks/useEditTitleState";
import { KeyboardScreenContainer } from "@/ui/container/ScreenContainer";
import TitleInput from "@/ui/input/TitleInput";
import { TitleParams } from "@/utils/navigation/navigation";

interface Props {
    mode: TitleParams['mode'];
    editState: ReturnType<typeof useEditTitleState>;
    draftTitle: string;
    setDraftTitle: (value: string) => void;
}

const AddTitle = ({ mode, editState, draftTitle, setDraftTitle }: Props) => {
    const { inputRef } = useAutoFocusInput();

    const title = mode === 'edit' ? editState.title : draftTitle;
    const setTitle = mode === 'edit' ? editState.setTitle : setDraftTitle;

    return (
        <KeyboardScreenContainer>
            <TitleInput 
                ref={inputRef} 
                title={title} 
                setTitle={setTitle} 
            />
        </KeyboardScreenContainer>
    );
};

export default AddTitle;