import { useRef, useEffect } from 'react';
import { TextInput } from 'react-native';

const useKeyboardVisibility = () => {
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return inputRef;
};

export default useKeyboardVisibility;