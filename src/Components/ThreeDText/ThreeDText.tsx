import React, { useEffect } from 'react';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { extend } from '@react-three/fiber';
import roboto from 'assets/Rubik_Regular_font.json';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

extend({ TextGeometry });

type Props = {
    text: string;
    params?: TextGeometry['parameters'];
};
const ThreeDText: React.FC<Props> = ({ text, params }) => {
    const font = new FontLoader().parse(roboto);

    return (
        <mesh>
            {/* @ts-ignore */}
            <textGeometry args={[text, { font, size: 10, height: 10 }]} />
            <meshPhysicalMaterial attach="material" color="red" />
        </mesh>
    );
};

export default ThreeDText;
