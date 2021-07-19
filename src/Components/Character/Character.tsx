import React, { useEffect, useRef, useState } from 'react';
// import { useBox } from '@react-three/cannon';
import { ThirdPersonCamera } from '../Camera';
import CharacterController from './CharacterController';

type Props = {
    //
};

const Character: React.FC<Props> = () => {
    // const [ref] = useBox(() => ({ position: [0, 2, 0], mass: 1, type: 'Dynamic' }));
    const [mounted, setMounted] = useState(false);
    const ref = useRef();

    useEffect(() => {
        setMounted(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <mesh ref={ref} castShadow receiveShadow>
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                <meshStandardMaterial color="red" />
            </mesh>
            {ref.current && <ThirdPersonCamera target={ref.current as any} />}
            {ref.current && <CharacterController target={ref.current as any} />}
        </>
    );
};

export default Character;
