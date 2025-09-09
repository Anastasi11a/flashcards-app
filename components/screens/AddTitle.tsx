import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import TitleInputView, { TitleInputProps } from "@/ui/input/TitleInputView";

const AddTitle = ({ title, setTitle }: TitleInputProps) => {
    const { inputRef } = useAutoFocusInput();

    return (
        <ScreenContainer>
            <TitleInputView 
                inputRef={inputRef}
                title={title}
                setTitle={setTitle}
            />
        </ScreenContainer>
    );
};

export default AddTitle;