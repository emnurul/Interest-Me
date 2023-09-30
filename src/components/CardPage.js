import React from "react";
import Card from "./Card/Card";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useState, useEffect } from "react";

const CardPage = ({ data }) => {
  const { encodedArrayinterests } = useParams();
  //const decodedArray = JSON.parse(decodeURIComponent(encodedArrayinterests));
  const { learning } = useParams();

  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] =
    useState(`I want to learn ${learning} when I am familiar with ${encodedArrayinterests}. Give me 6 pairs of ${learning} terms and the terms I know with short descriptions, to let me get the basic concepts of ${learning}. I want you to respond in JSON format like this:
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

  function click() {
    setLoading(true);
    sendRequest();
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

      // Send the Axios request and await the response
      const response = await axios(config);

      let answer = response.data.choices[0].message.content;
      answer = JSON.parse(answer);
      setApiResponse(answer);
      const keys = Object.keys(answer);
      const values = Object.values(answer);
      console.log(keys, values);
      for (let i = 0; i < 6; i++) {
        setDummyData((oldArray) => [
          ...oldArray,
          {
            image1: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
            image2: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
            firstTitle: keys[i],
            secondTitle: values[i].similar_to,
            description: values[i].Description,
          },
        ]);
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

  useEffect(() => {
    sendRequest();
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

  return <div>{loading ? "Loading..." : cards}</div>;
};

export default CardPage;
