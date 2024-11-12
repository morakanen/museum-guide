// src/pages/AboutPage.jsx

import React from 'react';
import "./Css/About.css";
import NewsletterSignup from '../components/NewsletterSignup';

const DirectorsTable = () => {
  const directors = [
    { dateFrom: "1876", dateTo: "1884", director: "Sidney Colvin" },
    { dateFrom: "1883", dateTo: "1889", director: "Sir Charles Walston" },
    { dateFrom: "1889", dateTo: "1892", director: "John Henry Middleton" },
    { dateFrom: "1893", dateTo: "1908", director: "Montague Rhodes James" },
    { dateFrom: "1908", dateTo: "1937", director: "Sir Sydney Cockerell" },
    { dateFrom: "1937", dateTo: "1946", director: "L. C. G. Clarke" },
    { dateFrom: "1946", dateTo: "1966", director: "Carl Winter" },
    { dateFrom: "1966", dateTo: "1973", director: "Sir David Piper" },
    { dateFrom: "1973", dateTo: "1990", director: "Professor Michael Jaffé" },
    { dateFrom: "1990", dateTo: "1995", director: "Simon Swynfen Jervis" },
    { dateFrom: "1995", dateTo: "2007", director: "Duncan Robinson" },
    { dateFrom: "2007", dateTo: "2012", director: "Timothy Potts" },
    { dateFrom: "2012", dateTo: "2018", director: "Tim Knox" },
    { dateFrom: "2019", dateTo: "", director: "Luke Syson" },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Date from</th>
          <th>Date to</th>
          <th>Director</th>
        </tr>
      </thead>
      <tbody>
        {directors.map((item, index) => (
          <tr key={index}>
            <td>{item.dateFrom}</td>
            <td>{item.dateTo || "Present"}</td>
            <td>{item.director}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const AboutPage = () => {
  return (
    <div className="about-container">
      <h2>About Our Website</h2>
      <p>
        The Fitzwilliam Museum is the lead partner of the spectacular collections of the University of Cambridge Museums (UCM) and Botanic Garden.
        From antiquity to the present day, the Fitzwilliam houses a world-renowned collection of over half a million beautiful works of art, 
        masterpiece paintings, and historical artefacts.
      </p>
      <h2>Founding the Fitzwilliam</h2>
      <p>
        In his will, Richard Fitzwilliam (1745–1816)—the 7th Viscount Fitzwilliam of Merrion—left his extensive collection of artworks and objects, 
        along with his library and an enormous sum of £100,000 to the University of Cambridge. After his death in 1816, 
        this bequest funded the building of the Museum which was named in his memory and continues to support the Fitzwilliam today.
      </p>
      <h2>Our Directors</h2>
      <DirectorsTable />
      <p>
        Thank you for being part of our journey. If you have any questions, feedback, or just want to say hi, feel free to reach out. Happy browsing!
      </p>
      <p>— The Fitzwilliam Museum Team</p>
      <NewsletterSignup />
    </div>
  );
};

export default AboutPage;
