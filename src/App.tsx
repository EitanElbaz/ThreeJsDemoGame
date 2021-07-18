import React from 'react';
import { Canvas } from '@react-three/fiber';
import './App.css';
import { Sky } from '@react-three/drei';
import { Character } from './Components';

function App() {
    return (
        <div id="app">
            <Canvas>
                <Sky sunPosition={[100, 20, 100]} />
                <ambientLight intensity={0.25} />
                <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
                <Character />
            </Canvas>
        </div>
    );
}

export default App;
