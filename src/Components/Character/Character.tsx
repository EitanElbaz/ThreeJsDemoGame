import React, { useEffect, useRef } from 'react';
import { useBox } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { usePlayerControls } from '../../Hooks';
import { ThirdPersonCamera } from '../Camera';

type Props = {
    //
};

const SPEED = 6;

const Character: React.FC<Props> = () => {
    const { camera } = useThree();
    const [ref, api] = useBox(() => ({ position: [0, 2, 0], mass: 1, type: 'Dynamic' }));
    const velocity = useRef([0, 0, 0]);
    const { jump, moveBackward, moveForward, moveLeft, moveRight } = usePlayerControls();

    useEffect(() => {
        api.velocity.subscribe(v => {
            velocity.current = v;
        });
    }, [api.velocity]);

    useFrame(() => {
        const direction = new Vector3();

        const frontVector = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0));
        const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0);

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);

        api.velocity.set(direction.x, velocity.current[1], direction.z);

        if (jump && Math.abs(Number(velocity.current[1].toFixed(2))) < 0.05) {
            api.velocity.set(velocity.current[0], 8, velocity.current[2]);
        }
    });

    return (
        <>
            {ref.current && <ThirdPersonCamera target={ref.current} />}
            <mesh ref={ref} castShadow receiveShadow>
                <boxBufferGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </>
    );
};

export default Character;
