import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, Debug } from '@react-three/cannon';
import './App.css';
import { Character, GlobalListeners, Ground } from 'components';
import { HUD } from 'gui';

function App() {
    return (
        <div id="app">
            <GlobalListeners />
            <Canvas>
                <Physics gravity={[0, -30, 0]}>
                    <Debug color="green" scale={1.1}>
                        <ambientLight intensity={0.25} />
                        <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
                        <Character />
                        <Ground />
                    </Debug>
                </Physics>
            </Canvas>
            <HUD />
        </div>
    );
}

export default App;
