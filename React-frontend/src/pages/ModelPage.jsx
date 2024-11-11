import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import ErrorBoundary from '../ErrorBoundary'; 
import labelData from '..//data/labelData'; //changed directory to merge properly
import './ModelPage.css';

const Model = ({ modelPath, position }) => {
  const { scene } = useGLTF(modelPath, true);
  return <primitive object={scene} position={position} scale={1.5} />;
};

const AnimatedModel = ({ modelPath, isActive, defaultPosition, direction }) => {
  const { position } = useSpring({
    position: isActive
      ? defaultPosition
      : [defaultPosition[0], direction === 'down' ? defaultPosition[1] - 5 : defaultPosition[1] + 5, defaultPosition[2]],
    config: { mass: 1, tension: 70, friction: 30 },
  });

  return <a.group position={position}><Model modelPath={modelPath} /></a.group>;
};

const Label = ({ position, text, delay }) => {
  const [isFadedIn, setIsFadedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadedIn(true);
    }, delay); // Delay before fade-in starts

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [delay]);

  return (
    <Html
      position={position}
      className={isFadedIn ? 'fade-in' : ''}
      style={{ backgroundColor: 'white', padding: '4px', borderRadius: '4px', opacity: 0 }}
    >
      {text}
    </Html>
  );
};

const ModelPage = () => {
  const [activeModel, setActiveModel] = useState(null);
  const [showLabels, setShowLabels] = useState(false); // State to control label visibility

  const handleSetActiveModel = (model) => {
    setActiveModel(model);
    setShowLabels(false); // Reset label visibility on model change
  };

  // Delay showing labels by 1 second (1000 ms) after model change
  useEffect(() => {
    if (activeModel !== null) {
      const timer = setTimeout(() => {
        setShowLabels(true);
      }, 1000); // Adjust delay time here if needed
      return () => clearTimeout(timer); // Cleanup timer on unmount or activeModel change
    }
  }, [activeModel]);

  const getDirection = (model) => {
    if (activeModel === 'Model1') return 'up';
    if (activeModel === 'Model2') return model === 'Model1' ? 'down' : 'up';
    if (activeModel === 'Model3') return 'down';
    return 'up';
  };

  const labelsForActiveModel = labelData.filter(label => label.modelId === activeModel);

  return (
    <div className="model-page">
      <nav className="nav-bar">
        <button onClick={() => handleSetActiveModel('Model1')}>Model 1</button>
        <button onClick={() => handleSetActiveModel('Model2')}>Model 2</button>
        <button onClick={() => handleSetActiveModel('Model3')}>Model 3</button>
        <button onClick={() => handleSetActiveModel(null)}>Show All</button>
      </nav>

      <ErrorBoundary>
        <Suspense fallback={<div className="loading">Loading models...</div>}>
          <Canvas camera={{ position: [0, 2, 6], fov: 40 }} className="canvas">
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <Environment preset="sunset" />

            <AnimatedModel modelPath="/models/basement.glb" isActive={activeModel === 'Model1' || activeModel === null} defaultPosition={[0, 0, 0]} direction={getDirection('Model1')} />
            <AnimatedModel modelPath="/models/ground.glb" isActive={activeModel === 'Model2' || activeModel === null} defaultPosition={[0, 0, 0]} direction={getDirection('Model2')} />
            <AnimatedModel modelPath="/models/first.glb" isActive={activeModel === 'Model3' || activeModel === null} defaultPosition={[0, 0, 0]} direction={getDirection('Model3')} />

            {showLabels && labelsForActiveModel.map((label, index) => (
              <Label key={index} position={label.position} text={label.text} />
            ))}

            <OrbitControls />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ModelPage;
