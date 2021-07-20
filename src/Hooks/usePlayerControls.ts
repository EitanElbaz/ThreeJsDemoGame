import { useEffect, useRef } from 'react';
import { useControlsStore } from 'store';

function usePlayerControls() {
    const movement = useRef({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
    });
    const sub = useControlsStore.subscribe;
    const { keyBinds } = useControlsStore();

    useEffect(() => {
        const onForwardDown = (newState: boolean) => {
            movement.current.moveForward = newState;
        };
        const onBackwardDown = (newState: boolean) => {
            movement.current.moveBackward = newState;
        };
        const onRightDown = (newState: boolean) => {
            movement.current.moveRight = newState;
        };
        const onLeftDown = (newState: boolean) => {
            movement.current.moveLeft = newState;
        };
        const unsubForward = sub(onForwardDown, state => state.down[keyBinds.moveForward]);
        const unsubBackward = sub(onBackwardDown, state => state.down[keyBinds.moveBackwards]);
        const unsubRight = sub(onRightDown, state => state.down[keyBinds.moveRight]);
        const unsubLeft = sub(onLeftDown, state => state.down[keyBinds.moveLeft]);
        return () => {
            //
            unsubForward();
            unsubBackward();
            unsubRight();
            unsubLeft();
        };
    }, [sub, keyBinds, movement]);

    return movement;
}

export default usePlayerControls;
