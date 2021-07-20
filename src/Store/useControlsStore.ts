import create from 'zustand';

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

const useControlsStore = create<ControlsState>(set => ({
    keyBinds: {
        moveForward: 'KeyW',
        moveBackwards: 'KeyS',
        moveLeft: 'KeyA',
        moveRight: 'KeyD',
    },
    down: {},
    toggleDown: (keyCode, newState) =>
        set(state => ({ ...state, down: { ...state.down, [keyCode]: newState } })),
}));

export default useControlsStore;
