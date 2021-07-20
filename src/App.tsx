import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics, Debug } from '@react-three/cannon';
import './App.css';
import { Character, GlobalListeners, Ground } from 'components';

function App() {
    return (
        <div id="app">
            <GlobalListeners />
            <Canvas>
                <Physics gravity={[0, -30, 0]}>
                    <Debug color="green" scale={1.1}>
                        <Sky sunPosition={[100, 20, 100]} />
                        <ambientLight intensity={0.25} />
                        <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
                        <Character />
                        <Ground />
                    </Debug>
                </Physics>
            </Canvas>
        </div>
    );
}

export default App;
