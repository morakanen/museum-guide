// src/components/FormInput.jsx
import React from 'react';

const FormInput = ({ label, name, type = 'text', defaultValue = '' }) => {
  return (
    <div className="form-control w-full max-w-xs mb-4">
      <label className="label">
        <span className="label-text text-gray-700 font-semibold">{label}</span>
      </label>
      <input 
        type={type} 
        name={name} 
        defaultValue={defaultValue} 
        placeholder={`Enter ${label.toLowerCase()}`}
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
};

export default FormInput;