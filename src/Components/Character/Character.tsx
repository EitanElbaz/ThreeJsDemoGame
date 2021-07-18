import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

type Props = {
    //
};

const Character: React.FC<Props> = () => {
    const ref = useRef<THREE.Mesh>();
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.z += 0.01;
        }
    });
    return (
        <mesh ref={ref} castShadow receiveShadow>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="red" />
        </mesh>
    );
};

export default Character;
