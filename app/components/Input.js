import React from 'react';

const Input = ({
  name,
  id,
  label,
  handleKeyDown,
  handleChange,
  placeholder,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={id}
        type="text"
        name={name}
        onChange={event => handleChange(event)}
        onKeyDown={event => handleKeyDown(event)}
        placeholder={placeholder || ''}
        size={placeholder ? placeholder.length : 50}
      />
    </div>
  );
};

export default Input;
