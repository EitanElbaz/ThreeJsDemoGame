import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Object3D, Vector3 } from 'three';

type Props = {
    //
    target: Object3D;
};

function targetWorldPosition(target: Object3D) {
    return target.getWorldPosition(target.position);
}

function calculateIdealOffset(target: Object3D) {
    const idealOffset = new Vector3(-0, 10, -15);
    idealOffset.applyQuaternion(target.quaternion);
    idealOffset.add(targetWorldPosition(target));

    // idealOffset.y = Math.max(idealOffset.y, terrain.GetHeight(idealOffset)[0] + 5.0);
    idealOffset.y = 5;

    return idealOffset;
}

function calculateIdealLookat(target: Object3D) {
    const idealLookat = new Vector3(0, 5, 20);
    idealLookat.applyQuaternion(target.quaternion);
    idealLookat.add(targetWorldPosition(target));
    return idealLookat;
}

const ThirdPersonCamera: React.FC<Props> = ({ target }) => {
    const targetPos = useRef(new Vector3());
    const lookAt = useRef(new Vector3());
    const position = useRef(new Vector3());
    const { camera } = useThree();

    useFrame((state, delta) => {
        const idealOffset = calculateIdealOffset(target);
        const idealLookat = calculateIdealLookat(target);

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
