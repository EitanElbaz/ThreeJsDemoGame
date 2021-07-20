import React, { useEffect } from 'react';
import { useControlsStore } from 'store';

const KeyListener: React.FC = () => {
    const { toggleDown } = useControlsStore();
    useEffect(() => {
        const keyDown = (e: KeyboardEvent) => {
            toggleDown(e.code, true);
        };
        const keyUp = (e: KeyboardEvent) => {
            toggleDown(e.code, false);
        };
        document.addEventListener('keydown', keyDown, false);
        document.addEventListener('keyup', keyUp, false);

        return () => {
            document.removeEventListener('keydown', keyDown);
            document.removeEventListener('keyup', keyUp);
        };
    }, [toggleDown]);

    return null;
};

export default KeyListener;
