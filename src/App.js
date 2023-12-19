import './css/App.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState(null)
  const [query, setQuery] = useState("")
  const navigate = useNavigate();

  // Use effect
  useEffect(() => {
    fetchNotes();
  }, [setQuery])

  const fetchNotes = async () => {
    // Fetch the notes
    const res = await axios.get("http://localhost:3000/api/products")
    // Set to state
    setProducts(res.data.products)

  }

  const updateProduct = async (_id) => {
    return navigate(`/update-product/${_id}`) 
  }

  const deleteProduct = async (_id) => {
    // Delete the note
    const res = await axios.delete(`http://localhost:3000/api/products/${_id}`);

    // Update state
    const newProducts = [...products].filter((product) => {
      return product._id !== _id;
    })

    setProducts(newProducts);
  }

  const productsList = products ? products.map(product =>{
    return(
      <div key={product._id} className='products-table'>
        <p>{product.code}</p>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <button onClick={() => updateProduct(product._id)}>
          Update product
        </button>
        <button onClick={() => deleteProduct(product._id)}>
          Delete product
        </button>
      </div>
    )
  }) : []

  const createProduct = () => { 
    return navigate("/create-product") 
  }

  const searchProduct = (e) => {
    setQuery(e)
    const filteredElements = products
      .filter(product => product.name.includes(query) || product.code.includes(query) || product.description.includes(query))
      console.log(filteredElements)
  }
    
  return (
    <div className="App">
      <div>
        <input
          name="query"
          value={query}
          onChange={(e) => searchProduct(e.target.value)}
        />
        <h2>Products:</h2>
        <button onClick={createProduct}> Novo Produto </button>
        {productsList}
      </div>
    </div>
  );
}

export default App;