import create from 'zustand';
import { devtools, combine } from 'zustand/middleware';
import { Platform } from 'types';

type PlatformState = {
    currentPlatform?: Platform;
    setCurrentPlatform: (platformName: Platform) => void;
};

const usePlatformStore = create<PlatformState>(
    devtools(
        set => ({
            currentPlatform: undefined,
            setCurrentPlatform: platform => set(state => ({ ...state, currentPlatform: platform })),
        }),
        { name: 'portf-platform' },
    ),
);

export default usePlatformStore;
