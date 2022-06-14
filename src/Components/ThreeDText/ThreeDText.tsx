import React from 'react';
import roboto from 'assets/Rubik_Regular_font.json';
import { Text3D } from '@react-three/drei';

type Props = {
    text: string;
};
const ThreeDText: React.FC<Props> = ({ text }) => {
    return (
        <group>
            <mesh>
                <Text3D font={roboto as any} height={1} size={5}>
                    {text}
                    <meshPhysicalMaterial attach="material" color="white" />
                </Text3D>
            </mesh>
        </group>
    );
};

export default ThreeDText;
