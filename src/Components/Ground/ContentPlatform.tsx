import React, { useCallback } from 'react';
import { BoxProps, Triplet, useBox } from '@react-three/cannon';
import { Platform } from 'types';
import { usePlatformStore } from 'store';
import { K_PLAYER_NAME } from 'consts';
import { ThreeDText } from 'components';

type Props = {
    position: Triplet;
    platform: Platform;
};

const ContentPlatform: React.FC<Props> = ({ position, platform }) => {
    const { setCurrentPlatform } = usePlatformStore();

    const onCollideBegin = useCallback<BoxProps['onCollideBegin']>(
        e => {
            console.log('collide', e);
            if (e.body.name === K_PLAYER_NAME) {
                setCurrentPlatform(platform);
            }
        },
        [platform, setCurrentPlatform],
    );
    const onCollideEnd = useCallback<BoxProps['onCollideEnd']>(
        e => {
            if (e.body.name === K_PLAYER_NAME) {
                console.log('collide end', e);
                setCurrentPlatform(undefined);
            }
        },
        [setCurrentPlatform],
    );
    const [ref] = useBox(() => ({
        position,
        args: [1, 2, 1],
        isTrigger: true,
        onCollideBegin,
        onCollideEnd,
        type: 'Static',
    }));
    return (
        <group>
            <mesh ref={ref as any} />
            <ThreeDText text="hello" />
        </group>
    );
};

export default ContentPlatform;
