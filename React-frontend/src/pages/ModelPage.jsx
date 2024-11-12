import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import ErrorBoundary from '../ErrorBoundary'; 
import labelData from '../data/labelData';
import './Css/ModelPage.css';

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

const Label = ({ position, text, delay, isActive }) => {
  const [isFadedIn, setIsFadedIn] = useState(false);
  const firstNumber = text.split(" ")[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadedIn(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Html
      position={position}
      className={`label ${isFadedIn ? 'fade-in' : ''} ${isActive ? 'active-label' : ''}`}
      style={{
        backgroundColor: isActive ? 'yellow' : 'white',
        padding: '4px',
        borderRadius: '4px',
        opacity: 0,
      }}
    >
      <span className="label-text">{firstNumber}</span>
      <span className="full-text">{text}</span>
    </Html>
  );
};

const ModelPage = () => {
  const [activeModel, setActiveModel] = useState(null);
  const [showLabels, setShowLabels] = useState(false);
  const [activeLabel, setActiveLabel] = useState(null);

  const handleSetActiveModel = (model) => {
    setActiveModel(model);
    setShowLabels(false);
    setActiveLabel(null);
  };

  const handleSetActiveLabel = (labelText) => {
    setActiveLabel(labelText);
  };

  useEffect(() => {
    if (activeModel !== null) {
      const timer = setTimeout(() => {
        setShowLabels(true);
      }, 1000);
      return () => clearTimeout(timer);
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
        <button onClick={() => handleSetActiveModel('Model3')}>First Floor</button>
        {activeModel === 'Model3' && (
          <ul className="label-list">
            {labelsForActiveModel.map((label, index) => (
              <li
                key={index}
                onClick={() => handleSetActiveLabel(label.text)}
                className="nav-label"
              >
                {label.text}
              </li>
            ))}
          </ul>
        )}
        
        <button onClick={() => handleSetActiveModel('Model2')}>Ground Floor</button>
        {activeModel === 'Model2' && (
          <ul className="label-list">
            {labelsForActiveModel.map((label, index) => (
              <li
                key={index}
                onClick={() => handleSetActiveLabel(label.text)}
                className="nav-label"
              >
                {label.text}
              </li>
            ))}
          </ul>
        )}
        
        <button onClick={() => handleSetActiveModel('Model1')}>Lower Ground Floor</button>
        {activeModel === 'Model1' && (
          <ul className="label-list">
            {labelsForActiveModel.map((label, index) => (
              <li
                key={index}
                onClick={() => handleSetActiveLabel(label.text)}
                className="nav-label"
              >
                {label.text}
              </li>
            ))}
          </ul>
        )}

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

            {/* Roof Model - Moves up when a model is active, visible only when all models are shown */}
            <AnimatedModel modelPath="/models/Roof.glb" 
              isActive={activeModel === null} 
              defaultPosition={[0, activeModel === null ? 0 : 10, 0]} // Moves up when any model button is pressed
              direction="up"
            />

            {showLabels && labelsForActiveModel.map((label, index) => (
              <Label key={index} position={label.position} text={label.text} isActive={label.text === activeLabel} />
            ))}

            <OrbitControls />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ModelPage;
