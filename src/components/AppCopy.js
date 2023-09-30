import logo from '../logo.svg';
import '../App.css';
import axios from 'axios';

import { useState, useEffect } from 'react';
import Button from './Button';
import Card from './Card/Card';
import CardPage from './CardPage';

function AppCopy() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("what is youre name");

  function click() {
    setLoading(true);
    sendRequest();
  }
  async function sendRequest() {
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
          "messages": [{ "role": "user", "content": `${query}` }],
          "temperature": 0.6
        }
      };

      // Send the Axios request and await the response
      const response = await axios(config);

      const answer = response.data.choices[0].message.content
      setData(answer);
      setLoading(false);

      // Handle the successful response here
      console.log('Question:', query);
      console.log('Response:', answer);
    } catch (error) {
      // Handle errors here
      console.error('Error:', error.message);
    }
  }


  // useEffect(() => {

  //   sendRequest("what is your name?")
  // }, [query]);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <input onChange={e => setQuery(e.target.value)} />
        <button onClick={click}>
          Response
        </button>
        Question: {query} <br /><br />
        Response: {loading ? "Loading..." : data}
      </header>
      <CardPage data={10}/>
    </div>
  );
}

export default AppCopy;
