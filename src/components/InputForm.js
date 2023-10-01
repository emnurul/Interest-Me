import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './interest.jpg'; // Correct path to your image file
import axios from 'axios';

import './InputForm.css';

function InputForm() {
  const [interests, setInterests] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [similar, setSimilar] = useState([]);

  const [learning, setLearning] = useState('');

  const encodedArrayinterests = encodeURIComponent(JSON.stringify(interests));


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


  async function getSimilarities(topic) {

    try {
      const config = {
        method: 'POST',
        url: 'https://api.openai.com/v1/chat/completions',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        data: {
          "model": "gpt-3.5-turbo",
          "messages": [{
            "role": "user",
            "content": `give me 2 in a JSON 
            array like {similar_topics:['topic', 'topic']} that are distinctly different than  
            ${topic}. Respond ONLY in JSON and ONLY JSON`
          }],
          "temperature": 0.6
        }
      }

      const response = await axios(config);
      let answer = response.data.choices[0].message.content;

      console.log(answer)
      answer = JSON.parse(answer)

      const newArray = [...similar, ...answer.similar_topics];
      setSimilar(newArray);


    } catch (error) {
      console.log(error)
    };
  }

  const handleAddClick = () => {
    if (inputValue.trim() !== '') {
      setInterests([...interests, inputValue]);
      setInputValue('');


      //call the api
      getSimilarities(inputValue)
    }
  };

  const handleRemoveClick = (index) => {
    const updatedQuery = interests.filter((_, i) => i !== index);
    setInterests(updatedQuery);
  };

  const navigateToHome = (topic) => {
    window.open(`/card/${encodedArrayinterests}/${topic}`, '_blank');
  };

  return (
    <div className='main'>
      <img src={logo} height={"70px"} />
      <p>What are your interests?</p>
      <div>
        <input
          id="myInput"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button id="myButton" onClick={handleAddClick}>Add</button><br /><br />
      </div>
      <div className="bubble-container">
        {interests.map((item, index) => (
          <div className="bubble" key={index}>
            {item}
            <button onClick={() => handleRemoveClick(index)}>X</button>
          </div>
        ))}
      </div>
      <p>What do you want to learn? </p>
      <div>
        <input id="myInput" onChange={e => setLearning(e.target.value)} />
      </div>


      <br></br>

        <button id="myButton" onClick={()=>navigateToHome(learning)}disabled={learning == ''}>Learn about {learning}</button>
     <br /><br /><br />


      {
        similar.length > 0 ?
          <>
            Suggested Interests<br /><br />

            <div className='bubble-container'>
              {similar.map((link, index) => (
                <div className="bubble" key={index}>
                  <button onClick={()=>navigateToHome(link)}>Learn about {link}</button>
                </div>
              ))}
            </div>
          </> :
          null
      }


      <br></br>
      <br></br>
    </div>
  );
}

export default InputForm;
