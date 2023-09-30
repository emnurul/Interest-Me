import React from 'react';
import Card from './Card/Card';
import { useParams } from 'react-router-dom';

const dummyData = [
    {
        image1: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        image2: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        firstTitle: "first 1",
        secondTitle: "second 1",
        description: "lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum..."
    },
    {
        image1: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        image2: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        firstTitle: "first 2",
        secondTitle: "second 2",
        description: "lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum..."
    },
    {
        image1: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        image2: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        firstTitle: "first 3",
        secondTitle: "second 3",
        description: "lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum..."
    },
    {
        image1: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        image2: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        firstTitle: "first 4",
        secondTitle: "second 4",
        description: "lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum..."
    },
    {
        image1: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        image2: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        firstTitle: "first 4",
        secondTitle: "second 4",
        description: "lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum..."
    },
    {
        image1: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        image2: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        firstTitle: "first 4",
        secondTitle: "second 4",
        description: "lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum..."
    },
    {
        image1: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        image2: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        firstTitle: "first 4",
        secondTitle: "second 4",
        description: "lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum...lorem ipsum..."
    }
]


const CardPage = ({ data }) => {
   
    const { encodedArrayinterests } = useParams();
    const decodedArray = JSON.parse(decodeURIComponent(encodedArrayinterests));
    const{learning}=useParams();
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
                            image1={item.image1 || ''}
                            image2={item.image2 || ''}
                            title={item.firstTitle || ''}
                            description={item.description || ''}
                        />
                    </td>
                );
            }
        }

        cards.push(
            <tr key={i}>
                {rowCells}
            </tr>
        );
    }






    return (
        <div>
            {cards}
            <ul>
        {decodedArray.map((item, index) => (
          <li key={index}>{item}</li>
        ))}

        {learning}
      </ul>
        </div>
    );
};

export default CardPage;
