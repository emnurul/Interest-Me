


import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import { useState, useEffect } from 'react';



function App() {

  const [data, setData] = useState(null);
  const [query, setQuery] = useState("what is youre name");


  useEffect(() => {
    async function sendRequest() {
      console.log("trying")
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
            "temperature": 1.8
          }
        };
    
        // Send the Axios request and await the response
        const response = await axios(config);

        const answer = response.data.choices[0].message.content
        setData(answer);
    
        // Handle the successful response here
        console.log('Question:', query);
        console.log('Response:', answer);
      } catch (error) {
        // Handle errors here
        console.error('Error:', error.message);
      }
    }

    sendRequest("what is your name?")
  }, [query]);


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
          jrewjroiwer
          {process.env.REACT_APP_OPENAI_API_KEY}
          {/* {setQuery("what is your name?")} */}
        </a>
          {data}
      </header>
    </div>
  );
}

export default App;
