import { useHotkeys } from 'react-hotkeys-hook';
import { useCallback, useState } from 'react';

const keys = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
};

function usePlayerControls() {
    const [movement, setMovement] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
    });
    const onUp = useCallback(
        (e: KeyboardEvent) => {
            if (keys[e.code]) {
                setMovement(state => ({
                    ...state,
                    [keys[e.code]]: false,
                }));
            }
        },
        [setMovement],
    );
    const onDown = useCallback(
        (e: KeyboardEvent) => {
            if (keys[e.code]) {
                setMovement(state => ({
                    ...state,
                    [keys[e.code]]: true,
                }));
            }
        },
        [setMovement],
    );

    useHotkeys('w,a,s,d,space', onDown, { keydown: true, keyup: false }, [onDown]);
    useHotkeys('w,a,s,d,space', onUp, { keyup: true, keydown: false }, [onUp]);

    return movement;
}

export default usePlayerControls;
