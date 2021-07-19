import React, { useRef } from 'react';
import { Mesh } from 'three';
import { ThirdPersonCamera } from '../Camera';
import CharacterController from './CharacterController';

type Props = {
    //
};

const Character: React.FC<Props> = () => {
    const ref = useRef<Mesh>();

    return (
        <>
            <mesh ref={ref} castShadow receiveShadow>
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                <meshStandardMaterial color="red" />
            </mesh>
            <ThirdPersonCamera target={ref} />
            <CharacterController target={ref} />
        </>
    );
};

export default Character;
