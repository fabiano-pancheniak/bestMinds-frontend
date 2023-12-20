import './css/App.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const navigate = useNavigate();

  // Use effect
  useEffect(() => {
    fetchNotes();
  }, [])

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:3000/api/products")
    setProducts(res.data.products)
  }

  const updateProduct = async (_id) => {
    return navigate(`/update-product/${_id}`) 
  }

  const handleDelete = (_id) => {
    setShowModal(true)
    const item = products.find((item) => item._id == _id)
    setCurrentItem(item)
  }

  const deleteProduct = async (_id) => {
    const res = await axios.delete(`http://localhost:3000/api/products/${_id}`);
    const newProducts = [...products].filter((product) => {
      return product._id !== _id;
    })
    setProducts(newProducts);
  }

  const handleNo = () => {
    setShowModal(false)
  }

  const handleYes = () => {
    deleteProduct(currentItem._id)
    setCurrentItem(null)
    setShowModal(false)
  }
  
  const productsList = products ? products.map(product =>{
    return(
      <div key={product._id} className='products-table'>
        <p>{product.code}</p>
        <p>{product.name}</p>
        <p className='description'>{product.description}</p>
        <p>{product.price}</p>
        <button className='action-btn edit-btn' onClick={() => updateProduct(product._id)}>
          Editar
        </button>
        <button id={product._id} className='action-btn delete-btn' onClick={(e) => handleDelete(product._id, e)}>
          Remover
        </button>
      </div>
    )
  }) : []

  const createProduct = () => { 
    return navigate("/create-product") 
  }

  return (
    <div className="App">
      <div className={showModal ? 'products-wrapper modal-open' : 'products-wrapper'}>
        <div className='header'>
          <h2>Produtos</h2>
          <button className='new-product-btn' onClick={createProduct}> Novo produto </button>
        </div>
        <div className='products-table-header'>
        <p><strong>Código</strong></p>
        <p><strong>Nome</strong></p>
        <p><strong>Descrição</strong></p>
        <p><strong>Preço</strong></p>
        </div>
        {productsList}
      </div>
      <div className={showModal ? "modal" : "hidden"}>
        <div>Excluir {currentItem?.name}?</div>
        <div className='modal-buttons'>
          <button className='delete-btn modal-btn' onClick={handleNo}>Não</button>
          <button className='new-product-btn modal-btn' onClick={handleYes}>Sim</button>
        </div>
      </div>
    </div>
  );
}

export default App;