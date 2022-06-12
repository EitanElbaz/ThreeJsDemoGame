import React from 'react';
import { usePlane } from '@react-three/cannon';

type Props = {
    //
};

const Ground: React.FC<Props> = props => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -1, 0],
        type: 'Static',
        ...props,
    }));
    return (
        <mesh ref={ref as any} receiveShadow>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshStandardMaterial attach="material" color="blue" />
        </mesh>
    );
};

export default Ground;
