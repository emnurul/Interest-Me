import React from "react";
import Card from "./Card/Card";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useState, useEffect } from "react";
import LoadingScreen from "./Loading/Loading";

const CardPage = ({ data }) => {


  const { encodedArrayinterests } = useParams();
  //const decodedArray = JSON.parse(decodeURIComponent(encodedArrayinterests));
  const { learning } = useParams();

  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [learningText, setlearningText] = useState("");

  const [query, setQuery] =
    useState(`

    ${learningText.substring(0, 500)}
    
    I want to learn ${learning} when I am familiar with ${encodedArrayinterests}. Give me 6 pairs of ${learning} terms and the terms I know with short descriptions, to let me get the basic concepts of ${learning}. I want you to respond in JSON format like this:
    {"Cryptography": {
        "similar_to": "Secret Recipes",
        "Description": "Cryptography is like creating secret recipes in cooking. Instead of sharing a recipe openly, you encode it in a way that only someone with the 'secret ingredient' (the key) can decode and understand it. It's like having a secret sauce recipe that only you and a trusted friend know how to decipher."
    },
    "Encryption": {
        "similar_to": "Mixing Ingredients",
        "Description": "Encryption is akin to carefully mixing ingredients in cooking. Just as you combine ingredients in specific proportions and sequences to create a dish, encryption involves transforming plain text into an encoded form using algorithms and a secret key."
    }
    }`);
  const [dummyData, setDummyData] = useState([]);

  async function updateQuery(lt) {

    console.log("updatig querty.......")
    setQuery(`

    The following is an exerpt from wikipedia, take this information as FACTS.
    ${learning}

    ${lt}

    NOW, I want to learn ${learning} when I am familiar with ${encodedArrayinterests}. Give me 6 pairs of ${learning} terms and the terms I know with short descriptions, to let me get the basic concepts of ${learning}. I want you to respond in JSON format like this:
    {"Cryptography": {
        "similar_to": "Secret Recipes",
        "Description": "Cryptography is like creating secret recipes in cooking. Instead of sharing a recipe openly, you encode it in a way that only someone with the 'secret ingredient' (the key) can decode and understand it. It's like having a secret sauce recipe that only you and a trusted friend know how to decipher."
    },
    "Encryption": {
        "similar_to": "Mixing Ingredients",
        "Description": "Encryption is akin to carefully mixing ingredients in cooking. Just as you combine ingredients in specific proportions and sequences to create a dish, encryption involves transforming plain text into an encoded form using algorithms and a secret key."
    }
    }`)
    console.log("update done")
  }

  const navigateToHome = () => {
    window.location.href = '/'; // Navigate to the '/' path
  };


  const navigateToQuiz = () => {
    window.open(`/quiz/${learning}`, '_blank');
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
  function capitalizeEachWord(input) {
    return input.replace(/\b\w/g, match => match.toUpperCase());
  }

  async function getWikiInfo() {
    //learning 

    try {

      const learningCap = capitalizeEachWord(learning, true);
      console.log(learningCap)

      const config = {
        method: "GET",
        url: `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${learningCap}`
      };

      // Send the Axios request and await the response
      let response = await axios(config);
      console.log(response)

      let responseText = response.data.parse.text['*'];
      let rawString = responseText.replace(/<[^>]+>/g, '');

      rawString = responseText.replace(/<[^>]+>/g, '');

      // Remove CSS style declarations
      rawString = rawString.replace(/style="[^"]*"/g, '');

      // Remove JavaScript event attributes
      rawString = rawString.replace(/on\w+="[^"]*"/g, '');

      // Remove HTML entities (e.g., &nbsp;)
      rawString = rawString.replace(/&[^;]+;/g, '');

      setlearningText(rawString);

      console.log("rawString")
      console.log("rawString")
      console.log(rawString)


      return rawString;

    } catch (error) {
      console.log(error);
    }

  }

  async function sendRequest() {
    try {

      const config = {
        method: "POST",
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        data: {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: `${query}` }],
          temperature: 0.6,
        },
      };

      console.log("this was the promopt")

      console.log(query)
      // Send the Axios request and await the response
      const response = await axios(config);

      let answer = response.data.choices[0].message.content;
      answer = JSON.parse(answer);
      setApiResponse(answer);
      const keys = Object.keys(answer);
      const values = Object.values(answer);
      console.log(keys, values);
      for (let i = 0; i < 6; i++) {

        //get image for keys[i]
        //get image for values[i].similar_to
        const config = {
          method: 'GET',
          url: `https://api.pexels.com/v1/search?query=${keys[i]}%20${learning}&per_page=1`,
          headers: {
            'Authorization': `${process.env.REACT_APP_IMAGE_KEY}`
          }
        };


        const config2 = {
          method: 'GET',
          url: `https://api.pexels.com/v1/search?query=${values[i].similar_to}&per_page=1`,
          headers: {
            'Authorization': `${process.env.REACT_APP_IMAGE_KEY}`
          }
        };

        try {
          const response = await axios(config);
          console.log("images");
          console.log(response);


          const response2 = await axios(config2);
          console.log("images");
          console.log(response2);

          setDummyData((oldArray) => [
            ...oldArray,
            {
              image1: response && response.data.photos[0] && response.data.photos[0].src ? response.data.photos[0].src.tiny : 'https://images.pexels.com/photos/5715889/pexels-photo-5715889.jpeg',
              image2: response2 && response.data.photos[0] && response.data.photos[0].src ? response2.data.photos[0].src.tiny : 'https://images.pexels.com/photos/5715889/pexels-photo-5715889.jpeg',
              firstTitle: keys[i],
              secondTitle: values[i].similar_to,
              description: values[i].Description,
            },
          ])
        } catch (error) {
          console.log("error", error);
        }


        ;
      }
      setLoading(false);

      // Handle the successful response here
      console.log("Question:", query);
      console.log("Response:", answer);
    } catch (error) {
      // Handle errors here
      console.error("Error:", error.message);
    }
  }

  // useEffect(() => {
  //   //call the wiki first
  //   getWikiInfo();
  //   sendRequest();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      // Call the wiki first
      const info = await getWikiInfo();


      await updateQuery(info)
      // Now, send the request
      sendRequest();
    };

    fetchData();
  }, []);

  const cards = [];

  const itemsPerRow = 3;
  const rows = Math.ceil(dummyData.length / itemsPerRow); // Round up

  for (let i = 0; i < rows; i++) {
    const rowCells = [];

    for (let j = 0; j < itemsPerRow; j++) {
      const item = dummyData[j + itemsPerRow * i];

      if (item) {
        rowCells.push(
          <td key={item.id}>
            <Card
              image1={item.image1 || ""}
              image2={item.image2 || ""}
              title={item.firstTitle || ""}
              secondTitle={item.secondTitle || ""}
              description={item.description || ""}
            />
          </td>
        );
      }
    }

    cards.push(<tr key={i}>{rowCells}</tr>);
  }

  return <div>{loading ?
    <LoadingScreen />
    :

    <div style={{ paddingLeft: "40px", backgroundColor: "#CCCCFF", paddingBottom: "40px" }}>
      {cards}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="button-back" onClick={navigateToHome}>Home</button> &nbsp;&nbsp;&nbsp;&nbsp;
        <button className="button" onClick={navigateToQuiz}>Take the {capitalizeEachWord(learning)} Quiz</button>
      </div>

    </div>
  }


  </div>;
};

export default CardPage;
