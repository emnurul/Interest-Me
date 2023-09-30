// CardComponent.js
import React, { useState } from 'react';

const QCard = ({ data, id, handleChange }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoiceChange = (event) => {
    setSelectedChoice(event.target.value);
    handleChange({ [id]: event.target.value });
  };

  return (
    <div className="card" style={{height: "278px"}}>
      <img src={data.image} alt={data.altText} height={100} width={100} />
      <p className="question">{id + 1}. {data.question}</p>
      <form>
        <div className="choices">
          {data.choices.map((choice, index) => (
            <>
              <label key={index} className="choice">
                <input
                  type="radio"
                  name={`choice_${index}`}
                  value={choice}
                  checked={selectedChoice === choice}
                  onChange={handleChoiceChange}
                />
                {choice}
              </label><br />
            </>
          ))}
        </div>
      </form>
    </div>
  );
};

export default QCard;
