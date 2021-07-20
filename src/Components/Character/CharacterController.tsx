import React, { useRef } from 'react';
import { Vector3, Quaternion, Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { usePlayerControls } from '../../Hooks';

type Props = {
    target: React.MutableRefObject<Mesh | undefined>;
    // api: WorkerApi;
};

const CharacterController: React.FC<Props> = ({ target }) => {
    const deceleration = useRef(new Vector3(-0.0005, -0.0001, -5));
    const acceleration = useRef(new Vector3(1, 0.25, 50.0));
    const velocity = useRef(new Vector3(0, 0, 0));
    // const velocity = useRef([0, 0, 0]);
    const movement = usePlayerControls();

    useFrame((state, delta) => {
        if (!target.current) {
            return;
        }

        const { moveForward, moveRight, moveLeft, moveBackward } = movement.current;

        const newVelocity = velocity.current;
        const frameDecceleration = new Vector3(
            newVelocity.x * deceleration.current.x,
            newVelocity.y * deceleration.current.y,
            newVelocity.z * deceleration.current.z,
        );
        frameDecceleration.multiplyScalar(delta);
        frameDecceleration.z =
            Math.sign(frameDecceleration.z) *
            Math.min(Math.abs(frameDecceleration.z), Math.abs(newVelocity.z));

        newVelocity.add(frameDecceleration);

        const controlObject = target.current;
        const Q = new Quaternion();
        const A = new Vector3();
        const R = controlObject.quaternion.clone();

        const acc = acceleration.current.clone();
        // we.g. if hold shift, run faster
        // if (sprint) {
        //     acc.multiplyScalar(2.0);
        // }

        if (moveForward) {
            newVelocity.z += acc.z * delta;
        }
        if (moveBackward) {
            newVelocity.z -= acc.z * delta;
        }

        if (moveLeft) {
            A.set(0, 1, 0);
            Q.setFromAxisAngle(A, 4.0 * Math.PI * delta * acceleration.current.y);
            R.multiply(Q);
        }
        if (moveRight) {
            A.set(0, 1, 0);
            Q.setFromAxisAngle(A, 4.0 * -Math.PI * delta * acceleration.current.y);
            R.multiply(Q);
        }

        controlObject.quaternion.copy(R);

        const oldPosition = new Vector3();

        const forward = new Vector3(0, 0, 1);
        forward.applyQuaternion(controlObject.quaternion);
        forward.normalize();

        const sideways = new Vector3(1, 0, 0);
        sideways.applyQuaternion(controlObject.quaternion);
        sideways.normalize();

        sideways.multiplyScalar(newVelocity.x * delta);
        forward.multiplyScalar(newVelocity.z * delta);

        // api.velocity.
        controlObject.position.add(forward);
        controlObject.position.add(sideways);

        oldPosition.copy(controlObject.position);
    });

    return null;
};

export default CharacterController;
