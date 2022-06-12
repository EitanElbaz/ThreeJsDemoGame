import create from 'zustand';
import { Platform } from 'types';

type PlatformState = {
    currentPlatform?: Platform;
    setCurrentPlatform: (platformName: Platform) => void;
};

const usePlatformStore = create<PlatformState>(set => ({
    currentPlatform: undefined,
    setCurrentPlatform: platform => set(state => ({ ...state, currentPlatform: platform })),
}));

export default usePlatformStore;
