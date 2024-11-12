// src/HomePage.jsx

import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

import './Css/HomePage.css';

const WelcomeSection = () => (
    <section className="Welcome">
        <img
            src="https://via.placeholder.com/1200x600?text=Explore+Our+Museum"
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
  return (
      <section className="model-preview">
          <h2>Explore Our Exhibit</h2>
          <div className="model-content">
              {/* Model preview box */}
              <div className="model-box">
                  <Canvas camera={{ position: [0, 5, 5], fov: 45 }}>
                      <ambientLight intensity={0.5} />
                      <directionalLight position={[5, 5, 5]} />
                      <SpinningModel />
                  </Canvas>
              </div>

              {/* Dropdown options */}
              <div className="dropdown-section">
                  <label htmlFor="model-options" className="dropdown-label">
                      Choose an exhibit to view:
                  </label>
                  <select
                      id="model-options"
                      className="model-dropdown"
                      defaultValue="Select an option"
                  >
                      <option value="Select an option" disabled>
                          Select an option
                      </option>
                      <option value="Ancient Sculpture">Ancient Sculpture</option>
                      <option value="Modern Art Piece">Modern Art Piece</option>
                      <option value="Historical Artifact">Historical Artifact</option>
                  </select>
                  <button onClick={() => window.location.href = '/3d-exhibit'} className="view-3d-btn">
                      View Full 3D Exhibit
                  </button>
              </div>
          </div>
      </section>
  );
};

// Spinning model component with downward angle and zoomed in
const SpinningModel = () => {
  const { scene } = useGLTF('/models/first.glb');
  const modelRef = useRef();

  // Rotate the model continuously with a downward angle
  useFrame(() => {
      if (modelRef.current) {
          modelRef.current.rotation.y += 0.01; // Rotate around the Y-axis
          modelRef.current.rotation.x = -0.3; // Tilt slightly downward
      }
  });

  return <primitive object={scene} ref={modelRef} scale={2.5} />;
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
