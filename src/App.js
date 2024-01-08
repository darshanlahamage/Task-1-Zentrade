import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import smartserv from './smartserv.jpg'

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
        const sortedProducts = Object.values(response.data.products).sort((a, b) => b.popularity - a.popularity);
        setProducts(sortedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="logo">
        <img src={smartserv} alt="Logo" />
      </div>
      <div className="product-table-container">
        <h1>Task 1 - Product Display</h1>
        <table className="product-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.popularity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
