import React, { useState } from 'react';

function InputForm() {
  const [interests, setInterests] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const [learning, setLearning] = useState('');


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = () => {
    if (inputValue.trim() !== '') {
      setInterests([...interests, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveClick = (index) => {
    const updatedQuery = interests.filter((_, i) => i !== index);
    setInterests(updatedQuery);
  };

 


  return (
    <div>
      <p>Enter your interests:</p>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddClick}>Add</button>
      </div>
      <div className="bubble-container">
        {interests.map((item, index) => (
          <div className="bubble" key={index}>
            {item}
            <button onClick={() => handleRemoveClick(index)}>X</button>
          </div>
        ))}
      </div>
      <p>Enter what you want to learn:</p>
      <div>
      <input onChange={e => setLearning(e.target.value)} />
      </div>
      <br></br>
      <button>GO</button>
      <br></br>
      <br></br>
    </div>
  );
}

export default InputForm;
