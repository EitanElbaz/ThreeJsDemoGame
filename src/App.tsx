import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import './App.css';
import { Character, Ground } from './Components';

function App() {
    return (
        <div id="app">
            <Canvas>
                <Physics gravity={[0, -30, 0]}>
                    <Sky sunPosition={[100, 20, 100]} />
                    <ambientLight intensity={0.25} />
                    <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
                    <Character />
                    <Ground />
                </Physics>
            </Canvas>
        </div>
    );
}

export default App;
