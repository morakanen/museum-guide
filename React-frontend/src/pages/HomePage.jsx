// src/HomePage.jsx

import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import labelData from '../data/labelData';
import { Link } from 'react-router-dom';

import './Css/HomePage.css';

const WelcomeSection = () => (
    <section className="Welcome">
        <img
            src="\museum.jpeg"
            alt="Museum Interior"
            className="Welcome-image"
        />
        <div className="Welcome-text">
            <h1>Welcome to the Fitzwilliam Museum</h1>
            <p>Experience the World of Art, History, and Culture</p>
        </div>
    </section>
);

const IntroSection = () => (
    <section className="intro-section">
        <p>Founded in 1816, the Fitzwilliam Museum is one of the finest art and antiquities museums in the world. With collections spanning centuries, we invite you to explore history and creativity with us.</p>
    </section>
);



const ModelPreview = () => {
    // Filter label data by model ID
    const labelsByModel = {
      Model1: labelData.filter(label => label.modelId === 'Model1'),
      Model2: labelData.filter(label => label.modelId === 'Model2'),
      Model3: labelData.filter(label => label.modelId === 'Model3'),
    };
  
    return (
      <section className="model-preview">
        <h2>Explore Our Exhibit</h2>
        <div className="model-content">
          {/* Model preview box */}
          <div className="model-box">
            <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} />
              <SpinningModel />
            </Canvas>
            <Link to="/modelPage">
                <button className="view-3d-btn">View Model</button>
            </Link>
          </div>
  
          {/* Lists for each model */}
          <div className="model-list-section">
            <ModelList title="Model 1" labels={labelsByModel.Model1} />
            <ModelList title="Model 2" labels={labelsByModel.Model2} />
            <ModelList title="Model 3" labels={labelsByModel.Model3} />
          </div>
        </div>
      </section>
    );
  };
  

// Separate component to render each list of model labels
const ModelList = ({ title, labels }) => (
  <div className="model-list">
    <h3>{title}</h3>
    <ul>
      {labels.map((label, index) => (
        <li key={index}>{label.text}</li>
      ))}
    </ul>
  </div>
);

// Spinning model component
const SpinningModel = () => {
    const { scene } = useGLTF('/models/fitzmuseumall.glb');
    const modelRef = useRef();
    
  
    // Rotate the model continuously on the Y-axis
    useFrame(() => {
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005; // Adjust rotation speed as needed
      }
    });
  
    return <primitive object={scene} ref={modelRef} scale={2.0} position={[-1, -1, -2]}/>;
  };
  




const collections = [
    { link: "/collections/ancient-art", img: "https://via.placeholder.com/200?text=Ancient+Art", title: "Ancient Art" },
    { link: "/collections/modern-art", img: "https://via.placeholder.com/200?text=Modern+Art", title: "Modern Art" },
    { link: "/collections/sculptures", img: "https://via.placeholder.com/200?text=Sculptures", title: "Sculptures" },
    { link: "/collections/renaissance", img: "https://via.placeholder.com/200?text=Renaissance+Art", title: "Renaissance Art" },
    { link: "/collections/impressionism", img: "https://via.placeholder.com/200?text=Impressionism", title: "Impressionism" }
];

const CollectionsGrid = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % collections.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + collections.length) % collections.length);
    };

    return (
        <section className="collections-grid">
            <h2>Featured Collections</h2>
            <div className="carousel-container">
                <button onClick={handlePrev} className="carousel-button prev">‹</button>
                <div
                    className="carousel-track"
                    style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
                >
                    {collections.map((collection, index) => (
                        <a key={index} href={collection.link} className="collection-item">
                            <img src={collection.img} alt={collection.title} />
                            <p>{collection.title}</p>
                        </a>
                    ))}
                </div>
                <button onClick={handleNext} className="carousel-button next">›</button>
            </div>
        </section>
    );
};

const EventsSection = () => (
    <section className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events">
            <div className="event-item">
                <img src="https://via.placeholder.com/150?text=Art+Workshop" alt="Art Workshop" />
                <h3>Art Workshop</h3>
                <p>Join us for a hands-on experience in art-making with guidance from our expert instructors.</p>
            </div>
            <div className="event-item">
                <img src="https://via.placeholder.com/150?text=Lecture+Series" alt="Lecture Series" />
                <h3>Lecture Series</h3>
                <p>Explore the history and cultural significance of our collections through this engaging series.</p>
            </div>
        </div>
    </section>
);

const HomePage = () => (
    <div className="museum-homepage">

        <main>
            <WelcomeSection />
            <IntroSection />

            <div className="content-section">
                <CollectionsGrid />
                <ModelPreview />
            </div>
            <EventsSection />
        </main>
    </div>
);

export default HomePage;
