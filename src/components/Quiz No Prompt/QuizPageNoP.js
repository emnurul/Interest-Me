import React, { useState, useEffect } from 'react';
import './QuizPageNoP.css'; // Import your CSS file
import QCard from '../QCard/QCard';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const QuizPageNoP = (props) => {

  const { topic } = useParams();

  const [called, setCalled] = useState(false);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [normalData, setNormalData] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [learningText, setlearningText] = useState("");

  const navigateToHome = () => {
    // window.location.href = '/'; // Navigate to the '/' path
    window.location.href = document.referrer;
  };


  function capitalizeEachWord(input, underscore) {
    let string = input.replace(/\b\w/g, match => match.toUpperCase());

    console.log(string)

    if (underscore) {
      return string.replaceAll(" ", "_");
    } else {
      return string;
    }
  }

  async function sendRequest() {

    if (called == true) {
      return;
    }

    setCalled(true);
    try {

      const prompt =
        `     give me 

              6 most basic level MCQ questions regarding ${topic} 
              with 1 of 4 the options is the correct answer in JSON and ONLY JSON format like 
              [{question: 'question', options: ['option1'], answer: 'answer'}]. One of the options 
              MUST be the answer.`;

              console.log("thjis is the promot")
              console.log(prompt)


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
            "content": prompt
          }],
          "temperature": 0.6
        }
      };

      // Send the Axios request and await the response
      const response = await axios(config);

      console.log(response)


      let answer = response.data.choices[0].message.content;
      answer = JSON.parse(answer);
      setChatData(answer);
      setData(answer);
      await renderCardsFromResponse(answer);
      setLoading(false);

    } catch (error) {
      // Handle errors here
      console.error('Error:', error.message);
    }
  }

  async function renderCardsFromResponse(answer) {

    try {

      let normalizedCardData = [];
      // Use a for...of loop to iterate over the answer array
      for (const e of answer) {
        // Call the images API
        const config = {
          method: 'GET',
          url: `https://api.pexels.com/v1/search?query=${e.answer}%20${topic}&per_page=1`,
          headers: {
            'Authorization': `${process.env.REACT_APP_IMAGE_KEY}`
          }
        };

        try {
          const response = await axios(config);
          console.log("images");
          console.log(response);

          normalizedCardData.push({
            image: response ? response.data.photos[0].src.tiny : 'https://images.pexels.com/photos/5715889/pexels-photo-5715889.jpeg',
            altText: 'Image 1',
            question: e.question,
            choices: e.options,
            answer: e.answer
          });
        } catch (error) {
          console.log("error", error);
        }


        console.log("what is normalized now ")
        console.log(normalizedCardData)
        setNormalData(normalizedCardData);
      }
    }
    catch (error) {
      // Handle errors here
      console.error('Error:', error.message);
    }

  }


  function selectedAnswer(answer) {
    setUserAnswers((prevUserAnswers) => ({
      ...prevUserAnswers,
      ...answer,
    }));
  }

  function checkAnswers() {
    const newWrongAnswers = {};

    normalData.forEach((data, index) => {
      if (data.answer !== userAnswers[index]) {
        newWrongAnswers[index] = userAnswers[index];
      }
    });

    let incorrect = Object.keys(newWrongAnswers);

    incorrect.forEach((element, index, array) => {
      array[index] = parseInt(element) + 1;
    });

    if (incorrect.length > 0) {
      alert(`These Answers are Incorrect! ${incorrect}`,)
    } else {
      alert(`Congrats! You are an expert in ${topic}`,)
    }

    setWrongAnswers(newWrongAnswers);
  }

  useEffect(() => {
    sendRequest()
  }, []);



  return (
    loading ? <>"Loading...."</> :
      <div style={{ paddingLeft: '50px', backgroundColor: "#CCCCFF", height: "100vh" }}>
        <table>
          <tbody>
            {Array(Math.ceil(normalData.length / 3))
              .fill()
              .map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {normalData.slice(rowIndex * 3, rowIndex * 3 + 3).map((data, index) => (
                    <td key={index}>
                      <QCard id={rowIndex * 3 + index} data={data} handleChange={selectedAnswer} />
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>


        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="button-back" onClick={navigateToHome}>Home</button> &nbsp;&nbsp;&nbsp;&nbsp;
          <button className="button" onClick={checkAnswers}>Check Answers</button>
        </div>
      </div>
  );
};

export default QuizPageNoP;
