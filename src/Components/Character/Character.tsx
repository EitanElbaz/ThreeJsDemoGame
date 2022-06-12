import React, { useRef } from 'react';
import { Mesh } from 'three';
import { useBox } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { ThirdPersonCamera } from 'components/Camera';
import CharacterController from './CharacterController';

type Props = {
    //
};

const Character: React.FC<Props> = () => {
    const ref = useRef<Mesh>();
    const [boxRef, api] = useBox(() => ({
        args: [1, 1, 1],
        position: [0, 0, 0],
        type: 'Kinematic',
        isTrigger: true,
    }));

    useFrame(() => {
        api.position.set(ref.current.position.x, ref.current.position.y, ref.current.position.z);
    });

    return (
        <>
            <mesh ref={ref} castShadow receiveShadow>
                <mesh ref={boxRef as any} parent={ref.current} />
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                <meshStandardMaterial color="red" />
            </mesh>
            <ThirdPersonCamera target={ref} />
            <CharacterController target={ref} />
        </>
    );
};

export default Character;
