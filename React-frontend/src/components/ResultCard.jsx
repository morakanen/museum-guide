import React from 'react';

const ResultCard = ({ data }) => {
    return (
        <div className="card">
            <h3>{data.name}</h3>
            <p><strong>Category:</strong> {data.category}</p>
            <p><strong>Department:</strong> {data.department}</p>
            <p><strong>Identifier:</strong> {data.identifier}</p>
            {/* Additional fields as necessary */}
            {data.image && <img src={data.image} alt={data.name} />}
        </div>
    );
};


export default ResultCard;