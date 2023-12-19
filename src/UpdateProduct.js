import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function UpdateProduct(){
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const params = useParams()

    useEffect(() => {
        findProduct();
      }, [])
    
    
    const findProduct = async () => {
        const res = await axios.get(`http://localhost:3000/api/products/${params.id}`)
        const { code, name, description, price } = res.data.product
        setCode(code)
        setName(name)
        setDescription(description)
        setPrice(price)
    }
    
    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:3000/api/products/${params.id}`, {
            code: code,
            name: name,
            description: description,
            price: price
        });
      };


      return(
        <div>
            <h2>Update Product</h2>
            <form onSubmit={updateProduct}>
            <input
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button type="submit">Update product</button>
            </form>
        </div>
    )
}