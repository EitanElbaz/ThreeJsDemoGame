import create from 'zustand';
import { devtools } from 'zustand/middleware';

type ControlsState = {
    keyBinds: {
        moveForward: string;
        moveBackwards: string;
        moveLeft: string;
        moveRight: string;
    };
    down: Record<string, boolean>;
    toggleDown: (keyCode: string, newState: boolean) => void;
};

const useControlsStore = create<ControlsState>(
    devtools(
        set => ({
            keyBinds: {
                moveForward: 'KeyW',
                moveBackwards: 'KeyS',
                moveLeft: 'KeyA',
                moveRight: 'KeyD',
            },
            down: {},
            toggleDown: (keyCode, newState) =>
                set(state => ({ ...state, down: { ...state.down, [keyCode]: newState } })),
        }),
        { name: 'portf-controls' },
    ),
);

export default useControlsStore;
