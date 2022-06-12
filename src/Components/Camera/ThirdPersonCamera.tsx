import React, { useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

type Props = {
    target: React.MutableRefObject<Mesh | undefined>;
};

function targetWorldPosition(target: Mesh) {
    return target.getWorldPosition(target.position);
}

function calculateIdealOffset(target: Mesh) {
    const idealOffset = new Vector3(-0, 45, -25);
    idealOffset.applyQuaternion(target.quaternion);
    idealOffset.add(targetWorldPosition(target));

    // idealOffset.y = Math.max(idealOffset.y, terrain.GetHeight(idealOffset)[0] + 5.0);
    // idealOffset.y = 15;

    return idealOffset;
}

function calculateIdealLookat(target: Mesh) {
    const idealLookat = new Vector3(0, 5, 20);
    idealLookat.applyQuaternion(target.quaternion);
    idealLookat.add(targetWorldPosition(target));
    return idealLookat;
}

const ThirdPersonCamera: React.FC<Props> = ({ target }) => {
    const lookAt = useRef(new Vector3());
    const position = useRef(new Vector3());
    const { camera } = useThree();

    useFrame((state, delta) => {
        const targetObj = target.current;

        if (!targetObj) {
            return;
        }

        const idealOffset = calculateIdealOffset(targetObj);
        const idealLookat = calculateIdealLookat(targetObj);

        // const t = 0.05;
        // const t = 4.0 * timeElapsed;
        const t = 1.0 - 0.01 ** delta;
        // const t = 1.0 - Math.pow(0.01, delta);

        // console.log(idealOffset);

        // console.log(target.position);

        position.current.lerp(idealOffset, t);
        lookAt.current.lerp(idealLookat, t);

        camera.position.copy(position.current);
        camera.lookAt(lookAt.current);
    });
    return null;
};

export default ThirdPersonCamera;
